import { xhr } from '@/utils/http'
import md5 from 'js-md5'
import { store } from '@/utils/cache'

// import md5 from 'js-md5'
import _ from 'lodash'
// 二级域名
// const secondaryDomain = window.location.hostname.split('.').splice(1).join('.')

const asyncContext = require.context('./', true, /\.js$/)
const api = {}
asyncContext.keys().forEach((key, index) => {
  if (key !== './_init.js') {
    const config = require(`${key}`).config
    const service = (config.name || key.replace('.js', '').replace('./', ''))
    const module = {}
    // const baseUrl = config.baseUrl || `//${service}.${secondaryDomain}`
    const baseUrl = config.baseUrl || ''
    _.forEach(['post', 'get'], (method, index) => {
      _.forEach(config[method], (url, name) => {
        if (module[name]) {
          console.error(`${service}.${name}命名冲突，请更换名称`)
          return
        }

        url = baseUrl + url
        module[name] = function({ params, data, headers, expire, notice }) {
          console.log('调用接口： ', method, url, params, data, headers, expire)
          let cacheKey
          const needCache = expire > 0
          if (needCache) {
            cacheKey = `${method}_${url}_${md5(JSON.stringify(params) + JSON.stringify(data))}`
            const r = store.get(cacheKey)
            // 从缓存里面取到了
            if (r) {
              return Promise.resolve(r)
            } else {
              // 没取到去调用接口
              return new Promise((resolve, reject) => {
                xhr({ url, method, params, data, headers, notice })
                  .then(res => {
                    store.set(cacheKey, res, expire)
                    resolve(res)
                  })
                  .catch(err => {
                    reject(err)
                  })
              })
            }
          }
          return xhr({ url, method, params, data, headers, _notice: notice })
        }
      })
    })

    api[service + 'Service'] = module
  }
}, {})

export default api
