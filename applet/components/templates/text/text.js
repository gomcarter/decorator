module.exports = {
  /**
   * 数据改变
   */
  dataChanged(data) {
    const newData = data.map(s => s);
    newData.forEach(s => { 
      s.size = this.$px2rpx(s.size)
      s.lineHeight = this.$px2rpx(s.lineHeight)
      s.paddingTop = this.$px2rpx(s.paddingTop)
      s.paddingRight = this.$px2rpx(s.paddingRight)
      s.paddingBottom = this.$px2rpx(s.paddingBottom)
      s.paddingLeft = this.$px2rpx(s.paddingLeft)
     })
     console.log('newData', newData)
    setTimeout(() => { this.setData({ 'options.dataShow': newData }) }, 1);
  },
  configChanged(config) {
    const top = config.top.default || 0
    const right = config.right.default || 0
    const bottom = config.bottom.default || 0
    const left = config.left.default || 0
    // 容器的宽度: rpx
    const containerWith = (this.$width() - left - right)
    config.containerWith = containerWith;

    config.top.default = this.$px2rpx(top);
    config.right.default = this.$px2rpx(right);
    config.bottom.default = this.$px2rpx(bottom);
    config.left.default = this.$px2rpx(left);
    config.radius.default = this.$px2rpx(config.radius.default || 0);

    setTimeout(() => { this.setData({ 'options.configShow': config }) }, 1);
  },
  /**
   * 初始化配置之类的
   */
  attached() {
    this.configChanged(this.data.options.config)

    const data = this.data.options.data
    if (data && data.length > 0) {
      this.dataChanged(data)
    }
  }
}