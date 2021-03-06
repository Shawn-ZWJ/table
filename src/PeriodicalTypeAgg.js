import React, { Component } from 'react';
import axios from 'axios';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入扇形图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';


export default class PeriodicalTypeAgg extends Component {
    componentDidMount() {
        axios.get('http://localhost:8081/api/periodical/agg/type')
            .then((res) => {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('periodicalPublishAgg'));
                let sourse1 = [];
                let sourse2 = [];
                console.log(res);
                for (var i = 0; i < 8; i++) {
                    sourse1.push(res.data[i].commonId);
                    sourse2.push({name:res.data[i].commonId,value:res.data[i].count});
                }
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: '同标签期刊数量统计',
                        subtext: '来源网络',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: sourse1,

                    },
                    series : [
                        {
                            name: '标签',
                            type: 'pie',
                            radius : '55%',
                            center: ['40%', '50%'],
                            data: sourse2,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            });

    }
    render() {
        return (
            <div id="periodicalPublishAgg" style={{ width: 1000, height: 1000 }}></div>
        );
    }
}