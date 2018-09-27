import React from 'react';
import {
    withStyles, Grid
} from 'material-ui';
import {
    ContentCopy, Store, InfoOutline, Warning, DateRange, LocalOffer, Update, ArrowUpward, AccessTime, Accessibility
} from 'material-ui-icons';
import PropTypes from 'prop-types';
// react plugin for creating charts
import ChartistGraph from 'react-chartist';
import EchartsCore from 'echarts-for-react/lib/core';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/bar';


import {
    StatsCard, ChartCard, TasksCard, RegularCard, Table, ItemGrid, ChartCardWithSearch
} from 'components';

import {
    harbourRadarChart
} from 'variables/charts';

import { dashboardStyle } from 'variables/styles';

import { userService } from '_services';

import Button from 'material-ui/Button';

import Menu, { MenuItem } from 'material-ui/Menu';
import { zIndex } from 'material-ui/styles';
import {cookies} from '../../variables/general';



function addParagraph(doc,x,y,p) {
    let line = [], length=0, isFirstLine=1;
    for(let i=0; i<p.length; i++){
        line.push(p[i]);
        if(p.charCodeAt(i)>255 || p[i]==='，' || p[i]==='。'){
            length+=5;
        }else length+=2.5;
        if((isFirstLine===1&&length>=160)||(isFirstLine===0&&length>=170)){
            if(isFirstLine===1){
                isFirstLine=0;
                doc.text(x,y,line.join(''));
                line.length=0;
                length=0;
            }else{
                doc.text(10,y=y+10,line.join(''));
                line.length=0;
                length=0;
            }
        }
    }
    if(line.length!==0){
        if(isFirstLine===1) doc.text(x,y,line.join(''));
        else doc.text(10,y=y+10,line.join(''));
    }
    return y;
}


var overall_metric_for_order_option = {
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
            name: '港口综合绩效得分',
            nameLocation : 'center',
            nameGap: '20'
        }
    ],
    yAxis : [
        {
            type : 'category',
            data :  [],
            max: 'dataMax'
        }
    ],
    series : [
        {
            name: '年',
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'right'
                }
            },
            data:  []
        },
    ]
};

var dataAxis = [];
var data = [];
var yMax = 500;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

var overall_metric_for_trend_option = {
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
    xAxis: {
        data: dataAxis,
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            onZero: false,
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: true
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        },
        min:3,
        max:10
    },
    toolbox: {
        show: true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: cookies.get('username')!=='guest'},
            magicType: {show: true, type: ['line', 'bar']},
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        /*{ // For shadow
            type: 'line',
            itemStyle: {
                normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap:'-100%',
            barCategoryGap:'40%',
            data: dataShadow,
            animation: false
        },*/
        {
            type: 'line',
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#83bff6'},
                            {offset: 0.5, color: '#188df0'},
                            {offset: 1, color: '#188df0'}
                        ]
                    )
                },
                emphasis: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#2378f7'},
                            {offset: 0.7, color: '#2378f7'},
                            {offset: 1, color: '#83bff6'}
                        ]
                    )
                }
            },
            data: data
        }
    ]
};

var gkjxzdf_option = {
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
            trigger: 'axis'
        },
        legend: {
            orient : 'horizontal',
            x : 'center',
            y : 'bottom',
            //show: false,
            data:['深圳','行业领先水平','行业平均水平','行业最低水平']
        },
        toolbox: {
            show: true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: cookies.get('username')!=='guest'}
            },
        },
        polar : [
        {
            indicator : [
                { text: '港口货物吞吐量', color:'#9932CC',max: 10},
                { text: '港口集装箱吞吐量', color:'#9932CC',max: 10},
                { text: '港口连通性', color:'#9932CC',max: 10},
                { text: '码头靠泊能力', color:'#9932CC',max: 10},
                { text: '港口岸线利用率', color:'#9932CC',max: 10},
                { text: '港口通过能力适应度', color:'#9932CC',max: 10},
                { text: '港口作业效率', color:'#9932CC',max: 10},
                { text: '港口经济贡献', color:'#9932CC',max: 10},
                { text: '绿色港口等级', color:'#9932CC',max: 10},
                { text: '港口安全生产水平', color:'#9932CC',max: 10},
                ]
            }
        ],
        calculable : true,
        series : [
            {
                type: 'radar',
                data : [
                    {
                        value : [0, 0,0,0,0,0,0,0,0,0],
                        name : '深圳'
                    },
                    {
                        value : [0, 0,0,0,0,0,0,0,0,0],
                        name : '行业领先水平'
                    },
                    {
                        value : [0, 0,0,0,0,0,0,0,0,0],
                        name : '行业平均水平'
                    },
                    {
                        value : [0, 0,0,0,0,0,0,0,0,0],
                        name : '行业最低水平'
                    }
                ]
            }
        ]
    }


