// pages/login/login.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    components: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.xx = this
    // console.log(this.data.cc)
    this.setData({
      components: [{
        "key": "beans",
        "data": [{
          "imageUrl": "seller/202104/14/A6388F43-B4B1-4AEB-A3B2-F6C50B6025A1.png",
          "title": "直播",
          "clickUrl": "pages/login/login"
        }, {
          "imageUrl": "seller/202104/14/3DDD7DAD-C7BD-46CC-9302-877F7EF13FD2.png",
          "title": "专柜"
        }, {
          "imageUrl": "seller/202104/14/76BB6BC7-E29E-499E-A1CD-99B070299C94.png",
          "title": "优惠"
        }, {
          "imageUrl": "seller/202104/14/DE183528-6BD1-4A1C-9D06-3B0753EB4FF6.png",
          "title": "结算码"
        }, {
          "imageUrl": "seller/202104/14/0BC2F944-5EF0-4A7D-A54D-30CDB598C565.png",
          "title": "权益"
        }],
        "config": {
          "scrollable": {
            "title": "显示方式",
            "type": "radio",
            "values": [{
              "label": "单行",
              "value": true
            }, {
              "label": "多行",
              "value": false
            }],
            "default": true
          },
          "scrollLine": {
            "title": "滚动条",
            "type": "radio",
            "values": [{
              "label": "有",
              "value": true
            }, {
              "label": "无",
              "value": false
            }],
            "default": true
          },
          "background": {
            "title": "背景色",
            "type": "color",
            "default": "white"
          },
          "radius": {
            "title": "边框样式",
            "type": "radio",
            "values": [{
              "label": "正方形",
              "value": "0"
            }, {
              "label": "圆角",
              "value": "8"
            }],
            "default": "8"
          },
          "width": {
            "title": "图标大小",
            "type": "slider",
            "values": [0, 100],
            "default": 25
          },
          "iconRadius": {
            "title": "图标形状",
            "type": "radio",
            "values": [{
              "label": "正方形",
              "value": "0"
            }, {
              "label": "圆角",
              "value": "8px"
            }, {
              "label": "圆形",
              "value": "50%"
            }],
            "default": "8px"
          },
          "top": {
            "title": "上边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "bottom": {
            "title": "下边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "left": {
            "title": "左边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "right": {
            "title": "右边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "dynamicdata": {
            "title": "动态数据",
            "type": "checkbox",
            "default": false
          }
        }
      }, {
        "key": "swiper",
        "data": [{
          "imageUrl": "seller/202104/15/1494C24E-15DC-4156-AA59-B56B180571C7.jpg",
          "title": "111",
          "clickUrl": "11111"
        }, {
          "imageUrl": "seller/202104/15/544FC88C-D8FB-4B53-AA28-3B73834ADB2C.jpg",
          "title": "222",
          "clickUrl": "22222"
        }, {
          "imageUrl": "seller/202104/15/63BA3EF0-0D91-40ED-AC12-31BABA675266.jpg",
          "title": "333",
          "clickUrl": "33333"
        }, {
          "imageUrl": "seller/202104/15/CD2D831C-F836-4F02-ADC5-7999D6233B20.jpg",
          "title": "444",
          "clickUrl": "444444"
        }, {
          "imageUrl": "seller/202104/15/E5F8481E-4AFA-4EA3-AE59-2CFD9D9C1F81.jpg",
          "title": "555",
          "clickUrl": "55555"
        }],
        "config": {
          "radius": {
            "title": "边框样式",
            "type": "radio",
            "values": [{
              "label": "正方形",
              "value": "0"
            }, {
              "label": "圆角",
              "value": "8"
            }],
            "default": "8"
          },
          "pagination": {
            "title": "分页器",
            "type": "radio",
            "values": [{
              "label": "显示",
              "value": true
            }, {
              "label": "不显示",
              "value": false
            }],
            "default": true
          },
          "autoplay": {
            "title": "自动播放",
            "type": "radio",
            "values": [{
              "label": "是",
              "value": true
            }, {
              "label": "否",
              "value": false
            }],
            "default": true
          },
          "delay": {
            "rely": "autoplay",
            "title": "切换间隔",
            "type": "slider",
            "step": 100,
            "values": [1, 10000],
            "default": 2401
          },
          "top": {
            "title": "上边距",
            "type": "slider",
            "values": [0, 100],
            "default": 7
          },
          "bottom": {
            "title": "下边距",
            "type": "slider",
            "values": [0, 100],
            "default": 7
          },
          "left": {
            "title": "左边距",
            "type": "slider",
            "values": [0, 100],
            "default": 7
          },
          "right": {
            "title": "右边距",
            "type": "slider",
            "values": [0, 100],
            "default": 7
          },
          "dynamicdata": {
            "title": "动态数据",
            "type": "checkbox",
            "default": false
          }
        }
      }, {
        "key": "beans",
        "data": [{
          "imageUrl": "seller/202104/14/A6388F43-B4B1-4AEB-A3B2-F6C50B6025A1.png",
          "title": "直播",
          "clickUrl": "pages/login/login"
        }, {
          "imageUrl": "seller/202104/14/3DDD7DAD-C7BD-46CC-9302-877F7EF13FD2.png",
          "title": "专柜"
        }, {
          "imageUrl": "seller/202104/14/76BB6BC7-E29E-499E-A1CD-99B070299C94.png",
          "title": "优惠"
        }, {
          "imageUrl": "seller/202104/14/DE183528-6BD1-4A1C-9D06-3B0753EB4FF6.png",
          "title": "结算码"
        }, {
          "imageUrl": "seller/202104/14/0BC2F944-5EF0-4A7D-A54D-30CDB598C565.png",
          "title": "权益"
        }],
        "config": {
          "scrollable": {
            "title": "显示方式",
            "type": "radio",
            "values": [{
              "label": "单行",
              "value": true
            }, {
              "label": "多行",
              "value": false
            }],
            "default": true
          },
          "scrollLine": {
            "title": "滚动条",
            "type": "radio",
            "values": [{
              "label": "有",
              "value": true
            }, {
              "label": "无",
              "value": false
            }],
            "default": false
          },
          "background": {
            "title": "背景色",
            "type": "color",
            "default": "white"
          },
          "radius": {
            "title": "边框样式",
            "type": "radio",
            "values": [{
              "label": "正方形",
              "value": "0"
            }, {
              "label": "圆角",
              "value": "8"
            }],
            "default": "8"
          },
          "width": {
            "title": "图标大小",
            "type": "slider",
            "values": [0, 100],
            "default": 25
          },
          "iconRadius": {
            "title": "图标形状",
            "type": "radio",
            "values": [{
              "label": "正方形",
              "value": "0"
            }, {
              "label": "圆角",
              "value": "8px"
            }, {
              "label": "圆形",
              "value": "50%"
            }],
            "default": "8px"
          },
          "top": {
            "title": "上边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "bottom": {
            "title": "下边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "left": {
            "title": "左边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "right": {
            "title": "右边距",
            "type": "slider",
            "values": [0, 50],
            "default": 5
          },
          "dynamicdata": {
            "title": "动态数据",
            "type": "checkbox",
            "default": false
          }
        }
      }, {
        "key": "text",
        "data": [{
          "displayVisible": false,
          "sizeVisible": false,
          "lineHeightVisible": false,
          "alignVisible": false,
          "paddingVisible": false,
          "size": 22,
          "lineHeight": 42,
          "paddingTop": 0,
          "paddingRight": 0,
          "paddingBottom": 0,
          "paddingLeft": 40,
          "title": "d的第三方仍无法爱斯达克阿萨德奥斯卡了阿萨德爱斯达克阿萨德阿萨德阿萨德sad阿萨德sad看倒胃口哇带娃",
          "align": "left",
          "clickUrl": "asd"
        }, {
          "displayVisible": false,
          "sizeVisible": false,
          "size": 12,
          "lineHeight": 32,
          "paddingTop": 0,
          "paddingRight": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "title": "sa",
          "background": "#AB5959",
          "display": "inline-block"
        }, {
          "displayVisible": false,
          "sizeVisible": false,
          "lineHeightVisible": false,
          "size": 12,
          "lineHeight": 22,
          "paddingTop": 0,
          "paddingRight": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "title": "xz撒打算放",
          "display": "inline-block",
          "color": "#F46A6A"
        }, {
          "size": 12,
          "lineHeight": 22,
          "paddingTop": 0,
          "paddingRight": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "title": "sasa safdsafsdfds ",
          "color": "#717171"
        }],
        "config": {
          "background": {
            "title": "背景色",
            "type": "color",
            "default": "#ffffff"
          },
          "color": {
            "title": "字体颜色",
            "type": "color",
            "default": "#000000"
          },
          "align": {
            "title": "排列",
            "type": "radio",
            "values": [{
              "label": "靠左",
              "value": "left"
            }, {
              "label": "居中",
              "value": "center"
            }, {
              "label": "靠右",
              "value": "right"
            }],
            "default": "left"
          },
          "top": {
            "title": "上边距",
            "type": "slider",
            "values": [0, 375],
            "default": 6
          },
          "bottom": {
            "title": "下边距",
            "type": "slider",
            "values": [0, 375],
          },
          "left": {
            "title": "左边距",
            "type": "slider",
            "values": [0, 375],
            "default": 6
          },
          "right": {
            "title": "右边距",
            "type": "slider",
            "values": [0, 375],
            "default": 6
          },
          "radius": {
            "title": "边框样式",
            "type": "radio",
            "values": [{
              "label": "正方形",
              "value": "0"
            }, {
              "label": "圆角",
              "value": "8"
            }],
            "default": "8"
          },
        }
      }, {
        "key": "images",
        "data": [{
          "imageUrl": "seller/202104/15/71085B5F-56C4-410E-A8F2-335C6A53BDE3.jpg",
          "title": "阿萨德",
          "clickUrl": "1111"
        }, {
          "imageUrl": "seller/202104/15/EB65FA0D-685C-4DBF-9E7E-67FE9728F9A7.jpg",
          "title": "司法所大",
          "clickUrl": "2222"
        }, {
          "imageUrl": "seller/202104/15/1C282C95-6B9D-42DF-9CDE-ACFD65378B1B.jpg",
          "title": "奥术大师",
          "clickUrl": "3333"
        }],
        "config": {
          "top": {
            "title": "上边距",
            "type": "slider",
            "values": [0, 100],
            "default": 0
          },
          "bottom": {
            "title": "下边距",
            "type": "slider",
            "values": [0, 100],
            "default": 0
          },
          "left": {
            "title": "左边距",
            "type": "slider",
            "values": [0, 100],
            "default": 6
          },
          "right": {
            "title": "右边距",
            "type": "slider",
            "values": [0, 100],
            "default": 6
          },
          "dynamicdata": {
            "title": "动态数据",
            "type": "checkbox",
            "default": false
          }
        }
      }]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.selectComponent('#swiper').height()
    // console.log('datas', this.selectComponent('#swiper').datas())
    // const data = this.selectComponent('#swiper').datas();
    // data.height = "200px"
    // this.selectComponent('#swiper').datas(data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({swiper: 'swiper'})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})