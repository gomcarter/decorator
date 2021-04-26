module.exports = {
  dataChanged(data) {
    data.forEach(s => {
      s.iconUrl = this.$imageUrl(s.imageUrl)
    })
    setTimeout(() => {
      this.setData({ 'options.dataShow': data })
    }, 1);
  },
  configChanged(config) {
    const top = config.top.default || 0
    const right = config.right.default || 0
    const bottom = config.bottom.default || 0
    const left = config.left.default || 0
    // 容器的宽度: rpx
    config.containerWith = (this.$width() - left - right)

    config.top.default = this.$px2rpx(top);
    config.right.default = this.$px2rpx(right);
    config.bottom.default = this.$px2rpx(bottom);
    config.left.default = this.$px2rpx(left);
    setTimeout(() => {
      this.setData({ 'options.configShow': config })
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
    const { config, data } = this.data.options
    const index = e.currentTarget.dataset.index
    const item = data[index]
    const containerWith = config.containerWith
    item.height = this.$px2rpx(containerWith * height / width)

    const obj = {}
    const key = "options.dataShow[" + index + "]"
    obj[key] = item
    this.setData(obj)
  },
  add(data) {
    if (data.length > 0) {
      this.data.options.data.push(...data)
    } else {
      this.data.options.data.push(data)
    }
    this.dataChanged(this.data.options.data)
  }
}