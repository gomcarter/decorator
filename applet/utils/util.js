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
const $uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid
}
const $htmlEncode = (str) => {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/\'/g, "&#39;");
  s = s.replace(/\"/g, "&quot;");
  s = s.replace(/\n/g, "<br/>");
  return s;
}
const $htmlDecode = (str) => {
  var s = "";
  if (str.length == 0) return "";
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&#39;/g, "\'");
  s = s.replace(/&quot;/g, "\"");
  s = s.replace(/<br\/>/g, "\n");
  return s;
}

/**
 * 示例：
 * {a:1,b:[1,2,3]}  => a=1&b=1&b=2&b=3
 * {a:{b:1,c:[1,2]}} => a.b=1&a.c=1&a.c=2
 * {a:{b:1,c:[{d:1},{d:2},{e:3}]}} => a.b=1&a.c.d=1&a.c.d=2&a.c.e=3
 * {a:{b:{d:{e:[{f:{g:1}},{f:{g:2}}]}},c:[1,2]}} => a.b.d.e.f.g=1&a.b.d.e.f.g=2&a.c=1&a.c=2
 * toQueryString([1,2,3,4], 'c') => c=1&c=2&c=3&c=4
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
            key = `${prefix}.${key}`
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
      return `${prefix}=${encodeURIComponent(data)}`
      // 其他类型忽略
    default:
      return ''
  }
  return queryString.join('&')
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

const $imageUrl = (url, mode = '!y') => {
  return 'https://test.img.tg-img.com/' + url + mode
}

const $width = wx.getSystemInfoSync().windowWidth
console.log(111111, $width)
const $height = wx.getSystemInfoSync().windowHeight
const $rate = 750 / $width

const $px2rpx = (px) => {
  return px * $rate
}

const $rpx2px = (rpx) => {
  return rpx / $rate
}

module.exports = {
  $uuid,
  $htmlDecode,
  $htmlEncode,
  $type,
  $fromQueryString,
  $toQueryString,
  $imageUrl,
  $width() {
    return $width
  },
  $height() {
    return $height
  },
  $px2rpx,
  $rpx2px
}