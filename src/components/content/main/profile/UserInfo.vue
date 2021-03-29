<template>
  <div id="user-info">
    <el-dialog title="信息验证" :visible.sync="dialogShow" width="30%" center>
      <div style="text-align: center">
        验证码  <el-input v-model="verifyCode" style="width: 100px"></el-input>
        <el-button style="margin-left: 30px" @click="verifyPhone" type="info" plain>发送验证码</el-button>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button @click="verifyPhoneCode" style="width: 200px" type="primary">验证</el-button>
      </div>
    </el-dialog>
    <el-form ref="form" :model="userInfo" label-width="80px">
      <el-form-item label="用户名">
        <el-input style="width: 300px" v-model="userInfo.username"></el-input>
        <el-tag style="float: right; margin-right: 30px" :type="userStatus.type">{{userStatus.message}}</el-tag>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar style="float: left" shape="square" :size="100" fit="fit" :src="userInfo.userAvatar"/>
        <image-upload style="float: left; margin-left: 20px" :src="userInfo.userAvatar" @imageUpload="uploadAvatar"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input style="width: 300px" :disabled="inputStatus.email" v-model="userInfo.userEmail"></el-input>
        <el-button style="margin-left: 30px" type="info" plain>{{inputStatus.email === true ? "修改" : "立即验证"}}</el-button>
      </el-form-item>
      <el-form-item label="电话">
        <el-input style="width: 300px" :disabled="inputStatus.phone" v-model="userInfo.userPhone"></el-input>
        <el-button style="margin-left: 30px" type="info" @click="phoneEdit" plain>{{inputStatus.phone === true ? "修改" : "立即验证"}}</el-button>
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
      <el-form-item>
        <el-button @click="updateUser" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <span style="color: #999; float: right">信息更新时间:{{userInfo.userUpdate}}</span>
    <span style="color: #666; float: right; margin-right: 30px">上次登录时间:{{userInfo.userLogin}}</span>
  </div>
</template>

<script>
import ImageUpload from "@/components/common/ImageUpload";
export default {
  name: "UserInfo",
  components: {ImageUpload},
  data() {
    return {
      userInfo: {},
      inputStatus: {
        phone: true,
        updatePhone: false,
        email: true,
        updateEmail: false
      },
      dialogShow: false,
      verifyCode: ""
    }
  },
  methods: {
    getUser() {
      this.$api.user.getByUser()
      .then(res => {
        this.userInfo = res.data
        console.log(res.data)
      })
    },
    phoneEdit() {
      this.dialogShow = true
    },
    verifyPhone() {
      this.sendPhoneCode(this.userInfo.userPhone)
    },
    sendPhoneCode(phone) {
      if (this.inputStatus.updatePhone) {
        this.$api.smsVerifyCode.getSmsVerifyCode(phone)
        .then(res => {
          this.$message.info(res.message)
        })
      } else {
        this.$api.user.sendPhoneCodeByUser()
            .then(res => {
              this.$message.info(res.data)
            })
      }
    },
    verifyPhoneCode() {
      if (this.verifyCode === "") {
        this.$message.error("请输入验证码")
      } else {
        if (this.inputStatus.updatePhone) {
          this.$api.user.updatePhone(this.userInfo.userPhone, this.verifyCode)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message)
                  this.inputStatus.phone = !this.inputStatus.phone
                  this.verifyCode = ""
                  this.dialogShow = false
                  this.inputStatus.updatePhone = false
                  this.getUser()
                }
              })
        } else {
          this.$api.user.verifyCode(this.verifyCode)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.data)
                  this.inputStatus.phone = !this.inputStatus.phone
                  this.verifyCode = ""
                  this.dialogShow = false
                  this.inputStatus.updatePhone = true;
                } else {
                  this.verifyCode = ""
                  this.$message.error(res.data)
                }
              })
        }
      }
    },
    uploadAvatar(raw) {
      this.$api.user.uploadAvatar(raw)
      .then(res => {
        if (res.status === 200) {
          this.getUser();
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateUser() {
      this.$api.user.updateUser()
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
