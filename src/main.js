import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './assets/css/init.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

// import '@/assets/iconfont/iconfont.css'



// 引入 mock 模拟数据
if (process.env.NODE_ENV !== 'production') require('./mock')

const Bus = new Vue()
Vue.prototype.$bus = Bus
Vue.prototype.axios = axios
Vue.config.productionTip = false

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#App')
