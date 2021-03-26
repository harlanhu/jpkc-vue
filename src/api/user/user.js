import axios from "@/api/http";

const baseUrl = "/user"

function isExistUser(userInfo) {
  return axios.get("/user/isExistUser/" + userInfo)
}

function register(email, phone, password, smsVerifyCode) {
  return axios.post("/user/userRegister", {
    userEmail: email,
    userPhone: phone,
    password: password,
    smsVerifyCode: smsVerifyCode
  })
}

function getByUser() {
  return axios.get(baseUrl + "/getByUser")
}

function sendPhoneCodeByUser() {
  return axios.get(baseUrl + "/sendPhoneCodeByUser")
}

function verifyCode(code) {
  return axios.get(baseUrl + "/verifyCode/" + code)
}

export default {
  isExistUser,
  register,
  getByUser,
  sendPhoneCodeByUser,
  verifyCode
}
