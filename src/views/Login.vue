<template>
  <div id="login">
    <div class="login-form">
      <div class="form">
        <el-form label-width="80px">
          <el-form-item label="账号">
            <el-input placeholder="用户名/手机/邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" placeholder="密码"></el-input>
          </el-form-item>
          <div style="text-align: center">
            <el-button style="width: 200px" type="primary">登录</el-button>
            <el-button style="float: right" type="text">立即注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>
.login-form {
  float: right;
  margin-top: 50px;
  margin-right: 200px;
  width: 500px;
  height: 300px;
  background-color: #fff;
  border-radius: 8px;
}

.form {
  margin: 60px 50px auto 20px;
}
</style>
