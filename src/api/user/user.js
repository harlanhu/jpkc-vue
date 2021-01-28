import axios from "@/api/http";

function isExistUser(userInfo) {
  return axios.get("user/isExistUser/" + userInfo)
}

function register(email, phone, password, smsVerifyCode) {
  return axios.post("/user/userRegister", {
    userEmail: email,
    userPhone: phone,
    password: password,
    smsVerifyCode: smsVerifyCode
  })
}

export default {
  isExistUser,
  register
}
