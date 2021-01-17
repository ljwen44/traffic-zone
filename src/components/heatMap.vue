<template>
  <div ref="mapCon" class="map-wrapper">
    <div :id="echarts" ref="echarts" style="height: 100% !important;"></div>
    <div class="heat">
      <ul>
        <li><span class="heatbox" style="background:red;"></span><span style="color:red;">人数 > 90</span></li>
        <li><span class="heatbox" style="background:#d78e1b;"></span><span style="color:#d78e1b;">70 &lt; 人数 &lt; 90</span></li>
        <li><span class="heatbox" style="background:#54b20b;"></span><span style="color:#54b20b;">50 &lt; 人数 &lt; 70</span></li>
        <li><span class="heatbox" style="background:blue;"></span><span style="color:blue;">人数 &lt; 50</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
let AMap = window.AMap
export default {
  name: 'mapCharts',
  data (){
    return {
      heatMapData: [],
      heatmap: '',
      amap: '',
      heatmapOpts: '',
      times: 0,
      timer: null
    }
  },
  methods:{
    initAMap(){
      this.amap = new AMap.Map(this.echarts, {
          maxPitch: 75,
          pitch: 45, //45 俯仰角
          viewMode: '3D',
          zoom: 14,
          expandZoomRange: true,
          zooms: [3, 20],
          mapStyle: 'amap://styles/8c2001d370f1f293abe54d606cfcbd19', //地图主题
          center: [123.417133,41.868337], //中心点
          rotation: 0,  //顺时针旋转角度
          resizeEnable: true
      })
      this.heatmapOpts = {
          //3d 相关的参数
          '3d': {
              //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
              heightBezier: [0.4, 0.2, 0.4, 0.8],
              //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
              gridSize: 2,
              heightScale: 1
          }
      }
    },
    async drawCharts(){
        this.$store.commit('showLoading')
        this.initAMap()
        await this.axios.get('./data/heatMap.json').then(res => {
          this.heatMapData = res.data.heatMapData
          this.amap.on('complete', () => {
            this.heatmap = new AMap.Heatmap(this.amap, this.heatmapOpts);
            this.heatmap.setDataSet({
                data: this.heatMapData[this.times],
                max: 100
            });
          })
          
        }).catch(err => {
          alert("数据获取异常，请稍后重试！")
          this.$router.push('/error')
        })
        this.$store.commit('hideLoading')
    },
    
  },
  mounted(){
    this.$nextTick(() => {
      this.drawCharts()
      this.timer = setInterval(() => {
        this.times++
        if(this.times > 11){
          this.times = 0
        }
        this.heatmap.setDataSet({
            data: this.heatMapData[this.times]
        })
        
      }, 1000 * 10);
    })
  },
  beforeDestroy () {
    if(this.amap){
      this.amap.destroy();
    }
    if(this.timer){
      clearInterval(this.timer)
    }
  },
  computed: {
    echarts() {
      return 'echarts' + Math.random() * 100000;
    }
  }
}
</script>

<style scoped>
.heat{
  position: absolute;
  top: 10%;
  right: 5%;
}
.heat ul {
  padding-left: 0;
  margin: 0;
  list-style: none;
}
.heatbox{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>