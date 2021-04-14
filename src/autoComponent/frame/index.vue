<template>
  <div class="frame">
    <div class="header">
      <div class="header-inner">
        <a href="" style="display: inline-block;height: 60px;">
          <img src="@/assets/logo.png" class="logo">
        </a>
        <el-menu
          :default-active="activeIndex"
          class="menu"
          mode="horizontal"
          background-color="#409EFF"
          text-color="white"
          active-text-color="gold">
          <template v-for="(menu, key) of items">
            <el-menu-item :key="key" :index="key + ''">
              <router-link :to="key" class="link">
                {{ menu.meta.title }}
              </router-link>
            </el-menu-item>
          </template>
        </el-menu>
        <div class="user">
          <!--        <img style="border-radius: 50%;" class="logo" :src="portrait ? getPictureUrl(portrait) :Logo"/>-->
          <el-dropdown>
            <span class="el-dropdown-link" style="color: white;cursor: pointer">
              欢迎，{{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="forgetPassword">修改密码</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="doLogout">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <router-view />
    <ac-dialog ref="forgetDialog" title="修改密码" :ok="savePassword" :auto-loading="true">
      <el-form ref="forgetForm" slot="body" :model="forget" label-width="6em">
        <el-form-item
          label="原密码"
          prop="oldPassword"
          :rules="[{ required: true, message: '请输入原密码' }]">
          <el-input v-model="forget.oldPassword"></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="newPassword"
          :rules="[{ required: true, message: '请输入新密码' }]">
          <el-input v-model="forget.newPassword" placeholder="请输入新密码，长度随便设，只要你记得住"></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="confirmPassword"
          :rules="[
            { required: true, message: '再输入一次新密码' },
            { validator: (rule, value, callback) => callback(value !== forget.newPassword ? '两次密码输入不一致，请重新输入' : undefined)}
          ]">
          <el-input v-model="forget.confirmPassword" placeholder="再输入一次新密码，要和新密码一样哟"></el-input>
        </el-form-item>
      </el-form>
    </ac-dialog>
  </div>
</template>
<script>
import { logout, name } from '@/utils/auth'
import { getAccessibleMenuMap } from '@/utils/menu'

export default {
  name: 'Frame',
  data() {
    return {
      activeIndex: '0',
      username: name() || 'nobody',
      portrait: null,
      rule: [],
      items: [],
      timer: null,
      toRunSet: [],
      remote: null,
      notice: '当前已开启外部登录，修改密码功能被禁用！',
      forget: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      }
    }
  },
  computed: {},
  methods: {
    doLogout() {
      this.$confirm('确定要退出吗？', '提示', { type: 'warning' }).then(() => {
        // this.stopBadge()
        logout()
        this.$router.push('/login')
      })
    },
    forgetPassword() {
      // if (this.remote == null) {
      //   getUserSettingApi()
      //     .then((d) => {
      //       this.remote = d.remote || false
      //       if (this.remote) {
      //         this.$alert(this.notice, '提示', { type: 'error' })
      //       } else {
      //         this.$refs.forgetDialog.open()
      //       }
      //     })
      //     .catch(() => {
      //       this.$alert('读取配置数据失败！', '提示', { type: 'error' })
      //     })
      // } else if (this.remote) {
      //   this.$alert(this.notice, '提示', { type: 'error' })
      // } else {
      //   this.$refs.forgetDialog.open()
      // }
    },
    savePassword() {
      // this.$refs.forgetForm.validate((valid) => {
      //   if (valid) {
      //     updatePasswordApi(this.forget.oldPassword, this.forget.newPassword)
      //       .then(() => {
      //         this.forget.oldPassword = null
      //         this.forget.newPassword = null
      //         this.forget.confirmPassword = null
      //
      //         this.$success('密码修改成功！')
      //         this.$refs.forgetDialog.close()
      //       })
      //   }
      // })
    },
    initMenu() {
      const accessible = getAccessibleMenuMap()
      // console.log('menu:', MENU, accessible)
      this.items = Object.assign({}, accessible)
      // MENU.filter(s => accessible['/' + s.link])
      //   .map(s => {
      //     console.log('ssssss', s)
      //     return {
      //       name: s.name,
      //       link: s.link
      //     }
      //   })
      this.selectMenuByRoute()
    },
    selectMenuByRoute() {
      setTimeout(() => {
        const path = this.$route.path
        for (const key in this.items) {
          if (path.indexOf(key) === 0) {
            this.activeIndex = key + ''
          }
        }
      }, 100)
    }
  },
  mounted() {
    this.initMenu()
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" lang="scss" scoped>
  @import "../../styles/mixin.scss";

  .frame {
    height: 100%;
    .header {
      position: relative;
      z-index: 100;
      background: #409EFF;
      background-size: 100% 100%;
      margin-bottom: 10px;
      @include wh(100%, 60px);
      left: 0;
      top: 0;

      .header-inner {
        max-width: 1420px;
        margin: 0 auto;
      }
    }

    .logo {
      height: 100%;
      padding: 12px;
    }

    .link {
      /*color: #eee;*/
      display: block;
      font-weight: bold;
      @include wh(100%, 100%);
      font-size: 15px;
    }

    .link.router-link-exact-active.router-link-active {
      color: gold !important;
    }

    .menu {
      display: inline-block;
    }

    .user {
      display: inline-block;
      height: 100%;
      float: right;
      line-height: 60px;
      margin-right: 20px;
    }

    .el-dropdown-link:hover {
      color: #ffffff8c !important;
    }

    .el-menu-item {
      padding: 0;
    }

    .link {
      padding: 0 20px;
    }
  }
</style>
