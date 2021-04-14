export default {
  beans: {
    name: '豆豆',
    default() {
      const config = this.config()
      const data = this.dataConfig().default
      const key = 'beans'
      return { key, data, config }
    },
    config: () => {
      return {
        scrollable: {
          title: '显示方式',
          type: 'radio',
          values: [{
            label: '单行',
            value: true
          }, {
            label: '多行',
            value: false
          }],
          default: false
        },
        scrollLine: {
          title: '滚动条',
          type: 'radio',
          values: [{
            label: '有',
            value: true
          }, {
            label: '无',
            value: false
          }],
          default: false
        },
        background: {
          title: '背景色',
          type: 'color',
          default: 'white'
        },
        radius: {
          title: '边框样式',
          type: 'radio',
          values: [{
            label: '正方形',
            value: 0
          }, {
            label: '圆角',
            value: 6
          }],
          default: 0
        },
        width: {
          title: '图标大小',
          type: 'slider',
          values: [0, 100],
          default: 25
        },
        iconRadius: {
          title: '图标形状',
          type: 'radio',
          values: [{
            label: '正方形',
            value: 0
          }, {
            label: '圆角',
            value: '6px'
          }, {
            label: '圆形',
            value: '50%'
          }],
          default: 0
        },
        top: {
          title: '上边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        bottom: {
          title: '下边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        left: {
          title: '左边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        right: {
          title: '右边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        dynamicdata: {
          title: '动态数据',
          type: 'checkbox',
          default: false
        }
      }
    },
    dataConfig: () => {
      return {
        default: [],
        // 图片，文字，链接
        plugins: 'news'
      }
    }
  },
  swiper: {
    name: '轮播',
    default() {
      const config = this.config()
      const data = this.dataConfig().default
      const key = 'swiper'
      return { key, data, config }
    },
    config: () => {
      return {
        scrollable: {
          title: '显示方式',
          type: 'radio',
          values: [{
            label: '单行',
            value: true
          }, {
            label: '多行',
            value: false
          }],
          default: false
        },
        background: {
          title: '背景色',
          type: 'color',
          default: 'white'
        },
        radius: {
          title: '边框样式',
          type: 'radio',
          values: [{
            label: '正方形',
            value: '0'
          }, {
            label: '圆角',
            value: '8px'
          }],
          default: '0'
        },
        width: {
          title: '图标大小',
          type: 'slider',
          values: [0, 100],
          default: 25
        },
        iconRadius: {
          title: '图标形状',
          type: 'radio',
          values: [{
            label: '正方形',
            value: '0'
          }, {
            label: '圆角',
            value: '8px'
          }, {
            label: '圆形',
            value: '50%'
          }],
          default: '0'
        },
        top: {
          title: '上边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        bottom: {
          title: '下边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        left: {
          title: '左边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        right: {
          title: '右边距',
          type: 'slider',
          values: [0, 50],
          default: 0
        },
        dynamicdata: {
          title: '动态数据',
          type: 'checkbox',
          default: false
        }
      }
    },
    dataConfig: () => {
      return {
        default: [],
        // 图片，文字，链接
        plugins: 'news'
      }
    }
  }
}
