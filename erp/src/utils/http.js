import axios from 'axios'
import { that } from '../main.js'
import qs from 'query-string'

// 表示跨域请求时是否带cookie
axios.defaults.withCredentials = true
// 超时时间20s
axios.defaults.timeout = 15000
//
axios.defaults.crossDomain = true

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // console.log(config)
  if (config.params) {
    // eslint-disable-next-line no-undef
    config.params = $removeBlank(config.params)
    config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' })
  }

  return config
}, error => Promise.reject(error))

let alerted = false

axios.interceptors.response.use((response) => {
  if (response.config._notice !== false) {
    // 判断http状态码
    if ([200, 304, 400].indexOf(response.status) === -1) {
      that.$alert('网络异常！', '提示', { type: 'error' })
      throw new Error('网络异常！')
    } else if (response.data.code === -401) {
      if (!alerted) {
        alerted = true
        that.$alert('登录超时！', '提示', { type: 'error' }).then(() => that.$router.push('/login'))
        setTimeout(() => {
          alerted = false
        }, 5000)
        throw new Error('登录超时！')
      }
    } else if (response.data.code !== 0) {
      that.$alert(response.data.message || '请求失败！', '提示', { type: 'error' })
      throw new Error(response.data.message || '请求失败！')
    }
  }
  return response.data
}, error => Promise.reject(error))

export const xhr = axios
