<template>
  <div class="swiper-plugins-wrapper"
       :style="{
         'margin-top': (config.top.default || 0) + 'px',
         'margin-right': (config.right.default || 0) + 'px',
         'margin-bottom': (config.bottom.default || 0) + 'px',
         'margin-left': (config.left.default || 0) + 'px'
       }">
    <swiper :options="swiperOption" ref="swiper"
            v-if="data && data.length > 0"
            :style="{
              'border-radius': config.radius.default || 'none'
            }">
      <swiper-slide class="swiper-slide" v-for="(item,index) in data" :key="index">
        <div :data-url="item.clickUrl">
          <img :src="$getPictureUrl(item.imageUrl)" :alt="item.title"/>
        </div>
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination" :class="{ hidden: !config.pagination.default }"></div>
    </swiper>
    <div class="components-placeholder" v-else>点击此区域进行编辑【轮播】</div>
  </div>
</template>

<script>

export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    'config.delay.default'() {
      if (this.config.autoplay.default) {
        this.swiperOption.autoplay.delay = this.config.delay.default
        setTimeout(() => {
          this.$refs.swiper.destroySwiper()
          this.$refs.swiper.initSwiper()
        })
      }
    },
    'config.autoplay.default'() {
      if (this.config.autoplay.default) {
        this.swiperOption.autoplay = {
          delay: this.config.delay.default,
          disableOnInteraction: false
        }
      } else {
        this.swiperOption.autoplay = false
      }
      setTimeout(() => {
        this.$refs.swiper.destroySwiper()
        this.$refs.swiper.initSwiper()
      })
    },
    'config.pagination.default'() {
      setTimeout(() => {
        this.$refs.swiper.destroySwiper()
        this.$refs.swiper.initSwiper()
      })
    }
  },
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        // 显示分页
        pagination: {
          el: '.swiper-pagination'
        },
        // 自动轮播
        autoplay: {
          delay: 2000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        // 开启循环模式
        loop: true
      }
    }
  },
  computed: {},
  mounted() {
    window.sw = this
  },
  methods: {}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss">
  @import 'index.scss';
</style>