class gkjxzdf_nh extends React.Component{
    state = {
        value: 0,
        open: false,
        yhgkhwttl: false,
        anchorEl: null,
        anchorEl_gk: null,
        year: '2016',
        gk_index: 0,
        overall_metric_for_radar: {
            gk: '',
            year: 2016,
            yhgkhwttl: 0,
            yhgkjzxttl: 0,
            dckbsl: 0,
            gkmtkbnl: 0,
            bmaxttl: 0,
            mtnlsyx: 0,
            cbzgpjts: 0,
            ddsr: 0,
            lsgkdj: 0,
            qwdttlswrs: 0,
            least_column: '',
            greatest_column: '',
            overall_metric: 0
        },
        overall_metric_for_trend: {
            year: 2016,
            metric:0
        },
        rank : 0,
        rank_last_year : 0,
        stat: 0
    };

    years = ['2016']; 
    gks = ['泸州港'];

    componentWillMount() {
        this.update_overall_metric_for_order(this.state.year);
        this.update_overall_metric_for_trend(this.state.gk_index);
        this.update_gkjxzdf(this.state.year,this.state.gk_index);
        this.update_overall_metric_rank(this.state.year, this.state.gk_index);
        this.get_gkjxzdf_year();
        this.get_gkjxzdf_gk();
        //this.setState({yhgkhwttl : true});
    }

    shouldComponentUpdate(nextProps, nextState) {
        
        return nextState.stat>=5;
    }

    constructor(props) {
        super(props);
       
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };


