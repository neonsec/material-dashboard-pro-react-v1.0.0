import React from 'react';
import {
    withStyles, Grid
} from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange, LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import EchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';


import {
    StatsCard, ChartCard, TasksCard, RegularCard, Table, ItemGrid, ChartCardWithSearch
} from 'components';

import {
    dailySalesChart ,
    emailsSubscriptionChart,
    completedTasksChart,
    harbourRadarChart
} from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

import { userService } from '_services';

import Button from 'material-ui/Button';

import Menu, { MenuItem } from 'material-ui/Menu';
import {cookies} from '../../variables/general';

var yhgkmtkbnl_max_bw_option = {
    graphic: {
        type: 'group',
        rotation: Math.PI / 4,
        bounding: 'raw',
        right: 110,
        bottom: 110,
        z: 0,
        silent: true,
        children: [
            {
                type: 'rect',
                left: 'center',
                top: 'center',
                shape: {
                    width: 400,
                    height: 50
                },
                style: {
                    fill: 'rgba(0,0,0,0.1)'
                }
            },
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    fill: '#fff',
                    text: '新华社中国经济信息社',
                    font: 'bold 26px Microsoft YaHei'
                }
            }
        ]
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : []
        }
    ],
    series : [
        {
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[ ]
        }
    ]
};
var yhgkmtkbnl_syx_option = {
    graphic: {
        type: 'group',
        rotation: Math.PI / 4,
        bounding: 'raw',
        right: 110,
        bottom: 110,
        z: 0,
        silent: true,
        children: [
            {
                type: 'rect',
                left: 'center',
                top: 'center',
                shape: {
                    width: 400,
                    height: 50
                },
                style: {
                    fill: 'rgba(0,0,0,0.1)'
                }
            },
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    fill: '#fff',
                    text: '新华社中国经济信息社',
                    font: 'bold 26px Microsoft YaHei'
                }
            }
        ]
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : []
        }
    ],
    series : [
        {
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[ ]
        }
    ]
};
let stat_option = {
    graphic: {
        type: 'group',
        rotation: Math.PI / 4,
        bounding: 'raw',
        right: 110,
        bottom: 110,
        z: 0,
        silent: true,
        children: [
            {
                type: 'rect',
                left: 'center',
                top: 'center',
                shape: {
                    width: 400,
                    height: 50
                },
                style: {
                    fill: 'rgba(0,0,0,0.1)'
                }
            },
            {
                type: 'text',
                left: 'center',
                top: 'center',
                style: {
                    fill: '#fff',
                    text: '新华社中国经济信息社',
                    font: 'bold 26px Microsoft YaHei'
                }
            }
        ]
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['深圳','行业最低水平','行业平均水平','行业领先水平']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {show: cookies.get('username')!=='guest'}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2014年','2015年','2016年']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'深圳',
            type:'line',
            data:[]
        },
        {
            name:'行业最低水平',
            type:'line',
            
            data:[]
        },
        {
            name:'行业平均水平',
            type:'line',
            
            data:[]
        },
        {
            name:'行业领先水平',
            type:'line',
            data:[]
        },
    ]
};
class yhgkmtkbnl_max_bw_nh extends React.Component{
    state = {
        value: 0,
        open: false,
        mtkbnl_max_bw: false,
        anchorEl: null,
        anchorEl_gk: null,
        year: '2016',
        mtkbnl_syx:false,
        stat:0,
        gk_index: 0,
    };

    years = ['2014','2015','2016'];
    gks = ['泸州港'];

    componentWillMount() {
        this.get_yhgkmtkbnl_max_bw_year();
        this.get_yhgkmtkbnl_gk();
        this.update_yhgkmtkbnl_syx(this.state.year);
        this.update_yhgkmtkbnl_max_bw(this.state.year);
        this.update_yhgkmtkbnl_jxsp(this.state.gk_index);

        //this.setState({yhgkmtkbnl_max_bw : true});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.stat>=4;
    }

    constructor(props) {
        super(props);
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };


