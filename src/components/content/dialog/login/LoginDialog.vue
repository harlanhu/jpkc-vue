<template>
  <div id="login-dialog">
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="560px"
        center>
      <div v-if="loginMethodState === 0">
        <h1>二维码登录</h1>
      </div>
      <div v-else-if="loginMethodState === 1">
        <h1>手机登录</h1>
      </div>
      <div v-else-if="loginMethodState === 2">
        <h1>邮箱登录</h1>
      </div>
      <div v-else>
        <h1>学生号登录</h1>
      </div>
      <span slot="footer" class="dialog-footer">
        <div v-if="loginMethodState === 0">
          <span @click="changeLoginMethod(1)">其他登录方式</span>
        </div>
        <div v-else>
          <span @click="changeLoginMethod(0)">二维码登录</span>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LoginDialog",
  data() {
    return {
      centerDialogVisible: false,
      loginMethodState: 0
    }
  },
  methods: {
    changeLoginMethod(state) {
      this.loginMethodState = state
    }
  },
  mounted() {
    this.$bus.$on("activeLoginDialog", isActive => {
      this.centerDialogVisible = isActive
    })
  }
}
</script>

<style scoped>
.dialog-footer span{
  cursor: pointer;
  display: inline-block;
  color: #666;
  font-size: 14px;
  text-align: left;
}
</style>
