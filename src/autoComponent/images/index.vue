<template>
  <div class="images-container"
       :style="{
         'margin-top': (config.top.default || 0) + 'px',
         'margin-right': (config.right.default || 0) + 'px',
         'margin-bottom': (config.bottom.default || 0) + 'px',
         'margin-left': (config.left.default || 0) + 'px'
       }">
    <template v-if="data && data.length > 0">
      <img :src="$getPictureUrl(item.imageUrl)" class="images-item"
           v-for="(item, index) of data" :key="'images_' + index" :data-url="item.clickUrl"
           :data-scp="'images.' + index" :alt="item.title"/>
    </template>
    <div v-else class="images-wrapper components-placeholder">点击此区域进行编辑【图片】</div>
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
      linePos: 0
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
