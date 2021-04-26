/* eslint-disable */
import { Notification } from 'element-ui'

/**
 * @param data
 * @returns {array|object|null|undefined|function|error|regexp|number|string|boolean}
 */
const $type = (data) => {
  const t = typeof data

  switch (typeof data) {
    case 'object':
      if (data === null) {
        return 'null'
      } else if (data instanceof Array) {
        return 'array'
      } else if (data instanceof RegExp) {
        return 'regexp'
      } else if (data instanceof Error) {
        return 'error'
      }
      return t
    default:
      return t
  }
}

/**
 * 示例：
 * {a:1,b:[1,2,3]}  => a=1&b=1&b=2&b=3
 * {a:{b:1,c:[1,2]}} => a.b=1&a.c=1&a.c=2
 * {a:{b:1,c:[{d:1},{d:2},{e:3}]}} => a.b=1&a.c.d=1&a.c.d=2&a.c.e=3
 * {a:{b:{d:{e:[{f:{g:1}},{f:{g:2}}]}},c:[1,2]}} => a.b.d.e.f.g=1&a.b.d.e.f.g=2&a.c=1&a.c=2
 * $toQueryString([1,2,3,4], 'c') => c=1&c=2&c=3&c=4
 *
 * 将忽略值是null|undefined|function|error|regexp类型的数据
 * @param data
 * @param prefix 参数名前缀
 * @returns {*}
 */
const $toQueryString = (data, prefix) => {
  prefix = prefix || ''
  const queryString = []
  switch ($type(data)) {
    // []类型
    case 'array':
      if (prefix === '') {
        return ''
      }
      data.forEach((s) => {
        const d = $toQueryString(s, prefix)
        if (d !== null && d !== undefined) {
          queryString.push(d)
        }
      })
      break
    // {}类型
    case 'object':
      Object.entries(data)
        .forEach((s) => {
          let key = s[0]
          const value = s[1]
          if (prefix !== '') {
            key = `${ prefix }.${ key }`
          }
          const d = $toQueryString(value, key)
          if (d !== null && d !== undefined) {
            queryString.push(d)
          }
        })
      break
    case 'string':
    case 'boolean':
    case 'number':
      if (prefix === '') {
        return ''
      }
      return `${ prefix }=${ encodeURIComponent(data) }`
    // 其他类型忽略
    default:
      return ''
  }
  return queryString.join('&')
}

/**
 * 删除对象-属性值是null|undefined|function|error|regexp类型的数据
 * 只删除第一层数据，不递归删除；
 *
 * @param params {array|object|string}
 * @returns {Array|Object|String} 返回一个新的和params类型一致的数据
 */
const $removeIllegalParams = (params) => {
  return $removeFromType(params, ['null', 'undefined', 'function', 'error', 'regexp'])
}

/**
 * 删除对象-属性值是 指定 toRemoveType 的数据
 * @param params {array|object|string}
 * @param toRemoveType {null|undefined|function|error|regexp}
 * @returns {Array|Object|String} 返回一个新的和params类型一致的数据
 */
const $removeFromType = (params, toRemoveType) => {
  const t = $type(params)
  if (t === 'object') {
    const localParams = {}
    Object.keys(params || ({})).forEach((v) => {
      if (toRemoveType.indexOf($type(params[v])) === -1) {
        localParams[v] = params[v]
      }
    })
    return localParams
  } else if (t === 'array') {
    return params.filter(s => toRemoveType.indexOf($type(s)) === -1)
  }
  return params
}

/**
 * 移除params里面的 空，null，undefined的数据
 * @param params
 * @param toRemoveType
 * @returns {*}
 */
const $removeBlank = (params) => {
  const toRemoveType = ['null', 'undefined', 'function', 'error', 'regexp']
  const t = $type(params)
  if (t === 'object') {
    const localParams = {}
    Object.keys(params || ({})).forEach((v) => {
      if (toRemoveType.indexOf($type(params[v])) === -1 && `${ params[v] }`.trim() !== '') {
        localParams[v] = params[v]
      }
    })
    return localParams
  } else if (t === 'array') {
    return params.filter(s => toRemoveType.indexOf($type(s)) === -1 && `${ s }`.trim() !== '')
  }
  return params
}

const padLeftZero = str => `00${ str }`.substr(str.length)

