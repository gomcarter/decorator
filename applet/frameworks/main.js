/**
 * 核心完成各个回调函数统一aop处理，如： onLoad， onShow等操作
 */
import util from '../utils/util';
import api from '../api/init';
import { router } from './router';

// 初始化uuid
let uuid = wx.getStorageSync("uuid")
if (!uuid) {
    uuid = util.$uuid()
    wx.setStorageSync("uuid", uuid);
}

// 初始化sessionId，只有小程序被删除或者本地保存的sessionId被清空，会重新生成sessionId
let sessionId = wx.getStorageSync("sessionId")
if (!sessionId) {
    sessionId = parseInt(((Math.random() * 10000) % 9000) + 1000)
    wx.setStorageSync('sessionId', sessionId);
}

/**
 * 核心完成各个页面涉及到的pv，scp等日志上传
 */
const sendPv = function () {
    const q = util.$toQueryString(this.options)
    const params = {
        uu: uuid,
        sn: sessionId,
        t: Date.now(),
        page: this.scp_ab,
        or: this.route + (q ? ('?' + q) : ''),
        scp: this.options.scp,
        mi: wx.getStorageSync('id')
    };

    // console.log('pv', params)
    // this.logService.tgs(params)
}

const sendScp = function (scp, bk) {
    // TODO: 处理scp，标签上带 data-scp
    if (scp) {
        const params = {
            uu: uuid,
            t: Date.now(),
            scp,
            sn: sessionId,
            storeId: wx.getStorageSync('storeId'),
            mi: wx.getStorageSync('id'),
            bk
        };

        console.log('scp', params)
        // this.logService.scp(params)
    } else {
        console.error('点击位未配置')
    }
}

const beforeLoad = function (options) {
    // 调试用
    wx.that = this

    // 判断本页面是否需要登录
    if (this.needLogin) {
        // TODO: 判断是否登录，如果没有登录则跳往登录页面
        // const id = member.id
        // if (!id) {
        //     this.redirectTo('/pages/login/login')
        // 返回false，那么后面的将不再执行。
        //     return false
        // }
    }
}

const afterLoad = function (options) {
    // console.log('afterLoad', this.route, options)
}

// 默认tap事件拦截器
const onDefaultTap = function (e) {
    console.log('defaultTap', e)
    // 处理scp相关
    let scp = e.target.dataset.scp || e.currentTarget.dataset.scp
    if (scp) {
        // 补全scp
        e.currentTarget.dataset.scp = e.target.dataset.scp = scp = `${this.scp_ab}.${scp}`
        let url = e.target.dataset.url || e.currentTarget.dataset.url
        if (url) {
            // 在url上自动加上scp
            e.currentTarget.dataset.url = e.target.dataset.url = url + (url.indexOf('?') > 0 ? ('&scp=' + scp) : ('?scp=' + scp))
        }
        // 发送scp
        sendScp.call(this, scp, e.target.dataset.bk || e.currentTarget.dataset.bk)
    }

    // 处理跳转页面，标签上带 data-url, 再根据route-type来判断route类型
    let url = e.target.dataset.url || e.currentTarget.dataset.url
    if (url) {
        let routeType = e.target.dataset.routeType || e.currentTarget.dataset.routeType || 'navigateTo'
        if (router[routeType]) {
            // 执行页面跳转
            router[routeType]({ url })
        }
    }
}

const beforeShow = function (options) {
    //  console.log('beforeShow', this.route, options)
}

const afterShow = function (options) {
    // 检查scp_ab是否存在
    if (!this.scp_ab) {
        // 不存在则考虑自动生成scp_ab
        let pageSplits = this.route.split('/').filter(s => s);
        if (pageSplits.length > 2) {
            // 去掉第一个
            pageSplits.splice(0, 1)
        }

        this.scp_ab = `${pageSplits.splice(0, 1).join('')}.${pageSplits.join('')}`
        console.error(this.route, '未配置scp_ab, 自动生成scp：', this.scp_ab)
    }

    // show 之后发送 tgs
    sendPv.call(this)
    //  console.log('afterShow', this.route, options)
}

const cachePage = Page;
Page = function (config) {
    // 处理onLoad
    const onLoad = config.onLoad
    config.onLoad = function (options) {
        if (false === beforeLoad.call(this, options)) {
            console.log('beforeLoad false')
            return
        }

        if (false === (onLoad && onLoad.call(this, options))) {
            return false
        }

        afterLoad.call(this, options)
    }

    // 处理onShow
    const onShow = config.onShow
    config.onShow = function (options) {
        if (false === beforeShow.call(this, options)) {
            console.log('beforeShow false')
            return
        }

        if (false === (onShow && onShow.call(this, options))) {
            return
        }

        afterShow.call(this, options)
    }

    // 拦截所有的回调function
    config.noop = () => {}
    tapAop(config)

    return cachePage(Object.assign({}, api, router, config, util))
}

const cacheComponent = Component;
Component = function (config = {}) {
    if (config && config.methods) {
        config.methods.noop = () => {}
        tapAop(config.methods)
    }
    config.methods = Object.assign({}, config.methods, util)
    config.methods.tapAop = tapAop
    return cacheComponent(config)
}

const tapAop = function (config) {
    Object.keys(config)
        .filter(s => s !== 'onLoad' && s !== 'onShow')
        .filter(s => typeof config[s] === 'function')
        .forEach(s => {
            const cache = config[s]
            config[s] = function () {
                const e = arguments[0]
                if (e && e.type === 'tap' && e.target && !e.__tap__) {
                    // 标记已经被切过一次了，也可以避免手动调用某个函数被切入
                    e.__tap__ = true
                    const that = getCurrentPages()[0]

                    // 100毫秒内的点击事件过滤掉
                    if (that._last_type_time + 100 > Date.now()) {
                        console.log('多次点击事件，忽略')
                        return
                    }
                    that._last_type_time = Date.now()

                    // 默认点击事件处理
                    onDefaultTap.call(that, e)
                }
                return cache.call(this, ...arguments)
            }
        })
    return config
}

// new Date().format()
Date.prototype.format = function (fmt) {
    return Date.format(this, fmt)
}

// Date.format(new Date())
Date.format = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    if (!date) {
        return ''
    }
    // debugger
    // if (typeof date === 'number') {
    //   date = new Date(date);
    // }
    date = new Date(date)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    }
    Object.keys(o)
        .forEach((k) => {
            if (new RegExp(`(${k})`).test(fmt)) {
                const str = `${o[k]}`
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : `00${str}`.substr(str.length))
            }
        })
    return fmt
}