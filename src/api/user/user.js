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

function uploadAvatar(raw) {
  const formData = new FormData()
  formData.append('file', raw)
  return axios.post(baseUrl + "/uploadAvatar", formData)
}

function updatePhone(phone, code) {
  return axios.get(baseUrl + "/updatePhone/" + phone + '/' + code)
}

function sendMailVerifyCode() {
  return axios.get(baseUrl + "/sendMailVerifyCode")
}

function verifyMailCode(code) {
  return axios.get(baseUrl + "/verifyMailCode/" + code)
}

function getMailVerify(mail) {
  return axios.get(baseUrl + "/getMailVerify/" + mail)
}

function updateMail(mail, code) {
  return axios.get(baseUrl + "/updateMail/" + mail + "/" + code)
}

export default {
  isExistUser,
  register,
  getByUser,
  sendPhoneCodeByUser,
  verifyCode,
  uploadAvatar,
  updatePhone,
  sendMailVerifyCode,
  verifyMailCode,
  getMailVerify,
  updateMail
}
