<template>
  <div id="login-dialog">
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="560px"
        center>
      <div v-if="loginMethodState === 0">

      </div>
      <div v-else>
        <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form">
          <el-form-item label="账号" prop="username">
            <el-input type="username" v-model="loginForm.username" auto-complete="off" placeholder="邮箱/手机/用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
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
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入账号"))
      } else {
        if (this.loginForm.checkUsername !== '') {
          this.$refs.ruleForm.validateField('checkUsername')
        }
        callback()
      }
    }

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入密码"))
      } else {
        if (this.loginForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    return {
      centerDialogVisible: false,
      loginMethodState: 0,
      loginForm: {
        pass: '',
        checkPass: '',
        username: '',
        checkUsername: '',
      },
      rules: {
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    changeLoginMethod(state) {
      this.loginMethodState = state
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
.dialog-footer {
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
</style>
