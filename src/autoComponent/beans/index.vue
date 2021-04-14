<template>
  <div class="beans-container"
       :style="{
         'margin-top': (config.top.default || 0) + 'px',
         'margin-right': (config.right.default || 0) + 'px',
         'margin-bottom': (config.bottom.default || 0) + 'px',
         'margin-left': (config.left.default || 0) + 'px'
       }">
    <div class="beans-wrapper"
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
          <img :src="$getPictureUrl(item.imageUrl)" class="beans-icon"
               :style="{
                 'border-radius': config.iconRadius.default || '0'
               }"/>
        </div>
        <div class="beans-item-text">{{ item.title }}</div>
      </div>
    </div>
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
