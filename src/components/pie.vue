<template>
    <div :id="echarts" ref="echarts" style="height: 200px;" class="ChartStyle"></div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

let pieChart = null
let option = {
    title: {
        text: "出行方式比较",
        subtext: '当前时段比较',
        subtextStyle: {
            color: 'rgb(38, 90, 171)'
        },
        x: "center",
        textStyle: {
            color: 'rgb(38, 90, 171)'
        }
    },
    tooltip: {
        backgroundColor: 'rgba(9,22,64,.8)',
        trigger: "item",
        position: ["20%","10%"],
        formatter: (params) => {
            let icon, name
            if(params.name === '公交'){
                icon = "icon-gongjiao"
                name = "公交"
            } else {
                icon = "icon-md-subway"
                name = "地铁"
            }
            let res = '<div class="tipbox"><div class="tip"><p><span class="iconfont ' + icon + '"></span><span>'+ name +':' + params.value + '</span></p></div></div>'
            
            return res
        }
    },
    legend: {
        orient: "vertical",
        x: "left",
        textStyle: {
            color: 'rgb(38, 90, 171)'
        },
        data: ['公交','地铁']
    },
    calculable: true,
    series: [{
        radius: ['50%', '70%'],
        name: "出行方式",
        type: "pie",
        center: ["50%", "60%"],
        itemStyle: {
            normal: {
                color: (params) => {
                    var colorList = ['rgb(100, 149, 237)', 'rgb(135, 206, 250)']
                    return colorList[params.dataIndex]
                }
            }
        }
    }]
}
export default {
    name:'pie',
    data() {
        return {
            times: 0,
            timer: null,
            data: []
        };
    },
    methods: {
        drawCharts() {
            pieChart.showLoading()
            this.axios.get('./data/bus_sub_result.json').then(res => {
                this.data = res.data.pieData
                pieChart.hideLoading()
                pieChart.setOption({
                    series: [
                        {
                            name: '出行方式',
                            data: [
                                {
                                    name: '公交',
                                    value: this.data[this.times].bus_rate,
                                },{
                                    name: '地铁',
                                    value: this.data[this.times].sub_rate
                                }
                            ],
                            type:'pie'
                        }
                    ]
                })
            }).catch(err => {
                alert('获取数据异常，请稍后重试！')
            })
        }
    },
    computed: {
        echarts() {
            return 'echarts' + Math.random() * 100000;
        }
    },
    mounted() {
        pieChart = this.$echarts.init(document.getElementById(this.echarts));
        pieChart.setOption(option)
        this.drawCharts();
        window.addEventListener("resize", ()=> {
            pieChart.resize()
        })
        this.timer = setInterval(() => {
            this.times++
            if(this.times > 189){
                this.times = 0
            }
            pieChart.setOption({
                series: [
                    {
                        name: '出行方式',
                        data: [
                            {
                                name: '公交',
                                value: this.data[this.times].bus_rate,
                            },{
                                name: '地铁',
                                value: this.data[this.times].sub_rate
                            }
                        ],
                        type:'pie'
                    }
                ]
            })
            
        }, 4000);
    },
    beforeDestroy() {
        if(pieChart){
            pieChart.clear()
        }
        if(this.timer){
            clearInterval(this.timer)
        }
    }
};
</script>

<style>
</style>