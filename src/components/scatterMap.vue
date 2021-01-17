
<template>
  <div ref="mapCon" class="map-wrapper">
    <div :id="echarts" ref="echarts" style="height: 100% !important;"></div>
    <div class="echartBox">
      <pie></pie>
      <br>
      <pie1></pie1>
    </div>
    <div class="tipbox" style="display: none; top:0; left:0" ref="tipbox">
      <div class="tip">
        <p><span class="iconfont iconzhandian"></span><span>站点: {{ info.mode_name }}</span></p>
        <p><span class="iconfont iconrenkou"></span><span>人数:{{ info.value }}</span></p> 
        <p><span class="iconfont iconjiaotongchuhang"></span><span>驻留率:{{ info.stay_rate }}</span></p>
        <p><span class="iconfont iconrenyuanjujiyujing"></span><span>聚集程度:{{ info.is_abnormal ? '异常聚集' : this.level[info.gether_level - 1] }}</span></p>
      </div>
    </div>
    <div class="legend">
      <ul>
        <li><img src="../assets/image/1.png" alt="" /><span style="color: #00beff;">畅行</span></li>
        <li><img src="../assets/image/2.png" alt="" /><span style="color: #5b00ff;">畅通</span></li>
        <li><img src="../assets/image/3.png" alt="" /><span style="color: #fff100;">阻塞</span></li>
        <li><img src="../assets/image/4.png" alt="" /><span style="color: #ed8800;">拥堵</span></li>
        <li><img src="../assets/image/5.png" alt="" /><span style="color: #f00;">堵塞</span></li>
        <li><img src="../assets/image/6.png" alt="" /><span style="color: #fff;">异常</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import pie from '_c/pie.vue'
import pie1 from '_c/pie2.vue'

let AMap = window.AMap

export default {
  name: 'mapCharts',
  data (){
    return {
      markers: [],
      amap: '',
      zoom: 14,
      startValue: 10,
      level: ['畅行','畅通','阻塞','拥堵','堵塞'],
      info: {
        mode_name: '',
        value: '',
        stay_rate: '',
        gether_level: '',
        is_abnormal: 0
      },
      times: 0, // 循环次数
      data: [],  // 数据集合
      timer: null, // 计时器
    }
  },
  components: {
    pie,
    pie1
  },
  methods:{
    async drawCharts(){
      this.$store.commit('showLoading')
      this.amap = new AMap.Map(this.echarts, {
          maxPitch: 75,
          pitch: 45, //45 俯仰角
          viewMode: '3D',
          zoom: 14,
          expandZoomRange: true,
          zooms: [3, 18],
          mapStyle: 'amap://styles/8c2001d370f1f293abe54d606cfcbd19', //地图主题
          center: [123.417133,41.868337], //中心点
          rotation: 0,  //顺时针旋转角度
          resizeEnable: true
      })
      await this.axios.get('./data/scatterData.json').then(res => {
          this.data = res.data.data
          // 地图加载完成之后显示数据
          this.amap.on('complete', () => {
            this.setMarkers(this.data[this.times])
          })

          // 地图缩放等级显示点标记
          this.amap.on('zoomend', () => {
            // 获取当前缩放等级
            let zoomend = this.amap.getZoom()
            if (this.zoom < zoomend){
              // 放大
              if(zoomend < 14){
                this.updateMarkers(this.startValue - 10)
                this.zoom = zoomend
                this.startValue = this.startValue - 10
              } else {
                this.updateMarkers(0)
                this.startValue = 10
              }
            } else {
              // 缩小
              if(zoomend < 14){
                  if(this.startValue >= 90){
                    this.zoom = zoomend
                  } else {
                      this.zoom = zoomend
                      this.updateMarkers(this.startValue + 10)
                      this.startValue = this.startValue + 10
                  }
              }
            }
          });

        }).catch(err => {
          alert("数据获取异常，请稍后重试！")
          this.$router.push('/error')
        })
      this.$store.commit('hideLoading')
    },
    // markers 赋值
    setMarkers(data){
      for(let i = 0; i < data.length; i++){
        let path = data[i].is_abnormal === 1
                  ? 'images/6.png'
                  : 'images/' + data[i].gether_level + '.png'
        let icon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(24, 40),
            // 图标的取图地址
            image: path,
            // 图标所用图片大小
            imageSize: new AMap.Size(24, 40),
            // 图标取图偏移量
            // imageOffset: new AMap.Pixel(-9, -3)
        })
        let marker = new AMap.Marker({
            map: this.amap,
            position: data[i].lon_lat,
            extData: data[i],
            zIndex: -1,
            icon: icon
        })
        
        this.markers.push(marker)
      }
      this.setMouseEvent()
    },
    // 设置鼠标事件
    setMouseEvent(){
      this.markers.forEach(item => {
        let data = item.getExtData()
        
        // 鼠标滑动
        item.on('mouseover', (event) => {
          let top = document.documentElement.clientHeight - window.event.clientY < 112
                    ? window.event.clientY - 112
                    : window.event.clientY
          let left = document.documentElement.clientWidth - window.event.clientX < 200
                    ? window.event.clientX - 200
                    : window.event.clientX
          let position = {
            left: left,
            top: top
          }
          this.setTip(data, position)
        })
        // 鼠标离开
        item.on('mouseout', (event) => {
          this.$refs.tipbox.style.display = 'none'
        })
        // 鼠标点击
        item.on('click', (event) => {
          this.amap.setCenter(data.lon_lat)
          this.amap.setZoom(this.zoom)
          event.target.setAnimation('AMAP_ANIMATION_BOUNCE')
        })
      })
    },

    // 更新 marker
    updateMarkers(value) {
      this.markers.forEach(item => {
        let val = item.getExtData().value
        if(val <= value){
          item.setMap(null)
        } else {
          item.setMap(this.amap)
        }
      })
    },

    // 设置提示框内容
    setTip(data, position){
      this.info.mode_name = data.mode_name
      this.info.value = data.value
      this.info.stay_rate = data.stay_rate
      this.info.gether_level = data.gether_level
      this.info.is_abnormal = data.is_abnormal
      this.$refs.tipbox.style.display = 'block'
      this.$refs.tipbox.style.top = position.top + 'px'
      this.$refs.tipbox.style.left = position.left + 'px'
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.drawCharts()
      this.timer = setInterval(() => {
        this.times++
        if(this.times > 5){
          this.times = 0
        }
        this.markers.splice(0,this.markers.length)
        this.amap.clearMap()
        this.setMarkers(this.data[this.times])
        this.updateMarkers(this.startValue)
        this.$refs.tipbox.style.display = 'none'
      }, 1000 * 15);
    })
  },
  computed: {
    echarts() {
      return 'echarts' + Math.random() * 100000;
    }
  },
  beforeDestroy() {
    if(this.amap){
      this.amap.destroy();
    }
    if(this.timer){
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
.echartBox{
  position: absolute;
  top: 10%;
  left: 1%;
  width: 25%;
  padding: 0 15px;
}

.legend{
  width: 10%;
  /* background: #064169; */
  position: absolute;
  right: 0%;
  top: 10%;
}
.legend li{
  list-style: none;
}
.legend img{
  width: 20px;
  height: 20px;
}
</style>