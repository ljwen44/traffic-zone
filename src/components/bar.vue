<template>
    <div style="height: 300px;" class="ChartStyle">
        <div class="titlebox">
            <p>各时段流动人数</p>
            <span>当前时段人数：{{ number }}人</span>
        </div>
        <div style="height: 90%;" :id="echarts" ref="echarts"></div>
    </div>
</template>

<script>

let xAxisData = [
    '07:00','08:00',
    '09:00','10:00','11:00','12:00',
    '13:00','14:00','15:00','16:00',
    '17:00','18:00','19:00','20:00',
    '21:00','22:00','23:00'
]
let barCharts = null
let option = {
    tooltip: {
        backgroundColor: 'rgba(9,22,64,.8)',
        trigger: "axis",
        show: true,
        axisPointer: {
            type: "shadow"
        },
        formatter: (params) => {
            let res = '<div class="tipbox"><div class="tip"><p><span class="iconfont iconshizhong"></span><span>时间:' + params[0].data.times_interval + '</span></p>' + 
            '<p><span class="iconfont iconrenkou"></span><span>人数:'+ params[0].data.value + '人</span></p></div></div>'
            return res
        },
        position: ["30%","10%"]
    },
    calculable: true,
    xAxis : [
        {
            // type : 'time',
            data : xAxisData,    
            //设置轴线的属性
            position: "bottom",
            nameTextStyle: {
                color: "rgb(79, 106, 119)"
            },
            axisLabel: {        
                show: true,
                textStyle: {
                    color: 'rgb(33, 85, 199)'
                }
            },
            // x轴的颜色和宽度
            axisLine:{
                lineStyle:{
                    color:'rgb(33, 85, 199)'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            
        }
    ],
    yAxis: [
        {
            type: "value",
            name: "/人",
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'transparent'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'rgb(33, 85, 199)'
                }
            },
            // y轴的颜色和宽度
            axisLine:{
                lineStyle:{
                    color:'rgb(33, 85, 199)'
                }
            }
        }
    ],
    series: [
        {
            name: "时段流动人数",
            type: "bar",
            data: [],
            markPoint: {
                data: [
                    {
                        type: "max",
                        name: "最大值"
                    },
                    {
                        type: "min",
                        name: "最小值"
                    }
                ]
            },
            itemStyle: {
                normal: {
                    color: (params) => {
                        if(params.data.is_peak){
                            return '#EE3B3B'
                        } else {
                            return 'rgb(5, 65, 104)'
                        }
                    }
                }
            }
        }
    ]
}
export default {
    name: 'bar',
    data (){
        return {
            number: '',
            barData: [],
            times: 0,
            timer: null,
            time: null // 获取当地时间
        }
    },
    methods: {
        drawCharts(){
            barCharts = this.$echarts.init(document.getElementById(this.echarts));
            barCharts.showLoading()
            this.axios.get('./data/time_nums_result.json', {}).then(res => {
                this.barData = res.data.barData
                this.number = this.barData[this.times][this.barData[this.times].length-1].value
                barCharts.hideLoading()
                barCharts.setOption(option)
                barCharts.setOption({
                    series: [
                        {
                            name: '时段流动人数',
                            data: this.barData[this.times]
                        }
                    ]
                })
            }).catch(err => {
                alert('获取数据异常，请稍后重试！')
            })
        },
    },
    mounted(){
        this.time = new Date().getHours()
        if(this.time < 6){
            this.times = 0
        } else if(this.time > 23){
            this.times = 18
        } else {
            this.times = this.time - 6
        }
        this.drawCharts()
        window.addEventListener("resize", ()=> {
            barCharts.resize()
        })
        this.timer = setInterval(() => {
            this.times++
            if(this.times > 189){
                this.times = 0 
            }
            this.number = this.barData[this.times][this.barData[this.times].length-1].value
            barCharts.hideLoading()
            barCharts.setOption(option)
            barCharts.setOption({
                series: [
                    {
                        name: '时段流动人数',
                        data: this.barData[this.times]
                    }
                ]
            })
        }, 1000*60*60);
    },
    computed: {
        echarts() {
            return 'echarts' + Math.random() * 100000;
        },
    },
    beforeDestroy() {
        if(barCharts){
            barCharts.clear()
        }
        if(this.timer){
            clearInterval(this.timer)
        }
    }
}
</script>

<style scoped>
.titlebox{
    height: 10%;
    color: #256abc;
    text-align: center;
}
.titlebox p{
    margin-bottom: 0;
}
</style>