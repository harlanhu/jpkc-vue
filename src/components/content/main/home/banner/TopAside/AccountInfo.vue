<template>
  <div id="account-info">
    <div id="login" v-if="isLogin">
      <div class="avatar-login">
        <avatar :src="account.avatar"/>
        <h1>{{account.username}}</h1>
      </div>

    </div>
    <div id="logout" v-else>
      <div class="title">免费学习来自名校名师的精品课程</div>
      <div class="avatar">
        <avatar/>
      </div>
      <div class="login-btn">
        <el-button @click="activeLoginDialog" class="login-btn" size="small" type="success" round>登录/注册</el-button>
      </div>
      <div class="foot-info">网易和高等教育出版社出品</div>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar";

export default {
  name: "AccountInfo",
  components: {
    Avatar
  },
  methods: {
    activeLoginDialog() {
      this.$bus.$emit("activeLoginDialog", true)
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.token !== null
    },
    account() {
      return this.$store.state.accountInfo
    }
  }
}
</script>

<style scoped>
#account-info {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 200px;
  height: 360px;
}

#account-info div {
  width: 168px;
  text-align: center;
}

.title {
  position: absolute;
  top: 24px;
  left: 14px;
  width: 160px;
  line-height: 20px;
  color: black;
  text-align: center;
  font-size: 15px;
}

.avatar {
  position: relative;
  text-align: center;
  margin-left: 18px;
}

.login-btn {
  width: 168px;
  height: 32px;
  position: relative;
  margin-left: 8px;
  margin-top: 10px;
}

.foot-info {
  text-align: center;
  font-size: 12px;
  color: rgb(153, 153, 153);
  position: absolute;
  bottom: 20px;
  font-weight: 400;
  left: 16px;
}
</style>
