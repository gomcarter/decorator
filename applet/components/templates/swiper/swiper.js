module.exports = {
  height(h) {
    if (h != null) {
      this.setData({
        "configShow.containerHeight": h
      })
    } else {
      return this.data.options.configShow.containerHeight
    }
  },
  onItemTap(e) {
    const callback = this.data.options.onItemTap
    if (callback) {
      const index = e.target.dataset.index || e.currentTarget.dataset.index
      callback.call(this, this.data.options.data[index], index)
    }
  },
  configChanged(config) {
    console.log('configChanged ' + this.data.is)

    const top = config.top.default || 0
    const right = config.right.default || 0
    const bottom = config.bottom.default || 0
    const left = config.left.default || 0
    // 容器的宽度: px
    config.containerWith = (this.$width() - left - right)
    config.top.default = this.$px2rpx(top);
    config.right.default = this.$px2rpx(right);
    config.bottom.default = this.$px2rpx(bottom);
    config.left.default = this.$px2rpx(left);
    config.radius.default = this.$px2rpx(config.radius.default || 0);

    setTimeout(() => {
      this.setData({ 'options.configShow': config })
    }, 1);
  },
  dataChanged(data) {
    console.log('dataChanged ' + this.data.is, this.data)
    data.forEach(s => {
      s.iconUrl = this.$imageUrl(s.imageUrl)
    })
    setTimeout(() => {
      this.setData({ 'options.dataShow': data })
    }, 1);
  },
  attached() {
    this.configChanged(this.data.options.config)

    const data = this.data.options.data
    if (data && data.length > 0) {
      this.dataChanged(data)
    }
  },
  onImageLoad(e) {
    const { width, height } = e.detail
    const { configShow } = this.data.options
    if (configShow.containerHeight) {
      return
    }

    const containerWith = configShow.containerWith
    const containerHeight = containerWith * height / width

    this.setData({
      "options.configShow.containerHeight": this.$px2rpx(containerHeight)
    })
  }
}