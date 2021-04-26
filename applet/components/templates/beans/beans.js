module.exports = {
  // 数据结构
  scroll(e) {
    let temp = (Number(e.detail.scrollLeft) / (Number(e.detail.scrollWidth) - this.$width())).toFixed(1);
    if (temp > 1) {
      temp = 1;
    }
    if (temp < 0) {
      temp = 0;
    }
    this.setData({
      'options._linePos': temp * 40
    });
  },
  /**
   * 数据改变
   */
  dataChanged(data) {
    data.forEach(s => { s.iconUrl = this.$imageUrl(s.imageUrl) })
    setTimeout(() => { this.setData({ 'options.dataShow': data }) }, 1);
  },
  configChanged(config) {
    const top = config.top.default || 0
    const right = config.right.default || 0
    const bottom = config.bottom.default || 0
    const left = config.left.default || 0
    // 容器的宽度: rpx
    const containerWith = (this.$width() - left - right)
    // 每个icon的宽度 % 
    const width = config.width.default || 25;
    // 正方形： imageHeight == imageWidth
    const imageHeight = this.$px2rpx(containerWith * width / 125);
    config.imageHeight = imageHeight;

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