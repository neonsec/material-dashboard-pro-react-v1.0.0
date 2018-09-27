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

var qwdttlswrs_option = {
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

class qwdttlswrs extends React.Component{
    state = {
        value: 0,
        open: false,
        //qwdttlswrs: false,
        anchorEl: null,
        anchorEl_gk: null,
        year: '2016',
        stat:0,
        gk_index: 0,
    };

    years = ['2014','2015','2016'];
    gks = ['大连港'];

    componentWillMount() {
        this.get_qwdttlswrs_year();
        this.get_qwdttlswrs_gk();
        this.update_qwdttlswrs(this.state.year);
        this.update_qwdttlswrs_jxsp(this.state.gk_index);
        //this.setState({qwdttlswrs : true});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.stat>=3;
    }
    constructor(props) {
        super(props);
       
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    get_qwdttlswrs_gk = () => {
        userService.get_qwdttlswrs_gk()
            .then(
                qwdttlswrs_gk => {
                    this.gks = qwdttlswrs_gk.map((item, index) => { return item.gk; });
                    this.setState(prev => ({stat: prev.stat + 1}));
                },
                error => {

                }
            );
    };

    update_qwdttlswrs_jxsp = (gk_index) => {
        userService.get_qwdttlswrs_jxsp(this.gks[gk_index])
            .then(
                qwdttlswrs_jxsp => {
                    let yearArray = qwdttlswrs_jxsp.map((item,index) => { return  item.year + '年'; });
                    let minArray = qwdttlswrs_jxsp.map((item,index) => { return item.min; });
                    let avgArray = qwdttlswrs_jxsp.map((item,index) => { return item.avg; });
                    let maxArray = qwdttlswrs_jxsp.map((item,index) => { return item.max; });
                    let this_gk = qwdttlswrs_jxsp.map((item,index) => { return item.qwdttlswrs; });
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
                    this.setState(prev => ({stat: prev.stat+1, gk_index: gk_index}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }

    get_qwdttlswrs_year = () => {
        userService.get_qwdttlswrs_year()
            .then(
                qwdttlswrs_year => { 
                    this.years = qwdttlswrs_year.map((item,index) => { return  item.year; });
                    
                    
                    //this.setState({ year: year });
                    this.setState(prev => ({stat: prev.stat+1}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }

    update_qwdttlswrs = (year) => {
        userService.get_qwdttlswrs(year)
            .then(
                qwdttlswrs => { 
                    
                    let gkArray = qwdttlswrs.map((item,index) => { return  item.gk; });
                    let qwdttlswrsArray = qwdttlswrs.map((item,index) => { return item.metric; });
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
                            axisPointer : {         // 坐标轴指示器，坐标轴触发有效
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
                                name: '千万吨吞吐量安全生产死亡人数',
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
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#ff6600'
                                    },
                                    emphasis: {
                                        color: '#662900'
                                    }
                                },
                                data: qwdttlswrsArray
                            },
                        ]
                    };
                               
                    qwdttlswrs_option = option;
                    
                    this.setState(prev => ({stat: prev.stat+1, year: year}));
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
        this.update_qwdttlswrs(year);
     };

    handle_gkMenuClose = event => {
        this.setState({ anchorEl_gk: null});
        const gk_index = event.currentTarget.value;
        this.update_qwdttlswrs_jxsp(gk_index);

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
                    this.years.map((value,index)=>{
                        return (
                            <MenuItem 
                                value={value} 
                                key={index} 
                                onClick={this.handleClose}>
                                {value}年
                            </MenuItem>
                        );
                    })
                }
                 </Menu>
                <Grid container >
                    <ItemGrid xs={12} sm={12} md={12}>
                        <ChartCard
                                chart={
                                    <EchartsCore
                                    echarts={echarts}
                                    option={qwdttlswrs_option}
                                    style={{height: '600px', width: '100%'}} 
                                    notMerge={true}
                                    lazyUpdate={false}
                                    theme={"default"} />
                                }
                                chartColor="gray"
                                title="港口安全生产死亡人数排名"
                                text={
                                    <span>
                                        {year}年港口安全生产死亡人数
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
                                title="港口千万吨吞吐量安全生产死亡人数绩效水平"
                                text={
                                    <span>
                                        千万吨吞吐量安全生产死亡人数逐年最小、最大、平均值统计结果
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

qwdttlswrs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(qwdttlswrs);
