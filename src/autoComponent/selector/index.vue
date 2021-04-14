/* eslint-disable */
<template>
  <el-select
    ref="selector"
    v-model="selfValue"
    :multiple="multiple"
    :filterable="filterable"
    :remote="true"
    :clearable="clearable"
    :placeholder="placeholder || (multiple ? '请输入关键字搜索' : '请选择')"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="onChange"
    @clear="onChange"
    class="form-control padding0 border0"
    :disabled="disabled"
    :size="size"
    :popper-append-to-body="false"
    :allow-create="allowCreate"
    :default-first-option="true">
    <el-option
      v-for="(item, index) of selections"
      :key="index"
      :label="item[name]"
      :value="item[id]"
      :disabled="disabledSelections.indexOf(item[id]) > -1">
      <slot name="option" :item="item"></slot>
    </el-option>
    <template slot="prefix">
      <slot name="prefix"></slot>
    </template>
  </el-select>
</template>

<script>
/**
 * @author ： 李银 on 2018-10-31 09:18:18
 * 依据element-ui改装，原版请访问：http://element-cn.eleme.io/#/zh-CN/component/select
 *
 * 入参：
 * id:String             - 在数据中的主键名称，如data为：[{a:1,b:2}],如果id为a，那么1为这个数据的主键，默认：id
 * name:String           - 在数据中的用于显示的名称，如data为：[{a:1,b:2}],如果name为b，那么2为这个数据的显示元素，默认name
 * multiple:Boolean      - 是否多选，默认：false
 * placeholder:String    - 占位符，默认：请选择
 * filterable:Boolean    - 是否可搜索，默认：false
 * data:Array/Object     - 可选项数据：必须至少包含id，name字段，id用于唯一标识，name字段用于展示，在remote为false下生效，如果data是object，则系统自动转化为Array形式，key为id，value为name
 * url:String            - 远程请求数据url，返回数据格式和data一致，必须接收@searchKey 作为搜索参数
 * searchKey:String      - 远程请求数据的参数名，默认name
 * extra-params          - 远程请求数据的额外参数
 * allow-create          - 是否允许用户创建新条目，需配合 filterable 使用
 * size                  - medium mini small
 * disabled              - 是否禁用
 * disabled-selections   - 禁用选项
 * clearable             - 是否可以清除选项
 * format                - name formatter
 *
 * api:
 * clear                 - 清空选项
 *
 * 回调：
 * on-selection-changed  - 当前选择项发生变化时触发，参数为当前所有选择的项；
 **/
import { xhr } from '@/utils/http'

export default {
  name: 'Selector',
  props: {
    allowCreate: {
      type: Boolean,
      default: false
    },
    value: null,
    size: {
      type: String,
      default: 'medium'
    },
    id: {
      type: String,
      default: 'id'
    },
    name: {
      type: String,
      default: 'name'
    },
    searchKey: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    filterable: {
      type: Boolean,
      default: false
    },
    data: null,
    url: null,
    extraParams: {
      type: Object,
      default: null
    },
    onSelectionChanged: {
      type: Function,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    format: {
      type: Function,
      default: null
    },
    disabledSelections: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selfValue: this.value,
      searchKey0: null,
      selections: [],
      selected: null,
      loading: false,
      params: {}
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    data() {
      this.loadData(this.data)
    },
    async value() {
      // console.log(2222222222, this.selfValue, ' ==> ', this.value)
      this.selfValue = this.value
    },
    selfValue() {
      if (this.type === 'number') {
        if (!(+this.selfValue > this.min)) {
          this.selfValue = ''
        }
      }
      // console.log(1111111111, this.selfValue)
      this.$emit('input', this.selfValue)
    },
    /**
     * 改变入参
     */
    extraParams() {
      const extraParams = this.extraParams || {}
      const params = this.params || {}
      if (JSON.stringify(extraParams) !== JSON.stringify(params)) {
        this.params = extraParams
        this.clear()
        this.remoteMethod()
      }
    }
  },
  methods: {
    /**
     * 组装初始化参数
     */
    loadParams() {
      const loadParams = {}
      if (this.selfValue !== undefined || this.selfValue !== null) {
        const load = this.multiple ? this.selfValue : [this.selfValue]
        if (load.length > 0 && this.selfValue) {
          // loadParams['rows'] = load.length
          loadParams[this.searchKey0] = load
          // loadParams[`${this.id}List`] = load
        }
      }
      return loadParams
    },
    init() {
      this.params = this.extraParams || {}
      this.searchKey0 = this.searchKey || this.name
      if (this.data) {
        this.loadData(this.data)
      } else if (this.url) {
        // 有初始值，则需要把初始值对应的data请求回来
        this.remoteMethod(undefined, this.loadParams())
      }
    },
    loadData(data) {
      let result
      if (!(data instanceof Array)) {
        result = Object.entries(data)
          .map(d => {
            return { id: d[0], name: d[1] }
          })
      } else {
        if (data.length > 0 && !(data[0] instanceof Object)) {
          result = data.map(s => {
            const a = {}
            a[this.id] = s
            a[this.name] = s
            return a
          })
        } else {
          const splits = this.name.split('.')
          if (splits.length > 0) {
            data.forEach(d => {
              // 去下级找
              let value = d
              splits.forEach((s) => {
                value = value[s] != null ? value[s] : ''
              })
              d.name = value
            })
          }
          result = data
        }
      }
      if (this.format) {
        result.forEach((v) => {
          v.name = this.format(v)
        })
      }

      this.selections = result
    },
    clear() {
      this.selfValue = this.multiple ? [] : ''
    },
    clearAll() {
      this.clear()
      this.remoteMethod()
    },
    async remoteMethod(name, initParams) {
      if (!this.disabled) {
        if (this.url) {
          name = (name || '').trim()

          this.loading = true
          let params = {}
          params[this.searchKey0] = name
          params = Object.assign(params, initParams, this.params)
          // 如果url是字符串，则自行请求结果，否则直接执行url方法
          try {
            const res = await (typeof this.url === 'string' ? xhr.get(this.url, { params }) : this.url(params))
            this.loading = false
            if (res.data.length === 0) {
              if (this.allowCreate) {
                this.selfValue = name
              }
              this.loadData(res.data)
              this.onChange()
            } else {
              this.loadData(res.data)
            }
          } catch (e) {
            this.loading = false
            this.loadData([])
          }
        } else if (this.allowCreate) {
          this.selfValue = name
          this.onChange()
        }
      }
    },
    onChange() {
      // 通知外部选择项已修改
      if (this.onSelectionChanged) {
        setTimeout(() => {
          this.onSelectionChanged(this.selections.filter(s => s[this.id] === this.selfValue), this.selfValue)
        }, 10)
      }
    },
    focus() {
      this.$refs.selector.focus()
    }
  }
}
</script>

<style scoped>
</style>
