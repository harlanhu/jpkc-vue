<template>
  <div id="login-dialog">
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="560px"
        @open="openLoginDialog"
        @close="closeLoginDialog"
        center>
      <div v-if="loginMethodState === 0">
        <h1>二维码登录</h1>
      </div>
      <div v-else>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item class="login-menu" index="1">邮箱登录</el-menu-item>
          <el-menu-item class="login-menu" index="2">手机号登录</el-menu-item>
          <el-menu-item class="login-menu" index="3">学生号登录</el-menu-item>
        </el-menu>
        <el-alert v-show="errorMessage !== ''" :title="errorMessage" type="error" center show-icon></el-alert>
        <div class="sms-verify" v-show="activeIndex === '2'">
          <span><i class="el-icon-mobile"/>短信快捷登录</span>
        </div>
        <div class="form-content">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form"
                   :hide-required-asterisk="true">
            <el-form-item label-width="0px" prop="username">
              <el-input :prefix-icon="prefixIcon" type="text" v-model="loginForm.username" auto-complete="off"
                        :maxlength="maxlength"
                        :placeholder="placeholder"
                        clearable/>
            </el-form-item>
            <el-form-item label-width="0px" prop="password">
              <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" autocomplete="off"
                        maxlength="16"
                        placeholder="请输入密码" show-password
                        clearable/>
            </el-form-item>
            <el-form-item label-width="0xp" prop="verifyCode">
              <el-input style="width: 160px; float: left" placeholder="请输入验证码" type="text"
                        v-model="loginForm.verifyCode" maxlength="4h"/>
              <div style="width: 40px; height: 10px; float: left"></div>
              <img style="float: left" class="verify-code" :src="verifyCodeImage" @click="showVerifyCode" alt="加载失败">
            </el-form-item>
            <el-form-item label-width="0px">
              <el-button class="submit" type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
          <div class="login-other">
            <el-checkbox v-model="rememberMe">十天内免登录</el-checkbox>
            <el-divider direction="vertical"/>
            <el-link>忘记密码?</el-link>
            <el-divider direction="vertical"/>
            <el-link type="success">立即注册</el-link>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer div-dialog-footer">
        <div v-if="loginMethodState === 0">
          <span @click="changeLoginMethod(1)"><i class="el-icon-arrow-left"/>其他登录方式</span>
        </div>
        <div v-else>
          <span @click="changeLoginMethod(0)"><i class="el-icon-arrow-left"/>二维码登录</span>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LoginDialog",
  data: function () {
    let usernameValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("当前内容不能为空!"))
      }
      if (this.activeIndex === '1') {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
          callback(new Error("请填写正确的邮箱!"))
        } else {
          callback()
        }
      } else if (this.activeIndex === '2') {
        if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
          callback(new Error("请填写正确的手机号!"))
        } else {
          callback()
        }
      } else if (this.activeIndex === '3') {
        if (!/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(value)) {
          callback(new Error("请填写正确的账号!"))
        } else {
          callback()
        }
      }
    }

    let verifyCodeValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("验证码不能为空!"))
      }
      if (!/^[A-Za-z0-9]{4}$/.test(value)) {
        callback(new Error("请填写正确的验证码"))
      } else {
        callback()
      }
    }

    return {
      centerDialogVisible: false,
      loginMethodState: 0,
      activeIndex: '1',
      rememberMe: false,
      verifyCodeImage: '',
      errorMessage: '',
      loginForm: {
        password: '',
        username: '',
        verifyCode: ''
      },
      rules: {
        username: [
          {validator: usernameValidator, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", message: '密码格式不正确', trigger: "blur"}
        ],
        verifyCode: [
          {validator: verifyCodeValidator, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    changeLoginMethod(state) {
      this.loginMethodState = state
      this.errorMessage = ''
      if (state === 0) {
        this.$refs['loginForm'].resetFields()
      }
    },
    handleSelect(key) {
      this.$refs['loginForm'].resetFields()
      this.showVerifyCode()
      this.errorMessage = ''
      this.activeIndex = key
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.account.login(this.loginForm)
          .then(res => {
            if (res.status !== 200) {
              this.showVerifyCode()
              this.errorMessage = res.message
            } else {
              alert(JSON.stringify(res.data))
              localStorage.setItem('accountInfo', JSON.stringify(res.data))
              this.$store.commit('setAccount', res.data)
              this.centerDialogVisible = false
            }
          })
        } else {
          this.showVerifyCode()
          this.errorMessage = '请填写正确的信息'
          return false
        }
      })
    },
    closeLoginDialog() {
      if (this.loginMethodState !== 0) {
        this.errorMessage = ''
        this.$refs['loginForm'].resetFields()
      }
    },
    openLoginDialog() {
      this.showVerifyCode()
    },
    showVerifyCode() {
      this.$api.verifyCode.getVerifyCode().then(res => {
        this.verifyCodeImage = window.URL.createObjectURL(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    placeholder() {
      switch (this.activeIndex) {
        case "1":
          return "请输入个人邮箱"
        case "2":
          return "请输入手机号码"
        case "3":
          return "请输入学生账号"
        default:
          return "请输入账号"
      }
    },
    prefixIcon() {
      switch (this.activeIndex) {
        case "1":
          return "el-icon-user"
        case "2":
          return "el-icon-mobile-phone"
        case "3":
          return "el-icon-school"
        default:
          return "el-icon-user"
      }
    },
    maxlength() {
      switch (this.activeIndex) {
        case "1":
          return 32
        case "2":
          return 11
        case "3":
          return 16
        default:
          return 16
      }
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
#login-dialog {
  text-align: center;
}

.div-dialog-footer {
  background-color: #f5f5f5;
}

.div-dialog-footer {
  background-color: #f5f5f5;
}

.dialog-footer span {
  cursor: pointer;
  display: inline-block;
  color: #666;
  font-size: 14px;
  text-align: left;
  width: 100%;
}

.el-menu {
  display: flex;
}

.el-menu-item {
  flex: 1;
  text-align: center;
}

.sms-verify {
  margin-top: 10px;
  width: 85%;
  text-align: right;
}

.form-content {
  width: 360px;
  margin-top: 20px;
  text-align: center;
  margin-left: 80px;
}

.submit {
  width: 100%;
}

.login-menu {
  font-size: 20px;
  color: #999;
}

.login-other {
  font-size: 12px;
  color: #999;
}

.verify-code {
  height: 40px;
  border-radius: 4px;
}
</style>
