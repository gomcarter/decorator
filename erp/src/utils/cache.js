/* eslint-disable */
// 数据存储
export const store = {
  set(key, data, expire) {
    try {
      if (expire) {
        expire = new Date().getTime() + expire * 1000
      }
      window.localStorage.setItem(key, JSON.stringify(
        {
          expire,
          data,
        },
      ));
      return true;
    } catch (e) {
      return false;
    }
  },
  get(key) {
    try {
      const dataString = window.localStorage.getItem(key)

      const cached = JSON.parse(dataString);
      if (cached == null || cached.expire < new Date().getTime()) {
        window.localStorage.removeItem(key);
        return null;
      }
      return cached.data;
    } catch (e) {
      return null;
    }
  },
  clear(key) {
    try {
      window.localStorage.removeItem(key)
      return true;
    } catch (e) {
      return false;
    }
  }
}

// 数据缓存
export const cache = {
  data: {},
  set(key, data, bol = false, expire) {
    if (expire) {
      expire = new Date().getTime() + expire * 1000
    }
    const _data = {
      expire,
      data,
    };

    if (!bol) {
      window.sessionStorage.setItem(key, JSON.stringify(_data));
    } else {
      this.data[key] = _data
    }
  },
  get(key, bol = false) {
    if (!bol) {
      const dataString = window.sessionStorage.getItem(key)

      const cached = JSON.parse(dataString);
      if (cached == null || cached.expire < new Date().getTime()) {
        window.localStorage.removeItem(key);
        return null;
      }
      return cached.data;
    } else {
      const _data = this.data[key]
      if (_data == null || _data.expire < new Date().getTime()) {
        this.data[key] = undefined
        return null
      }
      return _data.data
    }
  },
  clear(key, bol = false) {
    if (bol) {
      sessionStorage.removeItem(key)
    } else {
      delete this.data[key]
    }
  }
}
