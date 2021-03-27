<template>
  <div id="login">
    <div class="login-form">
      <div class="form">
        <el-form label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="userInfo.username" placeholder="用户名/手机/邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userInfo.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input style="width: 100px" v-model="userInfo.verifyCode" placeholder="验证码"></el-input>
            <img style="margin-left: 20px; height: 40px; border-radius: 4px" :src="verifyImage" @click="getVerifyCode" alt="点击刷新"/>
          </el-form-item>
          <div style="text-align: center">
            <el-button @click="login" style="width: 200px" type="primary">登录</el-button>
            <el-button @click="register" style="float: right" type="text">立即注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
        verifyCode: "",
      },
      verifyImage: "",
    }
  },
  methods: {
    login() {
      this.$api.account.login(this.userInfo)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('accountInfo', JSON.stringify(res.data))
          this.$store.commit('setAccount', res.data)
          this.$router.push("/home")
        } else {
          this.userInfo.verifyCode = ""
          this.getVerifyCode()
          this.$message.error(res.data.message)
        }
      })
    },
    getVerifyCode() {
      this.$api.verifyCode.getVerifyCode()
      .then(res => {
        this.verifyImage = window.URL.createObjectURL(res)
      })
    },
    register() {
      this.$router.push("/register")
    }
  },
  created() {
    this.getVerifyCode()
  }
}
</script>

<style scoped>
.login-form {
  float: right;
  margin-top: 50px;
  margin-right: 200px;
  width: 500px;
  height: 320px;
  background-color: #fff;
  border-radius: 8px;
}

.form {
  margin: 60px 50px auto 20px;
}
</style>
