import axios from "@/api/http";

function isExistUser(userInfo) {
  return axios.get("user/isExistUser/" + userInfo)
}

function register(email, phone, password, smsVerifyCode) {
  return axios.post("user/register")
}

export default {
  isExistUser
}
