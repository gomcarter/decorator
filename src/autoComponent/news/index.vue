<template>
  <div class="news-container">
    <div v-for="(p, i) of params" :key="'news_' + i" class="news-every">
      <span class="delete-btn el-icon-error" @click="del(i)"></span>
      <div class="left">
        <ac-imageuploader v-model="p.imageUrl" :width="90" :height="90"></ac-imageuploader>
      </div>
      <div class="right">
        <el-input placeholder="文字" v-model="p.title">
          <template slot="prepend">文字</template>
        </el-input>
        <el-input placeholder="链接" v-model="p.clickUrl">
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
    return {}
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
  .news-container {
    .news-every {
      border: 1px dashed #DCDFE6;
      padding: 12px 12px 0 12px;
      position: relative;
    }

    .left {
      display: inline-block;
      width: 90px;
    }

    .news-every + .news-every {
      border-top: 0;
    }

    .right {
      display: inline-block;
      width: 320px;
      vertical-align: top;
      line-height: 50px;
      margin-left: 10px;
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
  }
</style>