/**
 * 将时间格式化为字符串。
 * @param date ： 可以是Date对象也可以是timestamp
 * @param fmt ： 格式化之后的样式，默认： yyyy-MM-dd HH:mm:ss
 * @returns {string}
 */
const formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (!date) {
    return ''
  }
  // debugger
  // if (typeof date === 'number') {
  //   date = new Date(date);
  // }
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${ date.getFullYear() }`).substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  Object.keys(o)
    .forEach((k) => {
      if (new RegExp(`(${ k })`).test(fmt)) {
        const str = `${ o[k] }`
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    })
  return fmt
}

Date.prototype.format = function(fmt = 'yyyy-MM-dd hh:mm:ss') {
  return formatDate(this, fmt)
}

Date.format = function(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  return formatDate(date, fmt)
}

Date.prototype.formatDay = function() {
  return formatDate(this, 'yyyy-MM-dd')
}

Date.formatDay = function(date) {
  return formatDate(date, 'yyyy-MM-dd')
}

const $success = (message) => {
  Notification({
    type: 'success',
    position: 'bottom-right',
    message: message || '操作成功！',
    duration: 3000,
    title: '提示'
  })
}

/**
 * 下载文件
 * @param
  content: 指定下载地址
 filename: 指定下载文件名
 */
const $download = (content, filename) => {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
  eleLink.$download = filename
  eleLink.style.display = 'none'
  eleLink.href = content
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

/**
 * 全屏
 */
const $fullScreen = (el) => {
  const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
  if (typeof rfs != 'undefined' && rfs) {
    rfs.call(el)
  }

  return
}

/**
 * 退出全屏
 */
const $exitScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
  if (typeof cfs != 'undefined' && cfs) {
    cfs.call(el)
  }
}

/**
 * 对象深刻隆
 * @param opts ：{}
 */
const clone = opts => JSON.parse(JSON.stringify(opts || {}))

/**
 * 自动补全位数
 * @param num 数字
 * @param length 位数
 */
const prefixInteger = (num, length = 2) => (Array(length).join('0') + num).slice(-length)

/**
 * 获取数组长度
 * @param array
 */
const getArrLen = (o) => (o || []).length

/**
 * 移动端上下左右执行事件
 * 列子： touch({
      left2right: this.preIndex,
      right2left: this.nextIndex
    })
 */
const touch = (fns = {
  left2right: () => {
  }, right2left: () => {
  }, top2bottom: () => {
  }, bottom2top: () => {
  }
}) => {
  let startX
  let startY
  let endX
  let endY
  let X
  let Y
  let flag = true

  const runFn = (fnnm) => {
    if (flag) {
      flag = false
      fns[fnnm] && fns[fnnm]()
    }
  }

  document.body.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].pageX
    startY = e.changedTouches[0].pageY
  }, false)

  document.body.addEventListener('touchmove', (e) => {
    cancelable(e)
    endX = e.changedTouches[0].pageX
    endY = e.changedTouches[0].pageY
    X = endX - startX
    Y = endY - startY
    if (Math.abs(X) > Math.abs(Y) && X > 0 && Math.abs(X) > 70) {
      // 左到右
      runFn('left2right')
    } else if (Math.abs(X) > Math.abs(Y) && X < 0 && Math.abs(X) > 70) {
      // 右到左
      runFn('right2left')
    } else if (Math.abs(Y) > Math.abs(X) && Y > 0 && Math.abs(Y) > 70) {
      // 上到下
      runFn('top2bottom')
    } else if (Math.abs(Y) > Math.abs(X) && Y < 0 && Math.abs(Y) > 70) {
      // 下到上
      runFn('bottom2top')
    }
  }, false)

  document.body.addEventListener('touchend', (e) => {
    flag = true
  }, false)
}

const cancelable = (e) => {
  // 判断默认行为是否可以被禁用
  if (e.cancelable) {
    // 判断默认行为是否已经被禁用
    if (!e.defaultPrevented) {
      e.preventDefault()
    }
  }
}

const $getPictureUrl = (url, params = {}) => {
  // 待实现
  return 'https://test.img.tg-img.com/' + url
}

const $fromQueryString = (queryString) => {
  const searchsplits = queryString.split('?')
  const search = searchsplits.length > 1 ? searchsplits[1] : searchsplits[0]
  const r = {}
  if (!search || search.length < 3) {
    return r
  }
  search.slice(0, search.length).split('&').forEach(k => {
    const p = k.split('=')
    const key = p[0]
    const value = p[1]
    if (value) {
      if (r[key] != null) {
        r[key] = [value].concat(r[key])
      } else {
        r[key] = value
      }
    }
  })
  return r
}

const $getUrlHashParams = () => {
  const searchsplits = window.location.hash.split('?')
  const search = searchsplits.length > 1 ? searchsplits[1] : ''
  const r = {}
  if (!search || search.length < 3) {
    return r
  }
  search.slice(0, search.length).split('&').forEach(k => {
    const p = k.split('=')
    const key = p[0]
    const value = p[1]
    if (value) {
      if (r[key] != null) {
        r[key] = [value].concat(r[key])
      } else {
        r[key] = value
      }
    }
  })
  return r
}

const $sleep = (millisecond) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

const $birthday2AgeMonth = (birthday) => {
  if (!birthday) {
    return {
      age: '', month: ''
    }
  }
  const b = new Date(birthday)
  const now = new Date()
  // 2021 - 2000 => 21岁
  let age = now.getFullYear() - b.getFullYear()
  // 2000-06-01
  // 4 - 6 = -2 => 差俩月过生日 => 12 - 2 = 10 => 20岁10个月
  // 2000-02-01
  // 4 - 2 = 2 => 已经过了生日俩月了 => 21岁2个月
  let month = now.getMonth() - b.getMonth()
  if (month < 0) {
    month = 12 + month
    age = age - 1
  }
  return {
    age, month
  }
}

const $ageMonth2Birthday = (age, month) => {
  const now = new Date()
  // 2021 - 2000 => 21 岁
  let year = now.getFullYear() - (age || 0)
  // 21岁6个月 => 1999年10月出生
  // 假设当前是4月 - 6月 = -2 月 => 上次生日是在去年10月 => 1999年10月出生
  // 21岁3个月 => 2000年1月出生
  // 假设当前是4月 - 3月 =  1 月 => 上次生日是在上个月 => 2000年1月出生
  let m = (now.getMonth() + 1) - (month || 1)
  if (m < 0) {
    m = 12 + m
    year = year - 1
  }

  if (m < 10) {
    m = '0' + m
  }

  return year + '-' + m + '-01'
}


const toChinese = (number) => {
  const ary0 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
    ary1 = ['', '十', '百', '千'],
    ary2 = ['', '万', '亿', '兆']
  const array = []
  for (let i = number.length; i >= 0; i--) {
    array.push(number[i])
  }
  const ary = array.join('')
  let zero = ''
  let newary = ''
  let i4 = -1
  for (let i = 0; i < ary.length; i++) {
    //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
    if (i % 4 === 0) {
      i4++
      //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
      newary = ary2[i4] + newary
      //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空
      zero = ''

    }
    //关于0的处理与判断。
    //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
    if (ary[i] === '0') {
      switch (i % 4) {
        case 0:
          break
        //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
        case 1:
        case 2:
        case 3:
          if (ary[i - 1] !== '0') {
            zero = '零'
          }
          //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
          break
      }
      newary = zero + newary
      zero = ''
    } else {
      //如果不是“0”
      //就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
      newary = ary0[parseInt(ary[i])] + ary1[i % 4] + newary
    }

  }
  if (newary.indexOf('零') === 0) {
    newary = newary.substr(1)
  }//处理前面的0
  return newary
}

Number.prototype.toChinese = function() {
  return toChinese(this + '')
}

Number.toChinese = function(number) {
  return toChinese(number + '')
}

Number.fenToYuan = function(number) {
  return (parseFloat(number + '') / 100 || 0).toFixed(2)
}

export default {
  $getUrlHashParams,
  $sleep,
  $type,
  $fromQueryString,
  $toQueryString,
  $getPictureUrl,
  $fullScreen,
  $exitScreen,
  $download,
  $success,
  $removeBlank,
  $removeFromType,
  $removeIllegalParams,
  $birthday2AgeMonth,
  $ageMonth2Birthday,
  $delete(obj, ...keys) {
    keys.forEach((v, i) => {
      delete obj[v]
    })
  },
  $size(obj) {
    return Object.entries(obj).length
  }
}
