export default {
  beans: {
    name: '豆豆',
    default() {
      const config = this.config()
      const data = []
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
          default: '#ffffff'
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
          values: [0, 100],
          default: 0
        },
        bottom: {
          title: '下边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        left: {
          title: '左边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        right: {
          title: '右边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        dynamicdata: {
          title: '动态数据',
          type: 'checkbox',
          default: false
        }
      }
    },
    plugins: 'news'
  },
  swiper: {
    name: '轮播',
    default() {
      const config = this.config()
      const data = []
      const key = 'swiper'
      return { key, data, config }
    },
    config: () => {
      return {
        // direction: {
        //   title: '滚动方向',
        //   type: 'radio',
        //   values: [{
        //     label: '水平',
        //     value: false
        //   }, {
        //     label: '垂直',
        //     value: true
        //   }],
        //   default: false
        // },
        // background: {
        //   title: '背景色',
        //   type: 'color',
        //   default: '#ffffff'
        // },
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
        pagination: {
          title: '分页器',
          type: 'radio',
          values: [{
            label: '显示',
            value: true
          }, {
            label: '不显示',
            value: false
          }],
          default: true
        },
        autoplay: {
          title: '自动播放',
          type: 'radio',
          values: [{
            label: '是',
            value: true
          }, {
            label: '否',
            value: false
          }],
          default: true
        },
        delay: {
          rely: 'autoplay',
          title: '切换间隔',
          type: 'slider',
          step: 100,
          values: [1, 10000],
          default: 2000
        },
        top: {
          title: '上边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        bottom: {
          title: '下边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        left: {
          title: '左边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        right: {
          title: '右边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        dynamicdata: {
          title: '动态数据',
          type: 'checkbox',
          default: false
        }
      }
    },
    plugins: 'news'
  },
  images: {
    name: '图片',
    default() {
      const config = this.config()
      const data = []
      const key = 'images'
      return { key, data, config }
    },
    config: () => {
      return {
        top: {
          title: '上边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        bottom: {
          title: '下边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        left: {
          title: '左边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        right: {
          title: '右边距',
          type: 'slider',
          values: [0, 100],
          default: 0
        },
        dynamicdata: {
          title: '动态数据',
          type: 'checkbox',
          default: false
        }
      }
    },
    plugins: 'news'
  },
  text: {
    name: '文字',
    default() {
      const config = this.config()
      const data = []
      const key = 'text'
      return { key, data, config }
    },
    config: () => {
      return {
        background: {
          title: '背景色',
          type: 'color',
          default: '#ffffff'
        },
        color: {
          title: '字体颜色',
          type: 'color',
          default: '#000000'
        },
        align: {
          title: '排列',
          type: 'radio',
          values: [{
            label: '靠左',
            value: 'left'
          }, {
            label: '居中',
            value: 'center'
          }, {
            label: '靠右',
            value: 'right'
          }],
          default: 'left'
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
        top: {
          title: '上边距',
          type: 'slider',
          values: [0, 375],
          default: 0
        },
        bottom: {
          title: '下边距',
          type: 'slider',
          values: [0, 375],
          default: 0
        },
        left: {
          title: '左边距',
          type: 'slider',
          values: [0, 375],
          default: 0
        },
        right: {
          title: '右边距',
          type: 'slider',
          values: [0, 375],
          default: 0
        }
      }
    },
    plugins: 'textarea'
  }
}
