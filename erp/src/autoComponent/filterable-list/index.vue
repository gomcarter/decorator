<template>
  <div onselectstart="return false" class="f-frame">
    <div v-if="header" class="header">
      <el-radio-group v-model="radioValue" size="mini" class="margint10 marginl5">
        <el-radio-button v-for="(r, i) of radios" :key="r.id + '_' + i" :label="r.id">{{ r.name }}</el-radio-button>
      </el-radio-group>
      <div v-if="date" class="date-picker-container">
        <ac-datepicker :date="date" v-model="dateValue"></ac-datepicker>
      </div>
    </div>
    <div v-if="nodes && nodes.length > 0" class="body y-scrollbar">
      <div
        v-for="(node, index) of nodes"
        :key="index + '_nodes'">
        <div
          class="tree-node list-group-item"
          :class="{ active: isSelected(node) }"
          :tabindex="-1"
          @click="onClick(node)">
          <span :class="node.icon ? node.icon : ''" class="marginr10"></span>
          <span v-if="node.image" class="image marginr2">
            <img :src="node.image" alt="">
          </span>
          <span>
            <div v-if="node.format" class="item-left" v-html="node.format()"></div>
            <div v-else class="item-left">{{ node[name] }}</div>
            <div v-if="button" class="item-right">
              <el-button :type="node.buttonType" size="mini" @click="_onButtonClicked($event, node)">{{ button }}</el-button>
            </div>
          </span>
        </div>
      </div>
    </div>
    <div v-else class="body y-scrollbar">
      <div class="placeholder">{{ placeholder }}</div>
    </div>
  </div>
</template>

/**
* @author ： 李银 on 2018年5月24日 23:55:12
*
* 入参：
* editable:Boolean    - 是否可以被编辑。默认为false（不可标记）
* nodes:Array         - 数据， 格式尽量为：{id : '主键', name : '显示的内容'}
* value:              - 初始选中数据， 格式为：[1,2,3,4, '主键id']
*
* 回调：
* onButtonClicked(node)               - 被拖动的节点，新的排序值
* onSelected(node)                    - 某个节点被选中回调，不设置则不触发，node为选中节点数据, selected当前已经选中的节点id
* onUnselected(node)                  - 某个节点被取消选中回调，不设置则不触发，node为取消选中节点数据, selected当前已经选中的节点id
* onSelectionChanged(node)            - 选中项改变了触发，selected当前已经选中的节点id
* paramsChanged(params)               - 选中项改变了触发，selected当前已经选中的节点id
**/
<script>
/* eslint-disable */
export default {
  name: 'items',
  props: {
    placeholder: {
      type: String,
      default: '暂无数据'
    },
    params: {
      type: Object,
      default: null
    },
    header: {
      type: Boolean,
      default: true
    },
    date: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: null
    },
    onButtonClicked: {
      type: Function,
      default: () => {}
    },
    id: {
      type: String,
      default: 'id'
    },
    name: {
      type: String,
      default: 'name'
    },
    datas: {
      type: Array,
      default: () => null
    },
    onSelected: {
      type: Function,
      default: null
    },
    onUnselected: {
      type: Function,
      default: null
    },
    onSelectionChanged: {
      type: Function,
      default: null
    },
    radios: {
      type: Array,
      default: () => []
    },
    paramsChanged: {
      type: Function,
      default: null
    },
    value: undefined
  },
  data () {
    return {
      selfValue: this.value,
      dateValue: undefined,
      radioValue: undefined,
      nodes: []
    }
  },
  mounted () {
    this.init()
    if (this.params) {
      if (this.params.dateValue) {
        this.dateValue = this.params.dateValue
      }

      if (this.params.radioValue) {
        this.radioValue = this.params.radioValue
      }
    }
  },
  watch : {
    value() {
      this.selfValue = this.value
    },
    selfValue() {
      this.$emit('input', this.selfValue)
    },
    radioValue() {
      this.notify()
    },
    dateValue() {
      this.notify()
    },
    datas() {
      this.init()
    }
  },
  methods: {
    notify() {
      const params = {}
      params[this.date] = this.dateValue
      this.paramsChanged && this.paramsChanged(params)
    },
    _onButtonClicked(e, node) {
      e.stopPropagation()

      this.onButtonClicked && this.onButtonClicked(node)
    },
    init () {
      this.$set(this, 'nodes', (this.datas && this.datas.length > 0) ? this.datas.map(s => s) : [])
    },
    isSelected (node) {
      return this.selfValue === node[this.id]
    },
    getSelected () {
      return this.selfValue
    },
    onClick (node) {
      if (this.onSelected) {
        this.onSelected(node)
      }

      // 此行已经被选中了，则不执行回调onSelectionChanged方法
      if (!this.isSelected(node) && this.onSelectionChanged) {
        this.onSelectionChanged(node)
      }

      // 修改最新选中
      this.selfValue = node[this.id]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'index.scss';

  .el-tabs__item {
    padding: 0 5px !important;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 400;
    color: #303133;
    position: relative;
  }

  .date-picker {
    height: 36px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: end;
    justify-content: flex-end;
    text-align: right;
    font-size: 12px;
    color: rgb(122, 135, 148);
    cursor: pointer;
  }

  .date-picker-container {
    display: inline-block;
    float: right;
    top: 10px;
    position: relative;
    right: 10px;
  }

  .item-left {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-right: auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }

  .item-right {
    display: inline-block;
    position: absolute;
    right: 12px;
    top: 17px;
  }

  .image {
    width: 22px;
    height: 24px;
  }

  .header {
    height: 36px;
    background-image: linear-gradient(#e2e5f5, white);
  }

  .body {
    height: calc(100% - 27px);

    .placeholder {
      position: relative;
      background-color: #fff;
      width: 100%;
      height: 64px;
      text-align: center;
      line-height: 64px;
    }
  }

  .f-frame {
    height: 100%;
  }
</style>
