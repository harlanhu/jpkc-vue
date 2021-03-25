<template>
  <div id="user-info">
    <el-form ref="form" :model="userInfo" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username"></el-input>
        <el-tag :type="userStatus.type">{{userStatus.message}}</el-tag>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar shape="square" :size="100" fit="fit" :src="userInfo.userAvatar"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userInfo.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.userSex">
          <el-radio :label="0">保密</el-radio>
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker type="date" placeholder="选择日期" v-model="userInfo.userBirthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="userInfo.userDesc"></el-input>
      </el-form-item>
    </el-form>
    <span style="color: #666; margin-right: 20px">上次登录时间:{{userInfo.userLogin}}</span>
    <span style="color: #999">信息更新时间:{{userInfo.userUpdate}}</span>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    getUser() {
      this.$api.user.getByUser()
      .then(res => {
        this.userInfo = res.data
        console.log(res.data)
      })
    }
  },
  computed: {
    userStatus() {
      let status = this.userInfo.userStatus
      let data = {
        type: '',
        message: ''
      }
      if (status === 0) {
        data.message = "账号正常"
        data.type = 'success'
      } else if (status === 1) {
        data.message = "账号未激活"
        data.type = 'danger'
      } else if (status === 2) {
        data.message = "邮箱未激活"
        data.type = 'warning'
      } else if (status === 3) {
        data.message = "手机号未验证"
        data.type = 'danger'
      }
      return data
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style scoped>
</style>
