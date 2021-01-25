<template>
  <div id="register">
    <div class="content">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写帐号密码"></el-step>
        <el-step title="验证手机号码"></el-step>
        <el-step title="完成注册"></el-step>
      </el-steps>
      <div class="content-input">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
          <el-form-item label-width="0px" prop="pass">
            <el-input type="text" v-model="registerForm.email" autocomplete="off" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label-width="0px" prop="checkPass">
            <el-input type="password" v-model="registerForm.password" autocomplete="off" placeholder="请输入8-16位密码" show-password></el-input>
          </el-form-item>
          <el-checkbox>用户勾选即代表同意《xxx条款》</el-checkbox>
        </el-form>
      </div>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    let emailValidator = (rule, value, callback) => {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        callback(new Error("请填写正确的邮箱!"))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      registerForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          {validator: emailValidator, trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$", message: '密码格式不正确', trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
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
</style>
