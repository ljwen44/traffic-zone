<template>
  <div class="box">
    <div class="row" style="height: 100%;">
      <div class="left">
        <div class="left1">
          <router-link to="/heatMap" tag="div" class="left_child">
            <h6 class="iconfont icon-relitu"></h6>
            <h6>交通热力图</h6>
          </router-link></div>
        <div class="left2">
          <router-link to="/scatterMap" tag="div" class="left_child">
            <h6 class="iconfont icon-sandiantu"></h6>
            <h6>人口分布图</h6>
          </router-link>
        </div>
        <div class="left3">
          <router-link to="/lineMap" tag="div" class="left_child">
            <h6 class="iconfont icon-location" style="padding-left: 5%;"></h6>
            <h6>人口流动图</h6>
          </router-link>
        </div>
      </div>
      <div class="middle">
        <img src="../assets/image/header.png" alt="">
      </div>
      <div class="right">
        <div class="right1">
          <i class="iconfont icon-guanbi"></i>
          <span @click="layout()">退出</span>
        </div>
        <div class="right2">
          <span class="time">{{ nowDate + ' ' + nowTime + ' ' + nowWeek }}</span>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { getCookie, delCookie } from '@/lib/cookie.js'
export default {
  data(){
    return {
      nowDate: "",    // 当前日期
      nowTime: "",    // 当前时间
      nowWeek: "",     // 当前星期
      timer: '',         // 定时器
      user: ''
    }
  },
  mounted(){
  },
  methods: {
    // 获取当前时间并显示
    getDate(){
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let week = new Date().getDay();
      let hh = new Date().getHours() < 10 ? "0" + new Date().getHours() : new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes();
      let sf = new Date().getSeconds() < 10 ? "0" + new Date().getSeconds() : new Date().getSeconds();
      if (week == 1) {
          this.nowWeek = "星期一";
      } else if (week == 2) {
          this.nowWeek = "星期二";
      } else if (week == 3) {
          this.nowWeek = "星期三";
      } else if (week == 4) {
          this.nowWeek = "星期四";
      } else if (week == 5) {
          this.nowWeek = "星期五";
      } else if (week == 6) {
          this.nowWeek = "星期六";
      } else {
          this.nowWeek = "星期日";
      }
      _this.nowTime = hh + ":" + mf + ":" + sf;
      _this.nowDate = yy + "/" + mm + "/" + dd;
    },

    // 退出登录
    layout() {
      if(window.confirm('你确定要退出吗？')){
        /*删除cookie*/
        delCookie('username')
        alert("退出成功！")
        return this.$router.push('/login')
      } else {
        return false;
      }
    }
  },
  created(){
    this.timer = setInterval(() => {
      this.getDate()
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>

<style scoped>
.box{
  background: #000001;
  width: 100%;
  height: 8%;
  position: absolute;
  z-index: 11111;
  overflow: hidden;
}
h6{
  cursor: pointer;
  display: inline-block;
}
.left{
  width: 33%;
  float: left;
}
.left1{
  margin-top: 2%;
  height: 70%;
  width: 33.3333%;
  float: left;
  position: relative;
}
.left1::after{
  position:absolute;
  top: 0;
  bottom: 0;
  right: 20%;
  content: '';
  background-image: linear-gradient(to right, #1d5cbb , #194c9c);
  z-index: -1;
  transform: skewX(45deg);
  width: 100%;
  height: 100%;
}
.left_child{
  height: 100%;
  line-height: 3;
}
.left_child h6:nth-child(1){
  margin-top: 5%;
  margin-left: 5%;
}
.left_child h6:nth-child(2){
  margin-left: 3%;
}

.left2{
  height: 100%;
  height: 70%;
  width: 33.3333%;
  float: left;
  position: relative;
  margin-top: 2%;
}
.left2::after{
  position:absolute;
  top: 0;
  bottom: 0;
  right: 10%;
  content: '';
  background-image: linear-gradient(to right, #194c9c , #0a2141);
  z-index: -1;
  transform: skewX(45deg);
  width: 100%;
  height: 100%;
}

.left3{
  height: 70%;
  width: 33.3333%;
  float: left;
  margin-top: 2%;
  position: relative;
}

.left3::after{
  position:absolute;
  top: 0;
  bottom: 0;
  right: 0;
  content: '';
  background-image: linear-gradient(to right, #0a2141 , #03070f);
  z-index: -1;
  transform: skewX(45deg);
  width: 100%;
  height: 100%;
}
.left_child:nth-child(3) h6:nth-child(1){
  margin-left: 5%;
}


.middle{
  width: 40%;
  float: left;
}
.middle img{
  width: 100%;
}

.right{
  width: 27%;
  float: left;
}
.right1{
  margin-top: 2%;
  height: 70%;
  width: 28%;
  float: right;
  position: relative;
  line-height: 3;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.right1 i {
  margin-left: 20%;
}
.right1::after{
  position:absolute;
  top: 0;
  bottom: 0;
  right: -25%;
  content: '';
  background-image: linear-gradient(to right, #1a52a7 , #1d5cbb);
  z-index: -1;
  transform: skewX(-45deg);
  width: 100%;
  height: 100%;
}

.right2{
  float: right;
  margin-top: 2%;
  height: 70%;
  width: 60%;
  line-height: 3;
  position: relative;
}
.right2::after{
  position:absolute;
  top: 0;
  bottom: 0;
  right: 10%;
  content: '';
  background-image: linear-gradient(to right, #030810 , #1b54ac);
  z-index: -1;
  transform: skewX(-45deg);
  width: 100%;
  height: 100%;
}

</style>