import util from '../utils/util';

const handleUrl = function(url) {
  // 在前面补 / 
  let cache = (url.indexOf('/') === 0 ? '' : '/') + url
  
  const scp = this._right_now_scp
  if (scp && cache.indexOf('scp=') === -1) {
    // 如果当前存在scp，且url上没有scp，则拼接上
    cache = cache.indexOf('?') != -1 ? ('&scp=' + scp) : ('?scp=' + scp)
  }
  
  // 特殊处理，如果去的是登录页面，则将本页面的url和参数带过去。方便等下回来的时候带回来
  if (cache.indexOf('/pages/login/login') === 0) {
    // 跳到登录页 encodeURIComponent
    const q = util.$toQueryString(this.options)
    const redirect = 'redirect=' + encodeURIComponent(this.route + (q ? ('?' + q) : ''))
    cache = cache + (cache.indexOf('?') != -1 ? ('&' + redirect) : ('?' + redirect))
  }

  return cache
}

const to = function(method, { url, events, success, fail, complete }) {
  // 如果要去的页面是上一个页面，返回就行了
  const pages = getCurrentPages()
  const that = pages[0]
  const prevPage = pages[pages.length - 2]
  if (prevPage && url.indexOf(prevPage.route) >= 0) {
    // 把本次要去的参数带过去
    prevPage.options = util.$fromQueryString(url) || {}
    // 返回到上一页
    setTimeout(() => { wx.navigateBack({delta: 1}) })
  } else {
    url = handleUrl.call(that, url)
    wx[method]({url, events, success, fail, complete})
  }
  console.log(method, prevPage && prevPage.route, '  ==>  ', url)
}

export const router = {
  navigateTo({ url, events, success, fail, complete }) {
    return to('navigateTo', { url, events, success, fail, complete })
  },

  // 页面redirect，如果去登录页就把自身替换掉，避免出现在登录页返回的时候总是不断的往返
  redirectTo({url, success, fail, complete}) {
    return to('redirectTo', { url, events, success, fail, complete })
  },

  reLaunch({url, success, fail, complete}) {
    return wx.reLaunch({url, success, fail, complete})
  },

  switchTab({url, success, fail, complete}) {
    return wx.switchTab({url, success, fail, complete})
  },

  navigateBack({delta, success, fail, complete}) {
    return wx.navigateBack({delta, success, fail, complete})
  }
}