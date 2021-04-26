<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width != null ? `${width}px` : 'auto'"
    @close="onClose"
    :lock-scroll="lockScroll">
    <div :style="{ height: height ? (height+ 'px') : ''}">
      <slot name="body"></slot>
    </div>
    <div slot="footer" v-if="okText || cancelText" class="modal-footer">
      <slot>
        <el-button v-if="cancelText" type="info" @click="visible = false" size="medium">{{ cancelText }}</el-button>
        <el-button v-if="okText" type="primary" @click="confirm" :disabled="disabled" size="medium"
                   :icon="disabled?'el-icon-loading':''">
          {{ okText }}
        </el-button>
      </slot>
    </div>
  </el-dialog>
</template>

/**
* @author ： 李银 on 2018年6月24日 11:03:45
*
* 入参：
* title:String        - 弹框标题
* lockScroll:Boolean  - 是否在 Dialog 出现时将 body 滚动锁定
* okText:String       - 确定按钮文字
* cancelText:String   - 取消按钮文字
* width:Number        - 模态框显示宽度，默认600px
* height:Number       - 模态框示高度，默认自适应
* autoLoading:Boolean - 是否在点击确定之后，ok按钮自动转菊花
*
* api:
* open                - 打开对话框
* confirm             - 触发确定按钮
* cancel              - 触发取消按钮
* toggle              - 切换窗口打开/关闭，如果当前是打开状态调用则变为关闭，反之则打开
*
* 回调：
* ok()                - 当前点击确定按钮的时候触发, 如果此方法的返回值为false，对话框将不会关闭，其他将自动关闭 -- autoClose设置为true生效；
* cancel()            - 当前点击确定按钮的时候触发, 如果此方法的返回值为false，对话框将不会关闭，其他将自动关闭；
**/
<script>

export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: '模态框'
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    ok: {
      type: Function,
      default: null
    },
    cancel: {
      type: Function,
      default: null
    },
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: null
    },
    autoLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      disabled: false
    }
  },
  methods: {
    confirm() {
      if (this.autoLoading) {
        this.disabled = true

        setTimeout(() => {
          this.disabled = false
        }, 1500)
      }
      if (this.ok) {
        this.ok()
      }
    },
    onClose() {
      if (this.cancel) {
        const r = this.cancel()
        if (r === false) {
          this.visible = true
        }
      }
    },
    close() {
      this.visible = false
      if (this.autoLoading) {
        this.disabled = false
      }
    },
    open() {
      this.visible = true
    },
    toggle() {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss">
  .modal-footer {
    padding: 15px 0 0 0;
  }

  .el-dialog__body {
    border-top: 1px solid #cacaca;
    padding: 20px 20px 0 20px;
  }
</style>
