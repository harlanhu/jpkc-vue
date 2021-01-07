<template>
  <div id="account-info">
    <div id="logout">
      <div class="avatar">
        <avatar/>
      </div>
      <div class="login-btn">
        <el-button class="login-btn" size="small" type="success" round>登录/注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar";
export default {
  name: "AccountInfo",
  components: {
    Avatar
  }
}
</script>

<style scoped>
.login-btn {
  width: 168px;
  height: 32px;
}
</style>
