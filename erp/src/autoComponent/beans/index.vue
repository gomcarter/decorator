<template>
  <div class="beans-container"
       :style="{
         'margin-top': (config.top.default || 0) + 'px',
         'margin-right': (config.right.default || 0) + 'px',
         'margin-bottom': (config.bottom.default || 0) + 'px',
         'margin-left': (config.left.default || 0) + 'px'
       }">
    <div class="beans-wrapper"
         v-if="data && data.length > 0"
         :class="{
           'x-scrollable': config.scrollable.default || false
         }"
         :style="{
           'background-color': config.background.default || 'white',
           'border-radius': (config.radius.default || 'none') + 'px'
         }">
      <div class="beans-item" v-for="(item, index) of data" :key="'beans_' + index" :data-url="item.clickUrl"
           :data-scp="'beans.' + index"
           :style="{
             'width': (config.width.default || 25) + '%'
           }">
        <div class="beans-image-wrapper">
          <img :src="$getPictureUrl(item.imageUrl)" class="beans-icon" :alt="item.title"
               :style="{
                 'border-radius': config.iconRadius.default || '0'
               }"/>
        </div>
        <div class="beans-item-text">{{ item.title }}</div>
      </div>
    </div>
    <div class="components-placeholder" v-else>点击此区域进行编辑【豆豆】</div>
    <div class="beans-scroll-line" v-if="config.scrollable.default && config.scrollLine.default">
      <div class="track"></div>
    </div>
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
