import React from 'react';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Reactables, Header } from 'gigatables-react';
import 'gigatables-react/main.css';
import {userService} from "../../_services";
import { userActions} from "../../_actions";
import {cookies} from "../../variables/general";

let editor = {
  ajax: {
      create: {
          url: '/cbzgpjts',
          type: 'POST',
      },
      edit: {
          url: '/cbzgpjts',
          type: 'PUT',
      },
      delete: {
          url: '/cbzgpjts',
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
      label: "外贸船平均千吨停时:",
      name: "wmc_pjqdts",
      type: 'text',
    },
    {
      label: "内贸船平均千吨停时:",
      name: "nmc_pjqdts",
      type: 'text',
    },
    {
      label: "外贸货物吞吐量:",
      name: "wm_hwttl",
      type: 'text',
    },
    {
      label: "内贸货物吞吐量:",
      name: "nm_hwttl",
      type: 'text',
    },
  ]
};

let settings = {
  struct: {
    search: ['top', 'bottom'],
    rowsSelector: ['asc', 'top', 'bottom'],
    pagination: ['top', 'bottom'],
    fixedHeader: true, // default false
    editableCells: false, // default false
  },
  lang: 'ch', // english default
  perPageRows: [25, 50, 100, 200, 500],
  defaultPerPage: 50,
  ajax: '/get_table_cbzgpjts?user=test',
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
      data: "wmc_pjqdts",
      sortable: true,
      searchable: true
    },
    {
      data: "nmc_pjqdts",
      sortable: true,
      searchable: true
    },
    {
      data: "wm_hwttl",
      sortable: true,
      searchable: true
    },
    {
      data: "nm_hwttl",
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
          
        }), triggerBefore: (function () {
          
        })},
      {extended: "editor_edit", editor: editor},
      {extended: "editor_remove", editor: editor, triggerAfter: (function () {
          
        })}
    ],
    buttonsPosition: ['top', 'bottom'],
    theme: 'std'
  }
 };


class CbzgpjtsTable extends React.Component {
    componentWillMount() {
        settings.ajax = '/get_table_cbzgpjts?user='+cookies.get('username');
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
        <Header data="wmc_pjqdts">外贸船平均<br/>千吨停时(天)</Header>
        <Header data="nmc_pjqdts">内贸船平均<br/>千吨停时(天)</Header>
        <Header data="wm_hwttl">外贸货物<br/>吞吐量(万吨)</Header>
        <Header data="nm_hwttl">内贸货物<br/>吞吐量(万吨)</Header>
        <Header data="metric">指标值</Header>
      </Reactables>
    );
  }
}

export default CbzgpjtsTable;