    get_gkjxzdf_year = () => {
        userService.get_gkjxzdf_year()
            .then(
                gkjxzdf_year => { 
                    this.years = gkjxzdf_year.map((item,index) => { return  item.year; });
                    this.setState(prev => ({stat: prev.stat+1}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    };

    get_gkjxzdf_gk = () => {
        userService.get_gkjxzdf_gk()
            .then(
                gkjxzdf_gk => { 
                    this.gks = gkjxzdf_gk.map((item,index) => { return  item.gk; });
                    
                    
                    //this.setState({ year: year });
                    this.setState(prev => ({stat: prev.stat+1}));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    };

    update_gkjxzdf = (year,gk_index) => {
        userService.get_gkjxzdf(year,this.gks[gk_index])
            .then(
                gkjxzdf => { 
                    
                    
                    //let gkArray = gkjxzdf.map((item,index) => { return  item.gk; });
                    //let qwdttlswrsArray = gkjxzdf.map((item,index) => { return item.qwdttlswrs; });
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
                            trigger: 'axis'
                        },
                        legend: {
                            orient : 'horizontal',
                            x : 'center',
                            y : 'bottom',
                            selected: {
                                '行业领先水平': false,
                                '行业平均水平': false,
                                '行业最低水平': false
                            },
                            //show: false,
                            data:[this.gks[gk_index],'行业领先水平','行业平均水平','行业最低水平']
                        },
                        toolbox: {
                            show: true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: cookies.get('username')!=='guest'},
                            },
                        },
                        polar : [
                        {
                            indicator : [
                                { text: '港口货物吞吐量', color:'#9932CC',max: 10},
                                { text: '港口集装箱吞吐量', color:'#9932CC',max: 10},
                                { text: '码头靠\n泊能力', color:'#9932CC',max: 10},
                                { text: '港口连通性', color:'#9932CC',max: 10},
                                { text: '港口岸线\n利用率', color:'#9932CC',max: 10},
                                { text: '港口作业\n效率', color:'#9932CC',max: 10},
                                { text: '船舶在港\n平均停时', color:'#9932CC',max: 10},
                                { text: '港口经\n济贡献', color:'#9932CC',max: 10},
                                { text: '绿色港口\n等级', color:'#9932CC',max: 10},
                                { text: '港口安全生产水平', color:'#9932CC',max: 10},
                                ]
                            }
                        ],
                        calculable : true,
                        series : [
                            {
                                type: 'radar',
                                lineStyle: {width: 3},
                                data : [
                                    {
                                        value : [gkjxzdf.yhgkhwttl, gkjxzdf.yhgkjzxttl , gkjxzdf.gkmtkbnl, gkjxzdf.dckbsl, gkjxzdf.bmaxttl, gkjxzdf.mtnlsyx, gkjxzdf.cbzgpjts, gkjxzdf.ddsr, gkjxzdf.lsgkdj, gkjxzdf.qwdttlswrs],
                                        name : this.gks[gk_index],
                                        itemStyle:{color:'red'}
                                    },
                                    {
                                        value : [gkjxzdf.yhgkhwttl_max, gkjxzdf.yhgkjzxttl_max ,  gkjxzdf.gkmtkbnl_max, gkjxzdf.dckbsl_max, gkjxzdf.bmaxttl_max, gkjxzdf.mtnlsyx_max, gkjxzdf.cbzgpjts_max, gkjxzdf.ddsr_max, gkjxzdf.lsgkdj_max, gkjxzdf.qwdttlswrs_max],
                                        name : '行业领先水平',
                                        itemStyle:{color:'blue'}
                                    },
                                    {
                                        value : [gkjxzdf.yhgkhwttl_avg, gkjxzdf.yhgkjzxttl_avg , gkjxzdf.gkmtkbnl_avg,gkjxzdf.dckbsl_avg,  gkjxzdf.bmaxttl_avg, gkjxzdf.mtnlsyx_avg, gkjxzdf.cbzgpjts_avg, gkjxzdf.ddsr_avg, gkjxzdf.lsgkdj_avg, gkjxzdf.qwdttlswrs_avg],
                                        name : '行业平均水平',
                                        itemStyle:{color:'green'}
                                    },
                                    {
                                        value : [gkjxzdf.yhgkhwttl_min, gkjxzdf.yhgkjzxttl_min , gkjxzdf.gkmtkbnl_min,gkjxzdf.dckbsl_min,  gkjxzdf.bmaxttl_min, gkjxzdf.mtnlsyx_min, gkjxzdf.cbzgpjts_min, gkjxzdf.ddsr_min, gkjxzdf.lsgkdj_min, gkjxzdf.qwdttlswrs_min],
                                        name : '行业最低水平',
                                        itemStyle:{color:'yellow'}
                                    }
                                ]
                            },
                        ]
                    };
                               
                    gkjxzdf_option = option;
                    
                    //this.setState({ year: year, gk_index:gk_index, overall_metric_for_radar: gkjxzdf});
                    //this.setState({ anchorEl_gk: null,anchorEl: null});
                    this.setState(prev => ({
                        stat: prev.stat+1,
                        year: year,
                        gk_index: gk_index,
                        overall_metric_for_radar: gkjxzdf,
                        anchorEl_gk: null,
                        anchorEl: null
                    }))
                    
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    };

    update_overall_metric_for_order = (year) => {
        // if(year == this.state.year)
        //     return;
        
        userService.get_overall_metric_for_order(year)
            .then(
                overall_metric_for_order => { 
                    let gkArray = overall_metric_for_order.map((item,index) => { return  item.gk; });
                    let metricArray =  overall_metric_for_order.map((item,index) => { return item.metric; });
                    
                    
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
                                saveAsImage : {show: cookies.get('username')!=='guest'},
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'value',
                                name: '港口综合绩效得分',
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
                                data: metricArray
                            }
                        ]
                    };
                               
                    overall_metric_for_order_option = option;
                    this.setState(prev => ({stat: prev.stat+1}));
                    console.log('update_overall_metric_for_order')

                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    }
    update_overall_metric_for_trend = (gk_index) => {
        // if(year == this.state.year)
        //     return;
        userService.get_overall_metric_for_trend(this.gks[gk_index])
            .then(
                overall_metric_for_trend => { 
                    let yearArray = overall_metric_for_trend.map((item,index) => { return  item.year+'年'; });
                    let metricArray =  overall_metric_for_trend.map((item,index) => { return item.metric; });
                    let yMaxMetric = 10;
                    let dataShadow = [];

                    for (var i = 0; i < metricArray.length; i++) {
                        dataShadow.push(yMaxMetric);
                    }
                    
                    
                    var option = {
                        tooltip: {
                            trigger: 'axis'
                        },
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
                        toolbox: {
                            show: true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: cookies.get('username')!=='guest'},
                                magicType: {show: true, type: ['line', 'bar']},
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: yearArray,
                            axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            axisTick: {
                                show: true
                            },
                            axisLine: {
                                show: true,
                                onZero: false,
                            },
                            z: 10
                        },
                        yAxis: {
                            min: 3,
                            max: 10,
                            axisLine: {
                                show: true
                            },
                            axisTick: {
                                show: true
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside'
                            }
                        ],
                        series: [
                            /*{ // For shadow
                                type: 'line',
                                itemStyle: {
                                    normal: {color: 'rgba(0,0,0,0.05)'}
                                },
                                barGap:'-100%',
                                barCategoryGap:'40%',
                                data: dataShadow,
                                animation: false
                            },*/
                            {
                                type: 'line',
                                //smooth: 'true',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#83bff6'},
                                                {offset: 0.5, color: '#188df0'},
                                                {offset: 1, color: '#188df0'}
                                            ]
                                        )
                                    },
                                    emphasis: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 1, color: '#83bff6'}
                                            ]
                                        )
                                    }
                                },
                                data: metricArray
                            },
                            /*{
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#83bff6'},
                                                {offset: 0.5, color: '#188df0'},
                                                {offset: 1, color: '#188df0'}
                                            ]
                                        )
                                    },
                                    emphasis: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 1, color: '#83bff6'}
                                            ]
                                        )
                                    }
                                },
                                data: metricArray
                            }*/
                        ]
                    };
                               
                    overall_metric_for_trend_option = option;
                    //this.setState({ overall_metric_for_trend: overall_metric_for_trend});
                    this.setState(prev => ({
                        stat: prev.stat+1,
                        overall_metric_for_trend: overall_metric_for_trend
                    }));
                },
                error => {
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );

    };
    update_overall_metric_rank = (year,gk_index) => {
        userService.get_overall_metric_rank(year,this.gks[gk_index])
            .then(
                rank => {
                    this.setState(prev => ({
                            stat: prev.stat+1,
                            rank: rank
                        }));
                }
            );
        userService.get_overall_metric_rank(year,this.gks[gk_index])
            .then(
                rank => {
                    this.setState(prev => ({
                        stat: prev.stat+1,
                        rank_last_year: rank
                    }));
                }
            );
    };


    handleChangeIndex = index => {
          this.setState({ value: index });
    };

    handleClick = event => {
          this.setState({ anchorEl: event.currentTarget });
        //this.get_yhgkhwttl_year();
      };

    handle_gkMenuClick = event => {
    this.setState({ anchorEl_gk: event.currentTarget });
    //this.get_yhgkhwttl_year();
    };
    
    handleClose = event => {
       
        const year = event.currentTarget.value === undefined?this.state.year:event.currentTarget.value;

        //alert(event.currentTarget.value);
        this.update_overall_metric_for_order(year);
        this.update_gkjxzdf(year,this.state.gk_index);
        this.update_overall_metric_rank(year,this.state.gk_index);
        
     };

     handle_gkMenuClose = event => {
        //this.setState({ anchorEl_gk: null});
        const gk_index = event.currentTarget.value;
        
        this.update_overall_metric_for_trend(gk_index);
        this.update_gkjxzdf(this.state.year,gk_index);
        this.update_overall_metric_rank(this.state.year,gk_index);
        //alert(gk_index);
        //this.setState({gk_index:event.currentTarget.value});
       
     };



    render(){
        const { classes } = this.props;
        const { open } = this.state;
        const { anchorEl } = this.state;
        const { anchorEl_gk } = this.state;
        const { year} = this.state;
        const { gk_index} = this.state;
        const { overall_metric_for_radar} = this.state;
        const { overall_metric_for_trend} = this.state;
        const { rank} = this.state;
        const { rank_last_year} = this.state;
        
        var metric_trend = overall_metric_for_trend;
        var year_metric = {};

        for (var i = 0, item; i < metric_trend.length; i++) {
            item = metric_trend[i];
            year_metric[item.year] = item.metric;
        }
        var increase=0;
        if (year_metric[year-1] === undefined)
            increase = 0;
        else{
            increase = year_metric[year] - year_metric[year-1];
            increase = increase.toFixed(2);
        }
        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'year-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style={{fontSize: 18, fontWeight:'bold'}}
                >
                    选择年份（当前是{year}年）
                </Button>
                <Menu
                    id="year-menu"
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
                                onClick={this.handleClose}
                                >
                                {value}年
                                </MenuItem>
                            );
                        })
                }
                 </Menu>
                 <Button
                    aria-owns={anchorEl_gk ? 'gk-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handle_gkMenuClick}
                    style={{fontSize: 18, fontWeight:'bold'}}
                >
                    选择港口（当前是{this.gks[gk_index]}）
                </Button>
                <Menu
                    id="gk-menu"
                    anchorEl={anchorEl_gk}
                    open={Boolean(anchorEl_gk)}
                    onClose={this.handle_gkMenuClose}
                >
                {
                    this.gks.map((value,index)=>{return (<MenuItem value={index} key={index} onClick={this.handle_gkMenuClose}>{value}</MenuItem>);})
               }
                </Menu>
                <Grid container >
                    <ItemGrid xs={12} sm={12} md={6}>
                        <ChartCard
                            chart={
                                <ReactEcharts
                                ref={(e) => {this.echart_for_radar = e;}}
                                echarts={echarts}
                                option={gkjxzdf_option}
                                style={{height: '500px', width: '100%'}} 
                                notMerge={true}
                                lazyUpdate={false}
                                theme={"default"} />
                            }
                            chartColor="gray"
                            title="港口绩效评价"
                            text={
                            <div>
                                <span>
                                      {year}年{this.gks[gk_index]}综合绩效水平为{overall_metric_for_radar.overall_metric}分，{overall_metric_for_radar.least_column}，{overall_metric_for_radar.greatest_column}。
                                </span>
                                <button onClick={()=>{
                                    let instance_for_radar = this.echart_for_radar.getEchartsInstance();
                                    let instance_for_trend = this.echart_for_trend.getEchartsInstance();
                                    let instance_for_order = this.echart_for_order.getEchartsInstance();
                                    let doc = new jsPDF();
                                    let trend = '';
                                    if(overall_metric_for_trend[0].metric<=overall_metric_for_trend[1].metric && overall_metric_for_trend[1].metric<=overall_metric_for_trend[2].metric && overall_metric_for_trend[2].metric<=overall_metric_for_trend[3].metric)
                                        trend = '稳步提升';
                                    else if(overall_metric_for_trend[0].metric>=overall_metric_for_trend[1].metric && overall_metric_for_trend[1].metric>=overall_metric_for_trend[2].metric && overall_metric_for_trend[2].metric>=overall_metric_for_trend[3].metric)
                                        trend = '不断下降';
                                    else if(overall_metric_for_trend[0].metric<=overall_metric_for_trend[3].metric)
                                        trend = '波动提升';
                                    else trend = '波动下降';
                                    doc.addFont('simhei.ttf', 'simhei', 'normal');
                                    doc.addFont('STHeitiBold.ttf', 'stheitibold', 'normal');
                                    doc.setFont('stheitibold');
                                    doc.text(year+'年'+this.gks[gk_index]+'综合绩效评估',doc.internal.pageSize.getWidth() / 2,20,'center');
                                    doc.text('分析报告',doc.internal.pageSize.getWidth() / 2,30,'center');
                                    doc.setFont('simhei','normal');
                                    let p = year+'年'+this.gks[gk_index]+'综合绩效水平为'+overall_metric_for_radar.overall_metric+'分，较上一年'+(increase>=0?"提升":"下降")+'了'+Math.abs(increase)+'分。'+'从近三年发展情况来看，'+this.gks[gk_index]+'的综合绩效水平呈现'+trend+'态势，见下图。';
                                    let y = addParagraph(doc, 20, 40, p);
                                    doc.addImage(instance_for_trend.getDataURL({type:'jpeg',pixelRatio: 5,backgroundColor: '#f0f0f0'}),'JPEG',40,y=y+10,120,80);
                                    doc.text('图1.'+year+'年'+this.gks[gk_index]+'综合绩效历史走势图',doc.internal.pageSize.getWidth() / 2,y=y+90,'center');
                                    p = '从'+this.gks[gk_index]+'的港口绩效雷达图来看，'+year+'年'+this.gks[gk_index]+overall_metric_for_radar.least_column+'，'+overall_metric_for_radar.greatest_column+'，见下图。';
                                    y = addParagraph(doc, 20, y=y+10, p);
                                    doc.addImage(instance_for_radar.getDataURL({type:'jpeg',pixelRatio: 5,backgroundColor: '#f0f0f0'}),'JPEG',40,y=y+10,120,80);
                                    doc.text('图2.'+year+'年'+this.gks[gk_index]+'综合绩效雷达图',doc.internal.pageSize.getWidth() / 2,y=y+90,'center');
                                    //let rank = userService.get_overall_metric_rank(year,this.gks[gk_index]).rank, rank_last_year = userService.get_overall_metric_rank(year-1,this.gks[gk_index]).rank;
                                    let rank=this.state.rank, rank_last_year = this.state.rank_last_year;
                                    let rank_change;
                                    if(!rank_last_year || rank === rank_last_year) rank_change = '与去年持平';
                                    else if(rank > rank_last_year) rank_change = '比去年升高'+rank-rank_last_year+'位';
                                    else rank_change = '比去年降低'+rank_last_year-rank+'位';
                                    doc.addPage();
                                    y = 20;
                                    p = '从港口绩效排名看，'+year+'年'+this.gks[gk_index]+'位列全国沿海第'+rank+'位，排名'+rank_change+'，见下图。';
                                    y = addParagraph(doc, 20, y, p);
                                    doc.addImage(instance_for_order.getDataURL({type:'jpeg',pixelRatio: 5,backgroundColor: '#f0f0f0'}),'JPEG',40,y=y+10,120,80);
                                    doc.text('图3.'+year+'年'+this.gks[gk_index]+'综合绩效排名图',doc.internal.pageSize.getWidth() / 2,y=y+90,'center');
                                    doc.save('绩效评估报告.pdf');
                                }
                                }>导出报告</button>
                            </div>
                            }
                            statIcon={AccessTime}
                            statText={new Date().toLocaleString()}
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={6}>
                        <ChartCard
                                chart={
                                    <EchartsCore
                                    ref={(e) => {this.echart_for_trend = e;}}
                                    echarts={echarts}
                                    option={overall_metric_for_trend_option}
                                    style={{height: '500px', width: '100%'}} 
                                    notMerge={true}
                                    lazyUpdate={false}
                                    theme={"default"} />
                                }
                                chartColor="gray"
                                title="港口绩效水平走势图"
                                text={
                                    <span>
                                        {year}年{this.gks[gk_index]}综合绩效水平为{overall_metric_for_radar.overall_metric}分，较上一年{increase>=0?"提升":"下降"}了{Math.abs(increase)}分。
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
                                    ref={(e) => {this.echart_for_order = e;}}
                                    echarts={echarts}
                                    option={overall_metric_for_order_option}
                                    style={{height: '600px', width: '100%'}} 
                                    notMerge={true}
                                    lazyUpdate={false}
                                    theme={"default"} />
                                }
                                chartColor="gray"
                                title="港口绩效得分"
                                text={
                                    <span>
                                        {year}年港口绩效得分
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

gkjxzdf_nh.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(gkjxzdf_nh);
