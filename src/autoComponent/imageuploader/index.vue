<template>
  <div class="imageuploader-container clearfix">
    <div class="imageuploader-viewer-container" v-show="imageUrls.length > 0">
      <div class="imageuploader-viewer-cell" v-for="(image, index) of imageUrls"
           :style="{ width: `${width}px`, height: `${height}px`}" :key="index">
        <span v-if="!image.loading" class="imageuploader-viewer-delete-btn el-icon-error"
              @click="onDelete(index)"></span>
        <img class="imageuploader-loading" v-if="image.loading" :src="loading"/>
        <img v-else :src="$getPictureUrl(image.url, {q : quality, w: width, h: height})"/>
      </div>
    </div>
    <div class="imageuploader-background-container" v-show="imageUrls.length < multiple">
      <div class="imageuploader-background-shower" :style="{ width: `${width}px`, height: `${height}px`}">
        <img src="@/assets/images/upload.png">
        <input @change="fileChanged($event)" class="imageuploader-file-input" type="file" :multiple="multiple > 1"
               accept="image/*"/>
        <p class="title" v-if="title">{{ title }}</p>
      </div>
    </div>
  </div>
</template>

/**
* @author ： 李银 on 2018年6月19日 21:11:04
*
* 入参：
* multiple:Number     - 最多上传多少张图片，默认为1
* title:String        - 图片选择器背景提示文字
* width:Number        - 图片显示宽度，默认200px
* height:Number       - 图片显示高度，默认200px
* quality:Number      - 小图显示的质量，默认50（即原图50%的压缩质量）
* fileSize:Number     - 图片最大上传KB数，默认10MB（即1024*1024*10 KBytes）
*
* api:
* getImageUrls()                - 获取当前已经上传的图片url；
*
* 回调：
* onImageChanged(urls)          - 当前图片的url发生改变时（如删除，上传成功）出发此回调，urls为所有图片urls；
**/
<script>
import loading from '@/assets/images/loading.gif'
import { Message } from 'element-ui'

export default {
  name: 'Imageuploader',
  props: {
    multiple: {
      type: Number,
      default: 1
    },
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    mark: {
      type: Boolean,
      default: true
    },
    quality: {
      type: Number,
      default: 50
    },
    // 默认仅支持最大10M文件
    fileSize: {
      type: Number,
      default: 1024 * 1024 * 10
    },
    value: undefined,
    onImageChanged: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      selfValue: undefined,
      loading,
      // 格式为 {url: '图片url', loading: true/false - 是否在上传中？}
      imageUrls: [],
      // 支持上传的图片类型
      support: ['gif', 'jpeg', 'jpg', 'png', 'svg', 'bmp']
    }
  },
  watch: {
    value() {
      console.log('imageuploader value changed:', this.selfValue, ' ==> ', this.value)
      this.selfValue = this.value
      this.setImageUrls()

      console.log('imageuploader value changed11:', this.imageUrls)
    },
    selfValue() {
      console.log('imageuploader selfValue changed:', this.value, ' ==> ', this.selfValue)
      this.$emit('input', this.selfValue)
    }
  },
  mounted() {
    // 初始化外部传入的图片资源
    this.selfValue = this.value
    this.setImageUrls()
  },
  methods: {
    setImageUrls() {
      if (this.multiple > 1) {
        let init = this.selfValue || []
        if (typeof init === 'string') {
          init = [init]
        }
        this.imageUrls = init.filter(url => url).map(url => ({ url, loading: false }))
      } else {
        this.imageUrls = [this.selfValue].filter(url => url).map(url => ({ url, loading: false }))
      }
    },
    fileChanged(e) {
      // 判断文件是否存在
      const files = e.target.files

      // 判断是否为图片文件
      const temp = []
      const legalFiles = []
      for (let i = 0; i < files.length; i += 1) {
        const f = files[i]
        // 获取文件上传的后缀名
        const splits = f.name.split('.')
        const type = splits[splits.length - 1].toLowerCase()
        if (this.support.indexOf(type) === -1) {
          Message.error(`您这个[${f.name}]上传类型不符合`)
        } else if (f.size >= this.fileSize) {
          Message.error(`您这个[${f.name}]文件太大了`)
        } else {
          temp.push({ loading: true })
          legalFiles.push(f)
        }
      }

      // 上传图片是否超限
      if (this.imageUrls.length + legalFiles.length > this.multiple) {
        Message.error(`最多只能上传${this.multiple}张图片`)
      } else {
        this.imageUrls = this.imageUrls.concat(temp)
        this.upload(legalFiles)
      }
      e.target.value = ''
    },
    async upload(files) {
      const data = new FormData()
      files.forEach((f) => {
        data.append('image', f)
      })
      if (!this.mark) {
        data.append('mark', this.mark)
      }
      const res = await this.baseService.uploadImageHavekg({ data })

      let index = 0
      this.imageUrls = this.imageUrls.map((image) => {
        if (this.multiple === 1 && image.loading) {
          image.url = res.data.url
          image.loading = false
        } else {
          image.url = res.data[index]
        }
        index += 1
        return image
      })

      if (this.multiple > 1) {
        this.selfValue = this.getImageUrls()
      } else {
        this.selfValue = this.getImageUrls()[0]
      }

      this.notifyImageChanged()
    },
    notifyImageChanged() {
      if (this.onImageChanged) {
        this.onImageChanged(this.getImageUrls())
      }
    },
    getImageUrls() {
      return this.imageUrls.filter(i => !i.loading).map(i => i.url)
    },
    onDelete(index) {
      this.imageUrls.splice(index, 1)
      if (this.multiple > 1) {
        this.selfValue = this.getImageUrls()
      } else {
        this.selfValue = this.getImageUrls()[0]
      }
      this.notifyImageChanged()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "index";
</style>
