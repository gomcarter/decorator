<template>
  <div class="configuration-container y-scrollbar">
    <el-form label-width="8em" style="width: 474px;">
      <el-form-item class="text-right">
        <span class="el-icon-delete delete" @click="onDelete"></span>
      </el-form-item>
      <el-form-item v-for="(c, k) of config" :label="c.title + '：'" :key="'config_input_' + k" v-if="c.type">
        <el-radio v-if="c.type === 'radio'" v-for="(v, i) of c.values" :key="k + '_radio_' + i"
                  v-model="c.default" :label="v.value"
                  :disabled="config[c.rely] ? !config[c.rely].default : false">
          {{ v.label }}
        </el-radio>
        <el-slider v-if="c.type === 'slider'" :min="c.values[0]" :max="c.values[1]" :step="c.step || 1"
                   style="width: 200px" v-model="c.default"
                   :disabled="config[c.rely] ? !config[c.rely].default : false"></el-slider>
        <el-color-picker v-if="c.type === 'color'" v-model="c.default" show-alpha
                         :disabled="config[c.rely] ? !config[c.rely].default : false"></el-color-picker>
        <el-checkbox v-if="c.type === 'checkbox'" v-model="c.default"
                     :disabled="config[c.rely] ? !config[c.rely].default : false"></el-checkbox>
        <el-input v-if="c.type === 'text'" v-model="c.default"
                  :disabled="config[c.rely] ? !config[c.rely].default : false"></el-input>
        <el-input v-if="c.type === 'textarea'" v-model="c.default" type="textarea" rows="5" resize="none"
                  :disabled="config[c.rely] ? !config[c.rely].default : false"></el-input>
      </el-form-item>
      <el-form-item v-if="!config.dynamicdata || config.dynamicdata.default === false" style="margin-left: -6em">
        <component v-if="plugins" :is="'ac-' + plugins" :params="data"></component>
      </el-form-item>
      <el-form-item v-else-if="config.dynamicdata" label="接口地址：">
        <el-input style="width: 300px" size="medium" v-model="config.dynamicdata.url"
                  placeholder="填写接口地址，数据模型如下"></el-input>
        <ac-jsonformatter :min-width="400" style="margin-left: -6em; margin-top: 1em;" :min-height="100"
                          :json="demo"></ac-jsonformatter>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    data: undefined,
    plugins: {
      type: String,
      default: ''
    },
    onDelete: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      demo: {
        code: '0 --- 0表示成功；其他表示失败',
        data: [{ title: '文字', clickUrl: '链接地址', imageUrl: '图片地址' }]
      }
    }
  },
  computed: {},
  mounted() {
    window.aaa = this
  },
  methods: {}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  .configuration-container {
    max-height: 800px;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .delete {
    font-size: 25px;
    width: 25px;
    height: 25px;
    background: white;
    opacity: 0.5;
    cursor: pointer;
  }

  .delete:hover {
    opacity: 1;
    color: red;
  }
</style>
