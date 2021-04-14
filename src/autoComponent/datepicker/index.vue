<template>
  <div class="custom-date-picker">
    <div class="date-shower" :class="selfValue ? 'value' : 'placeholder'">
      {{ selfValue ? Date.format(selfValue, 'yyyy-MM-dd') : '选择日期' }}
      <span class="el-icon-arrow-down"></span>
    </div>
    <el-date-picker
      v-model="selfValue"
      type="date"
      class="date-trigger"
      clear-icon="none"
      value-format="timestamp">
    </el-date-picker>
  </div>
</template>

/**
* @author ： 李银 on 2018年6月24日 11:03:45
*
* 入参：
* value:String        - 初始值
*
* 回调：
* onChanged(timestamp)          - 发生变化时
**/
<script>

export default {
  name: 'Datepicker',
  props: {
    value: null,
    onChanged: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    value() {
      this.selfValue = this.value
    },
    selfValue() {
      this.$emit('input', this.selfValue)
    }
  },
  data() {
    return {
      selfValue: ''
    }
  }
}
</script>

<style lang="scss">
  .custom-date-picker {
    position: relative;

    .date-trigger {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
    }

    .el-input__icon {
      display: none !important;
    }

    .date-shower {
      text-align: right;
      font-size: 12px;
      cursor: pointer;
    }

    .placeholder {
      color: #7a8794;
    }
  }
</style>
