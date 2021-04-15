<template>
  <div class="text-container"
       :style="{
         'margin-top': (config.top.default || 0) + 'px',
         'margin-right': (config.right.default || 0) + 'px',
         'margin-bottom': (config.bottom.default || 0) + 'px',
         'margin-left': (config.left.default || 0) + 'px',
         'width': 'calc(100% - ' + (config.left.default + config.right.default) + 'px)'
       }">
    <div class="text-wrapper"
         v-if="config.text.default.length > 0" :data-url="config.clickUrl" :data-scp="'text.0'">
      {{ config.text.default }}
    </div>
    <div v-else class="text-wrapper components-placeholder">点击此区域进行编辑【文字】</div>
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
