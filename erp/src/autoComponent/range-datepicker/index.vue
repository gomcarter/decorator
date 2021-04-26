<template>
  <div class="custom-range-date-picker">
    <el-date-picker
      v-model="selfValue"
      type="daterange"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      :picker-options="DATE_QUICK_SELECTIONS"
      size="medium"
    >
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
  name: 'RangeDatepicker',
  props: {
    value: null
  },
  data() {
    return {
      selfValue: (this.value && this.value.start && this.value.end) ? [this.value.start, this.value.end] : [],
      DATE_QUICK_SELECTIONS: {
        shortcuts: [{
          text: '今天',
          onClick: (picker) => {
            picker.$emit('pick', [Date.now(), Date.now()])
          }
        }, {
          text: '昨天',
          onClick: (picker) => {
            const date = Date.now() - 3600 * 24 * 1000
            picker.$emit('pick', [date, date])
          }
        }, {
          text: '本周',
          onClick: (picker) => {
            const date = new Date()
            // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
            const weekday = date.getDay() || 7
            date.setDate(date.getDate() - weekday + 1)
            picker.$emit('pick', [date, Date.now()])
          }
        }, {
          text: '本月',
          onClick: (picker) => {
            const date = new Date()
            date.setDate(1)
            picker.$emit('pick', [date, Date.now()])
          }
        }, {
          text: '上月',
          onClick: (picker) => {
            const end = new Date()
            end.setDate(0)

            const start = new Date()
            start.setDate(0)
            start.setDate(1)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '本年',
          onClick: (picker) => {
            const date = new Date()
            date.setDate(1)
            date.setMonth(0)
            picker.$emit('pick', [date, Date.now()])
          }
        }]
      }
    }
  },
  watch: {
    value() {
      if (this.value.start === this.selfValue[0] && this.value.end === this.selfValue[1]) {
        return
      }
      this.selfValue = (this.value && this.value.start && this.value.end) ? [this.value.start, this.value.end] : []
    },
    selfValue() {
      const start = new Date(new Date(this.selfValue[0]).format('yyyy-MM-dd 00:00:00')).getTime()
      const end = start + 86400000
      if (!this.value) {
        this.$emit('input', { start, end })
      } else {
        this.value.start = start
        this.value.end = end
      }
    }
  }
}
</script>

<style lang="scss">
  .custom-range-date-picker {
    position: relative;
    display: inline-block;
  }
</style>
