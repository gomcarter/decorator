const tgs_uuid = () => {
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

class Member {
  setKey(key, data) {
    if (data != null) {
      wx.setStorageSync(key, data)
    } else {
      wx.removeStorageSync(key)
    }
  }

  login(login) {
    console.log(login)
    member.id = login.data.id
    member.cellphone = login.data.cellPhone
    member.nickname = login.data.nickName
    member.protraitUrl = login.data.photoUrl
    member.tokenTime = login.timestamp
    member.token = login.data.token
    member.alias = login.data.alias
  }

  logout() {
    member.id = null
    member.cellphone = null
    member.alias = null
    member.nickname = null
    member.protraitUrl = null
    // token的当前时间
    member.tokenTime = null
    member.token = null
  }

  get id() {
    return wx.getStorageSync('id')
  }
  set id(value) {
    this.setKey('id', value)
  }

  get nickname() {
    return wx.getStorageSync('nickname')
  }
  set nickname(value) {
    this.setKey('nickname', value)
  }

  get cellphone() {
    return wx.getStorageSync('cellphone')
  }
  set cellphone(value) {
    this.setKey('cellphone', value)
  }

  get alias() {
    return wx.getStorageSync('alias')
  }
  set alias(value) {
    this.setKey('alias', value)
  }

  get uuid() {
    let id = wx.getStorageSync('tgs_uuid')
    if (!id) {
      id = this.uuid = tgs_uuid()
    }
    return id
  }
  set uuid(value) {
    this.setKey('tgs_uuid', value)
  }

  get protraitUrl() {
    return wx.getStorageSync('protraitUrl') || 'https://image1.51tiangou.com/tgou2/img2/mine/defaultPhoto.png'
  }
  set protraitUrl(value) {
    this.setKey('protraitUrl', value)
  }

  get token() {
    const token = wx.getStorageSync('token')

    // token的时间 + 6天 < 当前时间，表示token过期
    if (this.tokenTime + 518400000 < Date.now()) {
      console.log('token expired')
      // 清除token还有id
      this.setKey('token', null)
      this.setKey('id', null)
      return null
    }
    return token
  }
  set token(value) {
    this.setKey('token', value)
  }

  get tokenTime() {
    return wx.getStorageSync('tokenTime')
  }
  set tokenTime(value) {
    this.setKey('tokenTime', value)
  }
}

export const member = new Member()