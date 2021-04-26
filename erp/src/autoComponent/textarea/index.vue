<template>
  <div class="textarea-container">
    <div v-for="(p, i) of params" :key="'textarea_' + i" class="textarea-every">
      <span class="delete-btn el-icon-error" @click="del(i)"></span>
      <div class="toolbar line">
        <el-color-picker v-model="p.color" size="mini"></el-color-picker>
        <el-color-picker v-model="p.background" size="mini"></el-color-picker>
        <el-popover class="option" placement="top" title="显示" width="200"
                    trigger="focus" v-model="p.displayVisible">
          <el-radio v-model="p.display" label="block">行</el-radio>
          <el-radio v-model="p.display" label="inline-block">块</el-radio>
          <el-button slot="reference" size="mini" @click="p.displayVisible = !p.displayVisible" icon="el-icon-view"
                     circle></el-button>
        </el-popover>
        <el-popover class="option" placement="top" title="字体大小" width="200"
                    trigger="focus" v-model="p.sizeVisible">
          <el-slider :min="12" :max="375" :step="1" v-model="p.size"></el-slider>
          <el-button slot="reference" size="mini" @click="p.sizeVisible = !p.sizeVisible" icon="el-icon-menu"
                     circle></el-button>
        </el-popover>
        <el-popover class="option" placement="top" title="行距" width="200"
                    trigger="focus" v-model="p.lineHeightVisible">
          <el-slider :min="22" :max="375" :step="1" v-model="p.lineHeight"></el-slider>
          <el-button slot="reference" size="mini" @click="p.lineHeightVisible = !p.lineHeightVisible"
                     icon="el-icon-s-fold" circle></el-button>
        </el-popover>
        <el-popover class="option" placement="top" title="排列" width="300"
                    trigger="focus" v-model="p.alignVisible">
          <el-radio v-model="p.align" label="left">靠左</el-radio>
          <el-radio v-model="p.align" label="center">居中</el-radio>
          <el-radio v-model="p.align" label="right">靠右</el-radio>
          <el-button slot="reference" size="mini" @click="p.alignVisible = !p.alignVisible"
                     icon="el-icon-s-operation" circle></el-button>
        </el-popover>
        <el-popover class="option" placement="top" title="内边距" width="300"
                    trigger="focus" v-model="p.paddingVisible">
          <el-form label-width="2em">
            <el-form-item label="上">
              <el-slider :min="0" :max="375" :step="1" v-model="p.paddingTop"></el-slider>
            </el-form-item>
            <el-form-item label="右">
              <el-slider :min="0" :max="375" :step="1" v-model="p.paddingRight"></el-slider>
            </el-form-item>
            <el-form-item label="下">
              <el-slider :min="0" :max="375" :step="1" v-model="p.paddingBottom"></el-slider>
            </el-form-item>
            <el-form-item label="左">
              <el-slider :min="0" :max="375" :step="1" v-model="p.paddingLeft"></el-slider>
            </el-form-item>
          </el-form>
          <el-button slot="reference" size="mini" @click="p.paddingVisible = !p.paddingVisible" icon="el-icon-rank"
                     circle></el-button>
        </el-popover>
      </div>
      <div class="textarea-editor-body">
        <el-input v-model="p.title" type="textarea" rows="4" resize="none" placeholder="输入文字内容"></el-input>
        <el-input placeholder="链接" v-model="p.clickUrl" size="medium" class="margint5">
          <template slot="prepend">链接</template>
        </el-input>
      </div>
    </div>
    <el-button icon="el-icon-plus" @click="add" class="margint12">加一组</el-button>
  </div>
</template>

<script>

export default {
  props: {
    params: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    add() {
      this.params.push({})
    },
    del(i) {
      this.params.splice(i, 1)
    },
    onImageChanged(a) {
      console.log(a)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  .textarea-container {
    .textarea-every {
      border: 1px dashed #DCDFE6;
      padding: 12px 12px 0 12px;
      position: relative;
    }

    .textarea-every + .textarea-every {
      border-top: 0;
    }

    .textarea-editor-body {
      display: inline-block;
      line-height: 50px;
      margin-top: 5px;
    }

    .el-button {
      width: 100%;
    }

    .delete-btn:hover {
      color: #303133;
    }

    .delete-btn {
      position: absolute;
      top: -9px;
      right: -9px;
      font-size: 20px;
      color: #30313399;
      cursor: pointer;
    }

    .option {
      display: inline-block;
    }
  }
</style>
