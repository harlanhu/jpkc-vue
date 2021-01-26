<template>
  <div id="register">
    <div class="content">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写帐号密码"></el-step>
        <el-step title="验证手机号码"></el-step>
        <el-step title="完成注册"></el-step>
      </el-steps>
      <el-alert v-show="errorMessage !== ''" :title="errorMessage" @close="clearErrorMessage" type="error" center show-icon/>
      <div class="form-content">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
          <el-form-item v-show="active === 0" label-width="0px" prop="email">
            <el-input type="text"
                v-model="registerForm.email"
                      autocomplete="off"
                      placeholder="请输入邮箱地址"
                      clearable/>
          </el-form-item>
          <el-form-item v-show="active === 1" label-width="0px" prop="phone">
            <el-input type="text"
                      v-model="registerForm.phone"
                      autocomplete="off"
                      placeholder="请输入手机号"
                      clearable/>
          </el-form-item>
          <el-form-item label-width="0px" prop="password">
            <el-input type="password"
                      v-model="registerForm.password"
                      autocomplete="off"
                      minlength="8"
                      maxlength="16"
                      placeholder="请输入8-16位密码"
                      show-password/>
          </el-form-item>
          <el-checkbox v-model="registerForm.isAllowedClause" v-show="active === 0">同意《xxx条款》</el-checkbox>
        </el-form>
      </div>
      <div class="next-button">
        <el-button @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    let emailValidator = (rule, value, callback) => {
      if (this.active === 0) {
        if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
          callback(new Error("请填写正确的邮箱!"))
        } else {
          this.$api.user.isExistUser(value)
              .then(res => {
                if (res.status === 400){
                  callback(new Error(res.message))
                } else {
                  callback()
                }
              })
        }
      }
    }

    let phoneValidator = (rule, value, callback) => {
      if (!/^[a-zA-Z][a-zA-Z0-9_]{3,15}$/.test(value)) {
        callback(new Error("请填写正确的手机号!"))
      }else {
        this.$api.user.isExistUser(value)
            .then(res => {
              if (res.status === 400) {
                callback(new Error(res.message))
              } else {
                callback()
              }
            })
      }
    }

    return {
      active: 0,
      errorMessage: "",
      registerForm: {
        email: '',
        password: '',
        isAllowedClause: false
      },
      rules: {
        email: [
          {validator: emailValidator, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", message: '密码格式不正确', trigger: "blur"}
        ],
        phone: [
          {validator: phoneValidator, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    clearErrorMessage() {
      this.errorMessage = ''
    },
    next() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          if (this.registerForm.isAllowedClause) {
            this.errorMessage = ''
            this.active ++
          } else {
            this.errorMessage = "请勾选同意条款"
          }
        }else {
          this.errorMessage = "请填写正确的信息"
        }
      })
    }
  }
}
</script>

<style scoped>
#register {
  margin: 0 auto;
  width: 1100px;
  height: 550px;
  background-color: #fff;
}

.content {
  position: relative;
  top: 60px;
  margin: 0 auto;
  width: 650px;
}

.form-content {
  position: relative;
  top: 50px;
  margin: 0 auto;
  width: 500px;
}

.next-button {
  top: 100px;
  position: relative;
  margin: 0 auto;
  text-align: center;
}
</style>
