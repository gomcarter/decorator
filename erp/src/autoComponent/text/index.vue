<template>
  <div class="text-container"
       :style="{
         'background-color': (config.background.default || '#fff'),
         'color': (config.color.default || '#000'),
         'margin-top': (config.top.default || 0) + 'px',
         'margin-right': (config.right.default || 0) + 'px',
         'margin-bottom': (config.bottom.default || 0) + 'px',
         'margin-left': (config.left.default || 0) + 'px',
         'text-align': config.align.default,
         'width': 'calc(100% - ' + (config.left.default + config.right.default) + 'px)',
         'border-radius': (config.radius.default || 'none') + 'px'
       }">
    <template v-if="data.filter(s => s.title).length > 0">
      <div class="text-wrapper" v-for="(t, i) of data" :data-url="t.clickUrl" :key="'text_' + i"
           :data-scp="'text.' + i"
           :style="{
             'background-color': t.background,
             'color': t.color,
             'display': t.display,
             'font-size': t.size + 'px',
             'line-height': t.lineHeight + 'px',
             'text-align': t.align,
             'padding': [t.paddingTop, t.paddingRight, t.paddingBottom, t.paddingLeft].join('px ') + 'px',
             'margin-top': (t.top || 0) + 'px',
             'margin-right': (t.right || 0) + 'px',
             'margin-bottom': (t.bottom || 0) + 'px',
             'margin-left': (t.left || 0) + 'px'
           }">{{ t.title }}</div>
    </template>
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
