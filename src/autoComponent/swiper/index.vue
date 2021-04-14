<template>
  <div class="swiper-wrapper" style="background: white"
       :style="{
         'background-color': config.background.default || 'white',
       }">
    <swiper :options="swiperOption" style="width: 80%; margin: 0 auto"
            :style="{
              'border-radius': config.radius.default || 'none'
            }">
      <swiper-slide class="swiper-slide" v-for="(item,index) in arrays" :key="index">
        <div :data-url="item">
          <img :src="item"/>
        </div>
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
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
  data() {
    return {
      arrays: [
        'https://img1.tg-img.com/seller/202103/29/3FF81C65-ABAF-4601-95B5-F25AFD70115C.jpg!y',
        'https://img1.tg-img.com/seller/202104/08/289A0990-6355-4B62-AB16-69373129CA0C.jpg!y',
        'https://img1.tg-img.com/seller/202103/29/DE8A7844-21BF-45A2-8F2C-BC71C3390227.jpg!y',
        'https://img1.tg-img.com/seller/202104/08/18D9DA92-D7EF-487F-AF63-61634DB332BE.jpg!y',
        'https://img1.tg-img.com/seller/202010/28/943625EB-22F7-4A74-82F9-AF325196EAC9.jpg!y'
      ],
      swiperOption: {
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
  },
  methods: {}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss">
  @import 'index.scss';
</style>
