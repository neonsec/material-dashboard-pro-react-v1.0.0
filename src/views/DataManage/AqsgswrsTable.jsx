import React from 'react';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Reactables, Header } from 'gigatables-react';
import 'gigatables-react/main.css';
import { userService } from '_services';
import { userActions} from "../../_actions";
import {cookies} from '../../variables/general';

let editor = {
  ajax: {
      create: {
          url: '/qwdttlswrs',
          type: 'POST',
      },
      edit: {
          url: '/qwdttlswrs',
          type: 'PUT',
      },
      delete: {
          url: '/qwdttlswrs',
          type: 'DELETE',
      },
  },
  //ajaxFiles: 'http://gigatables.loc/uploadFiles.php',
  struct: {
      buttons: ['top', 'bottom'] // buttons
  },
  fields: [
      {
          label: "年:",
          name: "year",
          type: 'text', 
      },
      {
          label: "港口:",
          name: "gk",
          type: 'select',
          values: [],
          defaultValue: '大连港',
      },
      {
          label: "港口安全生产水平:",
          name: "qwdttlswrs",
          type: 'text',
      },
  ]
};

let settings = {
  struct: {
    search: ['top', 'bottom'],
    rowsSelector: ['asc', 'top', 'bottom'],
    pagination: ['top', 'bottom'],
    fixedHeader: false, // default false
    editableCells: false, // default false
  },
  lang: 'ch', // english default
  perPageRows: [25, 50, 100, 200, 500],
  defaultPerPage: 50,
  ajax: '/get_table_qwdttlswrs?user=test',
  requestType: 'GET',
  columns: [
    {
      data: "year",
      sortable: true,
      searchable: true
    },
    {
      data: "gk",
      sortable: true,
      searchable: true
    },
    {
      data: "qwdttlswrs",
      sortable: true,
      searchable: true
    },
    {
      data: "metric",
      sortable: true,
      searchable: true
    },
  ],
  columnOpts: [
    {
      render: function (data, row, type) {
        return '<div><form method="post" class="accForm" action=""><input type="hidden" name="action" value="forms" /><input type="hidden" name="id" value="' + row.id + '" /><div>' + data + '</div></form></div>';
      },
      target: 2
    },
    {
      render: function (data, row, type) {
        return '<div><form method="post" class="accForm" action=""><input type="hidden" name="action" value="forms" /><input type="hidden" name="id" value="' + row.id + '" /><div>' + data + '</div></form></div>';
      },
      target: 3
    }
  ],
  tableOpts: {
    buttons: [
      {extended: "editor_create", editor: editor, triggerAfter: (function () {
          //console.log('after create');
        }), triggerBefore: (function () {
          //console.log('before create');
        })},
      {extended: "editor_edit", editor: editor},
      {extended: "editor_remove", editor: editor, triggerAfter: (function () {
          //console.log('after del');
        })}
    ],
    buttonsPosition: ['top', 'bottom'],
    theme: 'std'
  }
 };


class AqsgswrsTable extends React.Component {
    componentWillMount() {
        settings.ajax = '/get_table_qwdttlswrs?user='+cookies.get('username');
        userService.get_editor_gk(cookies.get('username'))
            .then(
                gk => {
                    let gks = [];
                    gk.map((currentValue ,index) => {
                        let o = {};
                        o[currentValue] = currentValue;
                        gks.push(o);
                    });
                    editor.fields[1].values = gks;
                    editor.fields[1].defaultValue = Object.keys(gks[0]);
                })
    }
  render() {
    return (
      <Reactables editor={editor} settings={settings}>
        <Header data="year">年</Header>
        <Header data="gk">港口</Header>
        <Header data="qwdttlswrs">千万吨吞吐量港口安全生产水平</Header>
        <Header data="metric">指标值</Header>
      </Reactables>
    );
  }
}

export default AqsgswrsTable;