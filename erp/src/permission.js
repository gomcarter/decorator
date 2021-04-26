/* eslint-disable */

import router from './router'
// import { Message } from 'element-ui'
import { cache } from '@/utils/cache'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { token } from '@/utils/auth' // get token from cookie
import { MENU, getAccessibleMenuMap, setAccessibleMenuList } from '@/utils/menu' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import asyncRouterList from '@/router/asyncRoutes'
import _ from 'lodash'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 需要登录但没有登录，也不是去登录页面
  // if (to.meta.needLogin !== false && !token() && to.path !== '/login') {
    // next({ path: `/login?redirect=${encodeURIComponent(to.path)}` })
    // next()
  // } else if (to.path === '/login') {
  //   next()
  // } else {
    // // 通过登录校验
  // console.log('to path', to)
    const s = getAccessibleMenuMap()
    if (s) {
      if (to.path === '/' && _.keys(s)[0]) {
        next(_.keys(s)[0])
      } else if (s[to.path] || to.path === '/404') {
        next()
      } else {
        next('/404')
      }
    } else {
      try {
        // 拿到 menuIdList [1, 2, 3, 4, 6, 7, 8, 10, 9, 901]
        //const menuIdList = await window.adamService.getUserInfo()
        const accessRoutes = makeRouterFromList(MENU, undefined)
        router.addRoutes(accessRoutes)
        setAccessibleMenuList(accessRoutes)
        next({ ...to, replace: true })
      } catch (err) {
        // console.log(err)
        cache.clear(key)
        next(`/login?redirect=${encodeURIComponent(to.path)}`)
      }
    // }
  }
})

function makeRouterFromList(menuList, idList) {
  return menuList.filter(s => idList ? idList.indexOf(s.id) >= 0 : s).flatMap(item => {
    const rt = asyncRouterList[item.link]
    let r = [];
    if (rt) {
      r.push(
        _.assign(rt, {
          meta: { title: item.name, icon: item.icon }
        })
      )
    }
    if (item.children && item.children.length > 0) {
      const children = item.children.filter(s => idList ? idList.indexOf(s.id) >= 0 : s).flatMap(subItem => {
        const ri = asyncRouterList[subItem.link]
        if (ri) {
          return _.assign(ri, {
            meta: { title: subItem.name, icon: subItem.icon }
          })
        } else {
          return []
        }
      })
      if (r[0]) {
        r[0].children = children
      }
      // r = r.concat(children)
    }
    return r
  })
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
