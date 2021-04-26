const fsm = wx.getFileSystemManager();
const templates = {}
const files = fsm.readdirSync('components/templates')
files.forEach(folder => {
  if (folder !== 'service') {
    templates[folder] = require('templates/' + folder + "/" + folder + ".js");
  }
})
console.log('entry files', files, templates)
// console.log('service files', fsm.readdirSync('components/templates/service'))
// const cachePage = Page;
// Page = function (config) {
//   return cachePage(Object.assign({}, services, config))
// }
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is: String,
    options: Object
  },

  /**
   * 组件的初始数据
   */
  data: {},
  observers: {
    'options.data'(data) {
      this.dataChanged && this.dataChanged(data)
    },
    'options.config'(config) {
      this.configChanged && this.configChanged(config)
    }
  },
  created() {
    // do nothing
  },
  // 组件挂载之前执行
  attached() {
    // 把所有方法挂载上来
    Object.entries(templates[this.data.is])
      .forEach(s => {
        const name = s[0]
        if (!this[name]) {
          // 做一个切面
          this[name] = this.tapAop({ func: s[1] }).func
        } else {
          console.error(this.data.is + '方法名：' + s[0] + '和系统自带方法冲突，请修改')
        }
      })

    const attached = templates[this.data.is].attached;
    try {
      typeof attached === 'function' && attached.call(this)
    } catch(e) {
      console.log('attached error', e)
    }
  },
  // 组件挂载后执行
  ready() {
    const ready = templates[this.data.is].ready;
    typeof ready === 'function' && ready.call(this)
  },
  // 组件移除执行
  detached() {
    const detached = templates[this.data.is].detached;
    typeof detached === 'function' && detached.call(this)
  },
  // 组件移动的时候执行
  moved() {
    const moved = templates[this.data.is].moved;
    typeof moved === 'function' && moved.call(this)
  },
  /**
   * 组件的方法列表
   */
  methods: {}
})