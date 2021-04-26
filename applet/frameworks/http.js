// import { member } from '/components/utils/member'
// import { config } from '/components/utils/config'
import util from '../utils/util'

/**
 * 传给服务器的数据最终会是 String 类型，如果 data 不是 String 类型，会被转换成 String 。转换规则如下：

若方法为 GET，会将数据转换成 query string： encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...

若方法为 POST 且 headers['content-type'] 为 application/json ，会对数据进行 JSON 序列化。

若方法为 POST 且 headers['content-type'] 为 application/x-www-form-urlencoded ，会将数据转换成 query string： encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...
 */
const customHeaders = () => {
  // const token = member.token
  // const headers = {
  //   'merchantId': config.merchantId,
  //   'content-type': 'application/x-www-form-urlencoded',
  //   'tgs_uuid': member.uuid,
  //   'Cookie': `mi=${member.id};token=${token};tgs_uuid=${member.uuid}`
  // }
  // if (token) {
  //   headers.token = token
  // }
  // return headers
  return {};
}

const request = (method, url, data, headers, dataType) => {
  let cachekey
  const needCache = data && data.__cache_time__ > 0
  if (needCache) {
    cachekey = `${method}_${url}_${util.$toQueryString(data)}`
    const cached = wx.getStorageSync(cachekey)
    // 有缓存 且 缓存时间 + 过期时间 > 当前时间
    if (cached.success && (cached.data.storeTime + data.__cache_time__ * 1000) > Date.now()) {
      cached.data.timestamp = Date.now()
      return Promise.resolve(cached.data.data)
    }
  }

  headers = Object.assign(customHeaders(), headers)
  console.log('http：', method, url, data, headers, dataType)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      dataType: dataType || 'json',
      headers,
      success: (res) => {
        const code = res.data.code
        if (code == null || code === 0) {
          // 将结果缓存起来
          if (needCache) {
            wx.setStorage({
              key: cachekey,
              data: {
                storeTime: Date.now(),
                data: res
              }
            });
          }

          resolve(res.data)
        } else if (code == 401 || code == 888 || code == 889) {
          // 导购端：处理token失效逻辑，code=401代表token失效
          // 用户端：处理token失效888和被踢889逻辑
          // wx.hideLoading();
          // var scene = {
          //     'method': 'GET',
          //     'url': url,
          //     'params': params,
          //     'success': success,
          //     'fail': fail
          // };
          // loginAgain(scene);
          member.logout()
          const pages = getCurrentPages()
          pages[pages.length - 1].redirectTo('/pages/login/login')
        } else if (code === -1) {
          wx.showToast({
            type: 'exception',
            content: res.data.message || '网络连接失败，请重试！',
            duration: 2000
          });
          reject(res)
        } else {
          // 其他业务错误code，在这里处理
        }
      },
      fail: (res) => {
        wx.showToast({
          type: 'exception',
          content: '网络连接失败，请重试！',
          duration: 2000
        });
        reject(res)
      }
    })
  })
}

module.exports = {
  get: (url, data, headers, dataType) => {
    return request('GET', url, data,  headers, dataType)
  },
  post: (url, data, headers, dataType) => {
    return request('POST', url, data, headers, dataType)
  }
}