    get_yhgkmtkbnl_max_bw_year = () => {
        userService.get_gkmtkbnl_nh_max_bw_year()
            .then(
                yhgkmtkbnl_max_bw_year => { 
                    this.years = yhgkmtkbnl_max_bw_year.map((item,index) => { return  item.year; });
                    
                    
                    //this.setState({ year: year });
                    this.setState(prev => ({stat: prev.stat+1}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }

    get_yhgkmtkbnl_gk = () => {
        userService.get_gkmtkbnl_nh_gk()
            .then(
                gkmtkbnl_gk => {
                    this.gks = gkmtkbnl_gk.map((item, index) => { return item.gk; });
                    this.setState(prev => ({stat: prev.stat + 1}));
                },
                error => {

                }
            );
    };

    update_yhgkmtkbnl_max_bw = (year) => {
        userService.get_gkmtkbnl_nh_max_bw(year)
            .then(
                yhgkmtkbnl_max_bw => { 
                    let gkArray = yhgkmtkbnl_max_bw.map((item,index) => { return  item.gk; });
                    
                    
                    let yhgkmtkbnl_max_bwArray = yhgkmtkbnl_max_bw.map((item,index) => { return item.mtzdkbnl; });
                    
                    
                    var option = {
                        graphic: {
                            type: 'group',
                            rotation: Math.PI / 4,
                            bounding: 'raw',
                            right: 110,
                            bottom: 110,
                            z: 0,
                            silent: true,
                            children: [
                                {
                                    type: 'rect',
                                    left: 'center',
                                    top: 'center',
                                    shape: {
                                        width: 400,
                                        height: 50
                                    },
                                    style: {
                                        fill: 'rgba(0,0,0,0.1)'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 'center',
                                    top: 'center',
                                    style: {
                                        fill: '#fff',
                                        text: '新华社中国经济信息社',
                                        font: 'bold 26px Microsoft YaHei'
                                    }
                                }
                            ]
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top: '3%',
                            containLabel: true,
                        },
                        toolbox: {
                            show: true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                //restore : {show: true},
                                saveAsImage : {show: cookies.get('username')!=='guest'}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'value',
                                name: '码头靠泊能力（单位：吨级）',
                                nameLocation : 'center',
                                nameGap: '20'
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                data : gkArray,
                                max: 'dataMax'
                            }
                        ],
                        series : [
                            {
                                name: year+'年',
                                type:'bar',

                                itemStyle: {
                                    normal: {
                                        color: '#ff6600'
                                    },
                                    emphasis: {
                                        color: '#662900'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right'
                                    }
                                },
                                data: yhgkmtkbnl_max_bwArray
                            },
                        ]
                    };
                               
                    yhgkmtkbnl_max_bw_option = option;
                    this.setState(prev => ({stat: prev.stat+1, year: year}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }

    update_yhgkmtkbnl_syx = (year) => {
        userService.get_gkmtkbnl_nh_syx(year)
            .then(
                yhgkmtkbnl_syx => { 
                    let gkArray = yhgkmtkbnl_syx.map((item,index) => { return  item.gk; });
                   // 
                   // 
                    let yhgkmtkbnl_syxArray = yhgkmtkbnl_syx.map((item,index) => { return item.metric; });
                    
                    
                    var option = {
                        graphic: {
                            type: 'group',
                            rotation: Math.PI / 4,
                            bounding: 'raw',
                            right: 110,
                            bottom: 110,
                            z: 0,
                            silent: true,
                            children: [
                                {
                                    type: 'rect',
                                    left: 'center',
                                    top: 'center',
                                    shape: {
                                        width: 400,
                                        height: 50
                                    },
                                    style: {
                                        fill: 'rgba(0,0,0,0.1)'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 'center',
                                    top: 'center',
                                    style: {
                                        fill: '#fff',
                                        text: '新华社中国经济信息社',
                                        font: 'bold 26px Microsoft YaHei'
                                    }
                                }
                            ]
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top: '3%',
                            containLabel: true,
                        },
                        toolbox: {
                            show: true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                //restore : {show: true},
                                saveAsImage : {show: cookies.get('username')!=='guest'}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'value',
                                name: '码头靠泊能力',
                                nameLocation : 'center',
                                nameGap: '20'
                            }
                        ],
                        yAxis : [
                            {
                                type : 'category',
                                data : gkArray,
                                max: 'dataMax'
                            }
                        ],
                        series : [
                            {
                                name: year+'年',
                                type:'bar',

                                itemStyle: {
                                    normal: {
                                        color: '#ff6600'
                                    },
                                    emphasis: {
                                        color: '#662900'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right'
                                    }
                                },
                                data: yhgkmtkbnl_syxArray
                            },
                        ]
                    };
                               
                    yhgkmtkbnl_syx_option = option;
                    //this.setState({ year: year });
                    this.setState(prev => ({stat: prev.stat+1, year: year}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }


    update_stat = (viewStat) => {
        userService.get_stat(viewStat)
            .then(
                viewStat => {
                    let yearArray = viewStat.map((item,index) => { return  item.year + '年'; });
                    let mtArray = viewStat.map((item,index) => { return item.mt_bw_max; });
                    let yyArray = viewStat.map((item,index) => { return item.yy_bw_max; });
                    let jsksArray = viewStat.map((item,index) => { return item.jsks_bw_max; });
                    let jzxArray = viewStat.map((item,index) => { return item.jzx_bw_max; });
                    var option = {
                        graphic: {
                            type: 'group',
                            rotation: Math.PI / 4,
                            bounding: 'raw',
                            right: 110,
                            bottom: 110,
                            z: 0,
                            silent: true,
                            children: [
                                {
                                    type: 'rect',
                                    left: 'center',
                                    top: 'center',
                                    shape: {
                                        width: 400,
                                        height: 50
                                    },
                                    style: {
                                        fill: 'rgba(0,0,0,0.1)'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 'center',
                                    top: 'center',
                                    style: {
                                        fill: '#fff',
                                        text: '新华社中国经济信息社',
                                        font: 'bold 26px Microsoft YaHei'
                                    }
                                }
                            ]
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['煤炭泊位最大值','原油泊位最大值','金属矿石泊位最大值','集装箱泊位最大值']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView : {show: true, readOnly: false},
                                saveAsImage: {show: cookies.get('username')!=='guest'}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: yearArray
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name:'煤炭泊位最大值',
                                type:'line',
                                
                                data:mtArray
                            },
                            {
                                name:'原油泊位最大值',
                                type:'line',
                                
                                data:yyArray
                            },
                            {
                                name:'金属矿石泊位最大值',
                                type:'line',
                                
                                data:jsksArray
                            },
                            {
                                name:'集装箱泊位最大值',
                                type:'line',
                                
                                data:jzxArray
                            },
                        ]
                    };
                               
                    stat_option = option;
                    this.setState({ stat:this.state.stat+1 });
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }
    update_yhgkmtkbnl_jxsp = (gk_index) => {
        userService.get_gkmtkbnl_nh_jxsp(this.gks[gk_index])
            .then(
                gkmtkbnl_jxsp => {
                    let yearArray = gkmtkbnl_jxsp.map((item,index) => { return  item.year + '年'; });
                    let minArray = gkmtkbnl_jxsp.map((item,index) => { return item.min; });
                    let avgArray = gkmtkbnl_jxsp.map((item,index) => { return item.avg; });
                    let maxArray = gkmtkbnl_jxsp.map((item,index) => { return item.max; });
                    let this_gk = gkmtkbnl_jxsp.map((item,index) => { return item.metric; });
                    var option = {
                        graphic: {
                            type: 'group',
                            rotation: Math.PI / 4,
                            bounding: 'raw',
                            right: 110,
                            bottom: 110,
                            z: 0,
                            silent: true,
                            children: [
                                {
                                    type: 'rect',
                                    left: 'center',
                                    top: 'center',
                                    shape: {
                                        width: 400,
                                        height: 50
                                    },
                                    style: {
                                        fill: 'rgba(0,0,0,0.1)'
                                    }
                                },
                                {
                                    type: 'text',
                                    left: 'center',
                                    top: 'center',
                                    style: {
                                        fill: '#fff',
                                        text: '新华社中国经济信息社',
                                        font: 'bold 26px Microsoft YaHei'
                                    }
                                }
                            ]
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data:[this.gks[gk_index],'行业最低水平','行业平均水平','行业领先水平'],
                            selected: {
                                '行业最低水平': false,
                                '行业平均水平': false,
                                '行业领先水平': false
                            },
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView : {show: true, readOnly: false},
                                saveAsImage: {show: cookies.get('username')!=='guest'}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: yearArray
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: this.gks[gk_index],
                                type:'line',
                                data:this_gk
                            },
                            {
                                name:'行业最低水平',
                                type:'line',

                                data:minArray
                            },
                            {
                                name:'行业平均水平',
                                type:'line',

                                data:avgArray
                            },
                            {
                                name:'行业领先水平',
                                type:'line',

                                data:maxArray
                            },
                        ]
                    };

                    stat_option = option;
                    this.setState(prev => ({stat: prev.stat + 1, gk_index: gk_index}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };

    handle_gkMenuClick = event => {
        this.setState({ anchorEl_gk: event.currentTarget });
    };

    handleClose = event => {
        this.setState({ anchorEl: null});
        const year = event.currentTarget.value;
        this.update_yhgkmtkbnl_syx(year);
        this.update_yhgkmtkbnl_max_bw(year);

     };

    handle_gkMenuClose = event => {
        this.setState({ anchorEl_gk: null});
        const gk_index = event.currentTarget.value;
        this.update_yhgkmtkbnl_jxsp(gk_index);

    };
    
    render(){
        const { classes } = this.props;
        const { open } = this.state;
        const { anchorEl } = this.state;
        const { anchorEl_gk } = this.state;
        const { year} = this.state;
        const { gk_index} = this.state;
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{fontSize: 18, fontWeight:'bold'}}
                >
                    选择年份（当前是{year}年）
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                {
                    this.years.map((value,index)=>{return (<MenuItem value={value} key={index} onClick={this.handleClose}>{value}年</MenuItem>);})
                }
                 </Menu>
                <Grid container >
                    <ItemGrid xs={12} sm={12} md={12}>
                        <ChartCard
                                chart={
                                    <EchartsCore
                                    echarts={echarts}
                                    option={yhgkmtkbnl_max_bw_option}
                                    style={{height: '600px', width: '100%'}} 
                                    notMerge={true}
                                    lazyUpdate={false}
                                    theme={"default"} />
                                }
                                chartColor="gray"
                                title="码头最大靠泊能力排名"
                                text={
                                    <span>
                                        {year}年港口码头最大靠泊能力
                                    </span>
                                }
                                statIcon={AccessTime}
                                statText= {new Date().toLocaleString()}
                         />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <ChartCard
                                chart={
                                    <EchartsCore
                                    echarts={echarts}
                                    option={yhgkmtkbnl_syx_option}
                                    style={{height: '600px', width: '100%'}} 
                                    notMerge={true}
                                    lazyUpdate={false}
                                    theme={"default"} />
                                }
                                chartColor="gray"
                                title="港口码头靠泊能力排名"
                                text={
                                    <span>
                                        {year}年港口码头靠泊能力
                                    </span>
                                }
                                statIcon={AccessTime}
                                statText= {new Date().toLocaleString()}
                         />
                    </ItemGrid>
                </Grid>
                <Button
                    aria-owns={anchorEl_gk ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handle_gkMenuClick}
                    style={{fontSize: 18, fontWeight:'bold'}}
                >
                    选择港口（当前是{this.gks[gk_index]}）
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl_gk}
                    open={Boolean(anchorEl_gk)}
                    onClose={this.handle_gkMenuClose}
                >
                    {
                        this.gks.map((value,index)=>{return (<MenuItem value={index} key={index} onClick={this.handle_gkMenuClose}>{value}</MenuItem>);})
                    }
                </Menu>
                <Grid container >
                    <ItemGrid xs={12} sm={12} md={12}>
                        <ChartCard
                                chart={
                                    <EchartsCore
                                    echarts={echarts}
                                    option={stat_option}
                                    style={{height: '600px', width: '100%'}} 
                                    notMerge={true}
                                    lazyUpdate={false}
                                    theme={"default"} />
                                }
                                chartColor="gray"
                                title="港口最大靠泊能力绩效水平"
                                text={
                                    <span>
                                        最大靠泊能力逐年绩效水平统计结果
                                    </span>
                                }
                                statIcon={AccessTime}
                                statText= {new Date().toLocaleString()}
                         />
                    </ItemGrid>
                    </Grid>
            </div>
        );
    }
}

yhgkmtkbnl_max_bw_nh.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(yhgkmtkbnl_max_bw_nh);
