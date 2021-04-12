<template>
  <div id="user-info">
    <el-dialog title="短信验证" :visible.sync="dialogShow" width="30%" center>
      <div style="text-align: center">
        验证码  <el-input v-model="verifyCode" style="width: 100px"></el-input>
        <el-button style="margin-left: 30px" @click="verifyPhone" type="info" plain>发送验证码</el-button>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button @click="verifyPhoneCode" style="width: 200px" type="primary">验证</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="passwordDialogShow" width="30%" center>
      <div style="text-align: center">
        <div v-if="isTruePassword">
          新密码:  <el-input v-model="newPassword" style="width: 300px"></el-input>
        </div>
        <div v-else>
          原密码:  <el-input v-model="newPassword" style="width: 300px"></el-input>
          <el-button style="margin-left: 30px" @click="verifyPassword" type="info" plain>验证</el-button>
        </div>
      </div>
      <div v-if="isTruePassword" style="text-align: center; margin-top: 20px">
        <el-button @click="updatePassword" style="width: 200px" type="primary">修改</el-button>
      </div>
    </el-dialog>
    <el-dialog title="邮箱验证" :visible.sync="mailDialShow" width="30%" center>
      <div style="text-align: center">
        验证码  <el-input v-model="verifyCode" style="width: 100px"></el-input>
        <el-button style="margin-left: 30px" @click="verifyMail" type="info" plain>发送验证码</el-button>
      </div>
      <div style="text-align: center; margin-top: 20px">
        <el-button @click="verifyEmailCode" style="width: 200px" type="primary">验证</el-button>
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
        <el-button style="margin-left: 30px" @click="mailEdit" type="info" plain>{{inputStatus.email === true ? "修改" : "立即验证"}}</el-button>
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
      <el-form-item label="生日">
        <el-date-picker style="width: 300px" type="date" placeholder="选择日期" v-model="userInfo.userBirthday"></el-date-picker>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="userInfo.userDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="showPassword" type="primary">修改密码</el-button>
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
      mailDialShow: false,
      passwordDialogShow: false,
      verifyCode: "",
      newPassword: "",
      isTruePassword: false
    }
  },
  methods: {
    getUser() {
      this.$api.user.getByUser()
      .then(res => {
        this.userInfo = res.data
      })
    },
    phoneEdit() {
      this.dialogShow = true
    },
    mailEdit() {
      this.mailDialShow = true
    },
    verifyPhone() {
      this.sendPhoneCode(this.userInfo.userPhone)
    },
    verifyMail() {
      this.sendMailCode(this.userInfo.userEmail)
    },
    sendMailCode(mail) {
      if (this.inputStatus.updateEmail) {
        this.$api.user.getMailVerify(mail)
        .then(res => {
          this.$message.info(res.message)
        })
      } else {
        this.$api.user.sendMailVerifyCode()
        .then(res => {
          this.$message.info(res.message)
        })
      }
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
    verifyEmailCode() {
      if (this.verifyCode === "") {
        this.$message.error("请输入验证码")
      } else {
        if (this.inputStatus.updateEmail) {
          this.$api.user.updateMail(this.userInfo.userEmail, this.verifyCode)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message)
                  this.inputStatus.email = !this.inputStatus.email
                  this.verifyCode = ""
                  this.mailDialShow = false
                  this.inputStatus.updateEmail = false
                  this.getUser()
                }
              })
        } else {
          this.$api.user.verifyMailCode(this.verifyCode)
              .then(res => {
                if (res.status === 200) {
                  this.$message.success(res.message)
                  this.inputStatus.email = !this.inputStatus.email
                  this.verifyCode = ""
                  this.mailDialShow = false
                  this.inputStatus.updateEmail = true;
                } else {
                  this.verifyCode = ""
                  this.$message.error(res.message)
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
      this.$api.user.update({
        userDesc: this.userInfo.userDesc,
        userSex: this.userInfo.userSex,
        username: this.userInfo.username,
        userBirthday: this.userInfo.userBirthday
      })
      .then(res => {
        this.$message.info(res.message)
        this.getUser()
      })
    },
    updatePassword() {
      if (this.newPassword === "") {
        this.$message.warning("输入内容不能为空！")
      } else {
        this.$api.user.updatePassword(this.newPassword)
        .then(res => {
          if (res.status === 200) {
            this.$message.success("修改成功")
            this.newPassword = ""
            this.passwordDialogShow = false
          } else {
            this.$message.error("修改失败，请稍后重试")
          }
        })
      }
    },
    verifyPassword() {
      if (this.newPassword === "") {
        this.$message.warning("输入内容不能为空！")
      } else {
        this.$api.user.verifyPassword(this.newPassword)
        .then(res => {
          if (res.status === 200) {
            this.isTruePassword = true
            this.newPassword = ""
          } else {
            this.$message.warning("密码错误！请重新输入！")
          }
        })
      }
    },
    showPassword() {
      this.passwordDialogShow = true
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
.el-form {
  margin-top: 20px;
}

span {
  margin-bottom: 5px;
}
</style>
