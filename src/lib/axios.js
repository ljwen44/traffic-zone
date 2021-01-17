import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
      }
    }
    return config
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(
        config => { // 请求拦截器
          let cancel
          // 设置cancelToken对象
          config.cancelToken = new axios.CancelToken((c) => {
            cancel = c
        })
        if(this.queue[url]){
          return config
        }
        this.queue[url] = true
        config.headers['Authorization'] = getToken()
        return config
      }, error => {
        return Promise.reject(error)
      }
      
    )

    instance.interceptors.response.use(res => {
      delete this.queue[url]
      const { data } = res
      
      return data
    }, error => {
      delete this.queue[url]
      return Promise.reject(error)
    }) // 响应器
    
  } // 拦截器

  request (options) {
    const instance = axios.create() // 创建实例
    options = Object.assign(this.getInsideConfig(), options) // 将请求到的值和options转变成一个对象属性
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
