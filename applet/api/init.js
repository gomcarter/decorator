import http from '../frameworks/http'
import { serverHost } from '../utils/config'

const api = {};
['adam.js'].forEach(moduleName => {
  const config = require('service/' + moduleName);
  const service = (config.name || moduleName.replace('.js', '').replace('./', ''))
  const module = {}
  const baseUrl = `${serverHost}${service}/`;
  
  ['post', 'get'].forEach(method => {
    // console.log(method, config[method])
    for (const name in config[method]) {
      // console.log(method, name)

      if (module[name]) {
        console.error(`${service}.${name}命名冲突`)
        return
      }

      // TODO: 加缓存
      module[name] = function (data, headers, dataType, cache = 0) {
        const requestUrl = baseUrl + '//' + url
        data.__cache_time__ = cache
        return http[method](requestUrl, data, headers, dataType)
      }

      api[service + 'Service'] = module
      // console.log(api, module)
    }
  })
})

module.exports = {
  ...api
}