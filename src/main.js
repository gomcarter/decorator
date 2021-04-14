import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

// 导入并绑定api到this下
import api from './api/_init'
Object.assign(Vue.prototype, api)
Object.assign(window, api)

import App from './App'
import router from './router'

// import '@/icons' // icon
import '@/permission' // permission control

// cmui
// import cmui from "cyanmaple";
import 'cyanmaple/src/cyan/cmui.scss'
// import "cyanmaple/src/maple/theme/default.scss";
import styleInit from 'cyanmaple/src/maple/styleInit'
styleInit()

function _initAutoComponent() {
  // 导入自动组件，分成全局组件和异步组件
  // const globalContext = require.context('./autoComponent', true, /\.vue$/)
  // globalContext.keys().forEach(key => {
  //   const name = _.camelCase(/\.\/(\w+)\/index.vue/.exec(key)[1])
  //   const component = globalContext(key).default
  //   console.log(name, component)
  //   Vue.component('gc-' + name, component)
  // })
  const asyncContext = require.context('./autoComponent', true, /index\.vue$/, 'lazy')
  asyncContext.keys().forEach(key => {
    // console.log('ac-' + key)
    if (key.indexOf('/index.vue') > 0) {
      const name = key.replace(/\.\//g, '').replace('/index.vue', '')
      const component = asyncContext(key)
      // console.log('ac-' + name)
      Vue.component('ac-' + name, () => component)
    }
    // if (/\.\/(\w+\-.*)\/index.vue/.test(key)) {
    //   const name = /\.\/(\w+)\/index.vue/.exec(key)[1]
    //   const component = asyncContext(key)
    //
    //   console.log('ac-' + name)
    //   Vue.component('ac-' + name, () => component)
    // }
  })
}
_initAutoComponent()
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

import utils from './utils/utils'
Object.assign(Vue.prototype, utils)
Object.assign(window, utils)

import mapping from '@/utils/mapping'
Object.assign(Vue.prototype, mapping)

import vueSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(vueSwiper)

export const that = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
