<template>
  <div ref="mapCon" class="map-wrapper">
    <div :id="echarts" ref="echarts" style="height: 100% !important;"></div>
    <div class="showBox" style="display: none" ref="showBox">{{ showBox }}</div>
    <div class="tipbox" style="display: none; top:0; left:0" ref="tipbox">
      <div class="tip">
        <p><span class="iconfont iconqidian"></span><span>路线:{{user.path_name}}</span></p>
        <p><span class="iconfont iconrenkou"></span><span>人数:{{user.value}}</span></p>
      </div>
    </div>
    <div id="top_div" v-if="list">
      <div class="top">
        <h3>当前路线人数排行</h3>
        <ul>
          <li class="top_li" v-for="(item, index) in (list || '').slice(0,10)" :key="index">
            <div>
              <span class="top_num">
                {{ index+1 }}
              </span>
              <span>
                {{ item.path_name }}
              </span>
              <span style="float:right;">
                {{ item.value }}人
              </span>
            </div>
          </li>
        </ul>
      </div>
      <br>
      <bar></bar>
    </div>
  </div>
</template>

<script>
import bar from '_c/bar.vue'
let AMap = window.AMap, Loca = window.Loca
export default {
  name: 'mapCharts',
  data (){
    return {
      amap: '',     // 地图
      showBox: '',  // 提示框
      user: {
        path_name: '',
        value: ''
      },
      layer: '',     // 图层
      markers: [],
      list: [],  // 表格数据
      times: 0,
      timer: null,
      data: []
    }
  },
  components: {
    bar
  },
  methods:{
    initAMap(){
      this.amap = new AMap.Map(this.echarts, {
        maxPitch: 75,
        pitch: 75, //45 俯仰角
        viewMode: '3D',
        zoom: 12,
        expandZoomRange: true,
        zooms: [3, 20],
        mapStyle: 'amap://styles/8c2001d370f1f293abe54d606cfcbd19', //地图主题
        center: [123.417133,41.868337], //中心点
        rotation: 0,  //顺时针旋转角度
        resizeEnable: true
      })
      this.layer = new Loca.LinkLayer({
          map: this.amap,
          fitView: false,
          eventSupport: true
      })  
      this.layer.setOptions({
          // blendMode: 'lighter',
          style: {
              // 曲率 [-1, 1] 区间
              curveness: function(data) {
                if(data.dis < 1000){
                  return 0.01;
                } else if(data.dis < 3000){
                  return 0.02;
                } else if(data.dis < 5000){
                  return 0.03;
                }  else if(data.dis < 7000){
                  return 0.04;
                } else {
                  return 0.05;
                }
              },
              opacity: 0.8,
              color: '#5DFBF9'
          }
      })
    },
    async drawCharts(){
      this.$store.commit('showLoading')
      this.initAMap()
      await this.axios.get('./data/path_data_result.json').then(res => {
          this.data = res.data.levelData
          this.amap.on('complete', () => {
            this.layer.setData(this.setDistance(this.data[this.times]), {
                lnglat: 'coords'
            })
            this.layer.on('mouseover', (event) => {
              let top = document.documentElement.clientHeight - event.originalEvent.clientY < 62
                        ? event.originalEvent.clientY - 62
                        : event.originalEvent.clientY
              let left = document.documentElement.clientWidth - event.originalEvent.clientX < 200
                        ? event.originalEvent.clientX - 200
                        : event.originalEvent.clientX
              let position = {
                left: left,
                top: top
              }
              this.setContent(event.rawData, position)
            })
            this.layer.on('mouseout', (event) => {
              this.$refs.tipbox.style.display = 'none'
            })
            this.layer.render();
            this.setMarkerData(this.data[this.times])
            this.list = this.data[this.times].sort((a, b) => {
              return b.value - a.value
            })
          })
        }).catch(err => {
          alert("数据获取异常，请稍后重试！")
          this.$router.push('/error')
        })
      this.$store.commit('hideLoading')
    },

    setDistance(data){
      data.forEach(item => {
        item["dis"] = AMap.GeometryUtil.distance(item.st_lon_lat,item.end_lon_lat)
        item["coords"] = [item.st_lon_lat, item.end_lon_lat]
      })
      return data
    },

    // 路线标注
    setMarkerData(data){
      for(let i = 0; i < data.length; i++){
        let s_marker = new AMap.Marker({
            map: this.amap,
            position: data[i].st_lon_lat,
            extData: data[i],
            zIndex: -1,
            icon:  new AMap.Icon({            
              image: 'images/startimg.png',
              size: new AMap.Size(90, 90),  //图标大小
              imageSize: new AMap.Size(45,45)
            }),
            offset: new AMap.Pixel(-22, -35)
        })
        let e_marker = new AMap.Marker({
            map: this.amap,
            position: data[i].end_lon_lat,
            extData: data[i],
            zIndex: -1,
            icon: new AMap.Icon({            
              image: 'images/endimg.png',
              size: new AMap.Size(90, 90),  //图标大小
              imageSize: new AMap.Size(45,45)
            }),
            offset: new AMap.Pixel(-22, -35)
        })
        this.markers.push(s_marker)
        this.markers.push(e_marker)
      }
    },  

    setContent(data, position){
      this.user["path_name"] = data.path_name
      this.user["value"] = data.value
      this.$refs.tipbox.style.display = 'block'
      this.$refs.tipbox.style.top = position.top + 'px'
      this.$refs.tipbox.style.left = position.left + 'px'
    }
  },
  mounted(){
    // 异步加载地图
    this.$nextTick(() => {
      this.drawCharts()
      this.timer = setInterval(() => {
          this.times++
          if(this.times > 9){
            this.times = 0
          }
          this.amap.clearMap()
          this.layer.setData(this.setDistance(this.data[this.times]), {
              lnglat: 'coords'
          })
          this.layer.render()
          this.markers.splice(0,this.markers.length)
          this.setMarkerData(this.data[this.times])
          this.list = this.data[this.times].sort((a, b) => {
            return b.value - a.value
          })
      }, 1000 * 30);
    })
  },
  computed: {
    echarts() {
      return 'echarts' + Math.random() * 100000;
    }
  },
  beforeDestroy() {
    if(this.amap){
      this.amap.destroy()
    }
    if(this.timer){
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
#top_div{
  overflow: auto;
  position: absolute;
  top: 10%;
  left: 1%;
  width: 30%;
}
.top{
  border: 2px solid #1046b0;
  border-radius: 10px;
  height: 250px;
  box-shadow: 5px 5px rgba(0, 18, 58, 0.5);
  overflow: auto;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(14, 43, 137, 0.5)), to(rgba(3, 5, 12, 0.5)));
}
.top h3{
  text-align: center;
  color: rgb(33, 85, 199);
  line-height: 1.5;
}
.top ul {
  list-style: none;
  padding:0;
  margin: 0 5%;
  color:rgb(33, 85, 199);
  line-height: 2;
}
.top_num{
  margin-right: 10px;
}
.top_li{
  cursor: context-menu;
}
.top_li:hover{
  background: rgba(0, 0, 0, 0.5);
}
.top_li:nth-child(1){
  color: red;
}
.top_li:nth-child(2){
  color: orange;
}
.top_li:nth-child(3){
  color:yellow
}
::-webkit-scrollbar{
  width: 0;
  background-color: #0e487c;
}
::-webkit-scrollbar-thumb{
  background-color: #4facfa;
}
</style>