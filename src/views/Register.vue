<template>
  <div id="register">
    <div class="content">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写帐号密码"></el-step>
        <el-step title="验证手机号码"></el-step>
        <el-step title="完成注册"></el-step>
      </el-steps>
      <el-alert v-show="errorMessage !== ''" :title="errorMessage" @close="clearErrorMessage" type="error" center
                show-icon/>
      <div class="form-content">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px"
                 class="registerForm">
          <div v-if="active === 0" class="email">
            <el-form-item label-width="0px" prop="email">
              <el-input type="text"
                        v-model="registerForm.email"
                        autocomplete="off"
                        placeholder="请输入邮箱地址"
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
          </div>
          <div v-if="active === 1">
            <div class="tip">为了确保帐号安全，您的手机号码将作为该帐号的安全手机。安全手机可用于找回密码、修改密保等操作。</div>
            <el-form-item label-width="0px" prop="phone">
              <el-input type="text"
                        v-model="registerForm.phone"
                        autocomplete="off"
                        placeholder="请输入手机号码"
                        maxlength="11"
                        clearable/>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="smsBtnActive">
                <div class="transition-box">
                  <el-form-item label-width="0px" prop="smsVerifyCode">
                    <el-input type="text"
                              v-model="registerForm.smsVerifyCode"
                              autocomplete="off"
                              placeholder="请输入验证码"
                              maxlength="4"
                              clearable/>
                  </el-form-item>
                  <el-button :disabled="smsBtnDisabled" @click="getSmsVerifyCode">{{smsBtnContent}}</el-button>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </el-form>
      </div>
      <div class="next-button">
        <el-button @click="next">{{btnContent}}</el-button>
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
                if (res.status === 400) {
                  callback(new Error(res.message))
                } else {
                  callback()
                }
              })
        }
      }
    }

    let phoneValidator = (rule, value, callback) => {
      if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
        callback(new Error("请填写正确的手机号!"))
      } else {
        this.$api.user.isExistUser(value)
            .then(res => {
              if (res.status === 400) {
                this.smsVerifyCode = ''
                this.smsBtnActive = false
                callback(new Error(res.message))
              } else {
                this.smsBtnActive = true
                callback()
              }
            })
      }
    }

    return {
      active: 0,
      errorMessage: "",
      smsBtnActive: false,
      isFirstGetCode: true,
      smsBtnDisabled: false,
      sendSmsTime: 61,
      registerForm: {
        email: '',
        password: '',
        phone: '',
        smsVerifyCode: '',
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
        ],
        smsVerifyCode: [
          {required: true, message: '验证码不能为空', trigger: 'blur'},
          {pattern: "^[0-9]{4}$", message: "请输入正确的验证码", trigger: 'blur'}
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
        if (this.active === 0) {
          if (valid) {
            if (this.registerForm.isAllowedClause) {
              this.errorMessage = ''
              this.active++
            } else {
              this.errorMessage = "请勾选同意条款"
            }
          } else {
            this.errorMessage = "请填写正确的信息"
          }
        } else if (this.active === 1) {
          if (valid) {

          }
        }
      })
    },
    getSmsVerifyCode() {
      this.isFirstGetCode = false
      this.$api.smsVerifyCode.getSmsVerifyCode(this.registerForm.phone)
          .then(res => {
            console.log(res.message)
            this.sendSmsVerifyTimeOn()
          })
    },
    sendSmsVerifyTimeOn() {
      let timer = setInterval(() => {
        this.smsBtnDisabled = true
        console.log(this.sendSmsTime)
        if (this.sendSmsTime > 0) {
          this.sendSmsTime --
        }else {
          this.sendSmsTime = 61
          this.smsBtnDisabled = false
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  computed: {
    btnContent() {
      switch (this.active) {
        case 0:
          return "下一步"
        case 1:
          return "立即验证"
      }
    },
    smsBtnContent() {
      if (this.isFirstGetCode) {
        return "获取验证码"
      }else if (this.sendSmsTime <= 60) {
        return "重新发送(" + this.sendSmsTime + "秒)"
      } else {
        return "重新发送"
      }
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

.tip {
  color: #333;
  font-size: 14px;
  background-color: #f8f8f8;
  padding: 5px 12px;
  border-radius: 4px;
  line-height: 24px;
  margin-bottom: 40px;
}
</style>
