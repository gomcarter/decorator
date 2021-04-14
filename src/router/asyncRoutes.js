import _ from 'lodash'

const asyncContext = require.context('../views', true, /\.vue$/)
const asyncRouterList = asyncContext.keys().reduce((rs, key) => {
  const path = key.slice(2, -4)
  // console.log(path)

  const pathArr = path.split('/')
  if (path.endsWith('/index')) {
    pathArr.splice(pathArr.length - 1, 1)
  }
  const htmlTag = pathArr.join('/')
  rs[htmlTag] = {
    path: '/' + htmlTag,
    name: _.upperFirst(_.last(pathArr)),
    component: asyncContext(key).default
    // component: () => import('../views/' + pathArr.join('/') + '.vue')
  }
  return rs
}, {})

// console.log('asyncRouterList', asyncRouterList)

export default asyncRouterList
