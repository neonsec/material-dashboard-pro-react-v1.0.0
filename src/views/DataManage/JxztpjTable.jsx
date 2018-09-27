import React from 'react';
import {Reactables, Header} from 'gigatables-react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui-icons/Check';
import SaveIcon from 'material-ui-icons/Save';

import 'gigatables-react/main.css';
import {userService} from '../../_services';
import {authHeader} from "../../_helpers/auth-header";
import {cookies} from "../../variables/general";

let editor = {
    ajax: {
        reload: {
            url: '/update_radar',
            type: 'GET',
        }
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
            type: 'text'
        },
        {
            label: "港口货物吞吐量:",
            name: "yhgkhwttl",
            type: 'text',
        },
        {
            label: "港口集装箱吞吐量:",
            name: "yhgkjzxttl",
            type: 'text',
        },
        {
            label: "港口连通性:",
            name: "dckbsl",
            type: 'text',
        },
        {
            label: "码头最大停泊能力:",
            name: "gkmtkbnl",
            type: 'text',
        },
        {
            label: "港口岸线利用率:",
            name: "bmaxttl",
            type: 'text',
        },
        {
            label: "港口通过能力适应度:",
            name: "mtnlsyx",
            type: 'text',
        },
        {
            label: "港口作业效率:",
            name: "cbzgpjts",
            type: 'text',
        },
        {
            label: "港口经济贡献:",
            name: "ddsr",
            type: 'text',
        },
        {
            label: "绿色港口等级:",
            name: "lsgkdj",
            type: 'text',
        },
        {
            label: "港口安全生产水平:",
            name: "qwdttlswrs",
            type: 'text',
        }
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
    ajax: '/get_table_jxztpj',
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
            data: "yhgkhwttl",
            sortable: true,
            searchable: true
        },
        {
            data: "yhgkjzxttl",
            sortable: true,
            searchable: true
        },
        {
            data: "dckbsl",
            sortable: true,
            searchable: true
        },
        {
            data: "gkmtkbnl",
            sortable: true,
            searchable: true
        },
        {
            data: "bmaxttl",
            sortable: true,
            searchable: true
        },
        {
            data: "mtnlsyx",
            sortable: true,
            searchable: true
        },
        {
            data: "cbzgpjts",
            sortable: true,
            searchable: true
        },
        {
            data: "ddsr",
            sortable: true,
            searchable: true
        },
        {
            data: "lsgkdj",
            sortable: true,
            searchable: true
        },
        {
            data: "qwdttlswrs",
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
            { // reload button to fetch content manually
                extended: 'editor_reload',
                editor: editor,
                triggerAfter: (() => {

                }), triggerBefore: (() => {
                    if(cookies.get('username')!=='admin'){
                        alert("只有管理员才可以更新！");
                        return;
                    }
                    var request = new XMLHttpRequest();
                    request.open('GET', '/update_radar', false);  // `false` makes the request synchronous
                    alert("更新需要大约半分钟，在此期间浏览器无响应，请耐心等待...");
                    request.send(null);
                    if (request.status === 200) {
                        alert("更新成功");
                    }else {
                        alert("更新失败");
                    }
                })
            },
        ],
        buttonsPosition: ['top', 'bottom'],
        theme: 'std'
    }
};



// const styles = theme => ({
//   root: {
//     position: 'absolute',
//     top: -13,
//     left: 140
//   },
//   wrapper: {
//     margin: theme.spacing.unit,
//     position: 'relative',
//   },
//   buttonSuccess: {
//     backgroundColor: green[500],
//     '&:hover': {
//       backgroundColor: green[700],
//     },
//   },
//   fabProgress: {
//     color: green[500],
//     position: 'absolute',
//     top: -6,
//     left: -6,
//     zIndex: 1,
//   },
//   buttonProgress: {
//     color: green[500],
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginTop: -12,
//     marginLeft: -12,
//   },
// });

// class RefreshButton extends React.Component {
//
//   state = {
//     loading: false,
//     success: false,
//   };
//
//   handleButtonClick = () => {
//     if(!this.state.loading) {
//       this.setState({
//         success: false,
//         loading: true,
//       });
//       userService.updateRadar()
//         .then(() => this.props.handleRefresh());
//     }
//   };
//
//   componentWillReceiveProps(nextProps) {
//     if(nextProps.refreshFinished) {
//       this.setState({
//         loading: false,
//         success: true,
//       });
//     }
//   }
//
//   render() {
//     const { loading, success } = this.state;
//     const { classes } = this.props;
//     const buttonClassname = classNames({
//       [classes.buttonSuccess]: success,
//     });
//
//     return (
//       <div className={classes.root}>
//         <div className={classes.wrapper}>
//           <Button
//             variant="raised"
//             color="primary"
//             className={buttonClassname}
//             disabled={loading}
//             onClick={this.handleButtonClick}
//           >
//             更新
//           </Button>
//           {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
//         </div>
//       </div>
//     );
//   }
// }
//
// const Refresh = withStyles(styles)(RefreshButton)

const tableStyles = theme => ({
    root: {
        position: 'relative'
    }
})

class JxztpjTable extends React.Component {
    // state = {
    //     refresh: false,
    //     refreshFinished: false
    // }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Reactables
                    editor={editor}
                    settings={settings}
                    // refresh={this.state.refresh}
                    // notifyFinished={() => this.setState({refreshFinished: true})}
                >
                    <Header data="year">年</Header>
                    <Header data="gk">港口</Header>
                    <Header data="yhgkhwttl">港口货物吞吐量</Header>
                    <Header data="yhgkjzxttl">港口集装箱吞吐量</Header>
                    <Header data="dckbsl">港口连通性</Header>
                    <Header data="gkmtkbnl">码头最大停泊能力</Header>
                    <Header data="bmaxttl">港口岸线利用率</Header>
                    <Header data="mtnlsyx">港口通过能力适应度</Header>
                    <Header data="cbzgpjts">港口作业效率</Header>
                    <Header data="ddsr">港口经济贡献</Header>
                    <Header data="lsgkdj">绿色港口等级</Header>
                    <Header data="qwdttlswrs">港口安全生产水平</Header>

                </Reactables>
                {/*<Refresh */}
                {/* */}
                {/*refreshFinished={this.state.refreshFinished}*/}
                {/*/>*/}
            </div>
        )
    }
}


export default withStyles(tableStyles)(JxztpjTable);