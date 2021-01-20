<template>
  <div id="login-dialog">
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="560px"
        center>
      <div v-if="loginMethodState === 0">
        <h1>二维码登录</h1>
      </div>
      <div v-else>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">邮箱登录</el-menu-item>
          <el-menu-item index="2">手机号登录</el-menu-item>
          <el-menu-item index="3">学生号登录</el-menu-item>
        </el-menu>
        <div class="sms-verify" v-show="activeIndex === '2'">
          <span><i class="el-icon-mobile"/>短信快捷登录</span>
        </div>
        <div class="form-content">
          <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-form"
                   :hide-required-asterisk="true">
            <el-form-item label="账号" label-width="50px" prop="username">
              <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="邮箱/手机/用户名"
                        clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="50px" prop="pass">
              <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="请输入密码" show-password
                        clearable></el-input>
            </el-form-item>
            <el-form-item label-width="0px">
              <el-button class="submit" type="primary" @click="submitForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
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
  data() {
    return {
      centerDialogVisible: false,
      loginMethodState: 0,
      activeIndex: '1',
      loginForm: {
        pass: '',
        username: '',
      },
      rules: {
        username: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {pattern: "^[a-zA-Z][a-zA-Z0-9_]{3,15}$", message: '用户名格式不正确', trigger: "blur"}
        ],
        pass: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$", message: '密码格式不正确', trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    changeLoginMethod(state) {
      this.loginMethodState = state
    },
    handleSelect(key) {
      this.activeIndex = key
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("done!")
        } else {
          alert("failed!")
          return false
        }
      })
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
  width: 100%;
  text-align: right;
}

.form-content {
  width: 360px;
  margin-top: 20px;
  text-align: center;
  margin-left: 60px;
}

.submit {
  width: 100%;
}
</style>
