<template>
  <el-container class="app-container container-container">
    <el-aside class="left-aside">
      <div class="quick-search-wrapper">
        <el-input v-model="name" placeholder="容器名称" prefix-icon="el-icon-search" size="small"
                  @keypress.enter.native="search"></el-input>
        <el-button type="success" size="medium" @click="search">搜索</el-button>
      </div>
      <div class="padding10" style="border-bottom: 1px solid #ced0da;">
        {{ `共 ${containerCount} 个容器` }}
      </div>
      <ac-filterable-list :header="false" :datas="containerList" v-model="selected"
                          placeholder="暂无可用容器" class="container-list" :on-selection-changed="onSelectionChanged">
      </ac-filterable-list>
    </el-aside>
    <el-container class="right-aside">
      <el-header class="right-aside-header">
        <div class="container-title">{{ current.name || '容器详情' }}</div>
      </el-header>
      <el-main class="right-aside-main y-scrollbar">
        <div class="device-ios">
          <div class="device-inner y-scrollbar">
            <div class="cellphone-container">
              <draggable v-model="components" :disabled="false" :group="'components'">
                <transition-group>
                  <div v-if="components && components.length > 0" v-for="(com, index) of components"
                       :key="com.key + '_' + index" class="drag-container">
                    <el-popover
                      placement="right"
                      width="530"
                      trigger="click">
                      <ac-configuration :config="com.config" :data="com.data" :on-delete="() => onDelete(index)"
                                        :plugins="configuration[com.key].plugins"></ac-configuration>
                      <div slot="reference">
                        <component :is="'ac-' + com.key" :data="com.data" :config="com.config"></component>
                      </div>
                    </el-popover>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import configuration from '@/utils/configuration'
import draggable from 'vuedraggable'

export default {
  name: 'Container',
  data() {
    return {
      configuration,
      components: [],
      selected: undefined,
      current: {},
      name: '',
      containerList: [],
      containerCount: 0
    }
  },
  mounted() {
    window.aa = this
    // 请求病人列表
    this.requestContainer({})

    this.components.push(
      configuration['swiper'].default(),
      configuration['beans'].default(),
      configuration['images'].default(),
      configuration['text'].default()
    )
  },
  methods: {
    onDelete(index) {
      this.components.splice(index, 1)
    },
    search() {
      this.requestContainer({ name: this.name })
    },
    onSelectionChanged(node) {
      if (!node) {
        this.current = {}
        return
      }
      this.current = node
    },
    patientsParamsChanged(params) {
      this.requestContainer()
    },
    requestContainer(params) {
      this.containerList = []
      this.selected = this.containerList[0]?.id
      this.onSelectionChanged(this.containerList[0])
      this.format()
      this.containerCount = 11
    },
    format() {
      this.containerList = this.containerList.map(s => {
        s.format = () => {
          // <span>${s.createTime ? formatPatientCreateTime(s.createTime) : '-'}
          return `<div class="name">${s.name}</div>
                  <div class="status-list">
                    <span>1</span>
                    <span>2</span>
                  </div>`
        }
        return s
      })
    }
  },
  components: {
    draggable
  }
}
</script>

<style lang="scss">
  @import 'index.scss';
</style>
