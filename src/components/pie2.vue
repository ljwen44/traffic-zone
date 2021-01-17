<template>
    <div :id="echarts" ref="echarts" style="height: 200px;" class="ChartStyle"></div>
</template>

<script>
let pieChart = null
let option = {
    title: {
        text: "活跃时段偏向比率",
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
            let res = '<div class="tipbox"><div class="tip"><p>'+ params.name +':' + params.value + '</p></div></div>'
            return res
        }
    },
    legend: {
        orient: "vertical",
        x: "left",
        textStyle: {
            color: 'rgb(38, 90, 171)'
        },
        data: ['早上','下午','晚上']
    },
    calculable: true,
    series: [{
        radius: ['50%', '70%'],
        name: "活跃时段偏向比率",
        type: "pie",
        center: ["50%", "60%"],
        itemStyle: {
            normal: {
                color: (params) => {
                    var colorList = ['rgb(100, 149, 237)', 'rgb(135, 206, 250)', 'rgb(15, 25, 232)']
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
            this.axios.get('./data/time_rate_result.json').then(res => {
                this.data = res.data.pieData2
                pieChart.hideLoading()
                pieChart.setOption({
                    series: [
                        {
                            name: '活跃时段偏向比率',
                            data: [
                                {
                                    name: '早上',
                                    value: this.data[this.times].early_rate
                                },{
                                    name: '下午',
                                    value: this.data[this.times].noon_rate
                                },{
                                    name: '晚上',
                                    value: this.data[this.times].night_rate
                                }
                            ],
                            type: 'pie'
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
                        name: '活跃时段偏向比率',
                        data: [
                            {
                                name: '早上',
                                value: this.data[this.times].early_rate
                            },{
                                name: '下午',
                                value: this.data[this.times].noon_rate
                            },{
                                name: '晚上',
                                value: this.data[this.times].night_rate
                            }
                        ],
                        type: 'pie'
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