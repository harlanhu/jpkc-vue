import axios from "@/api/http";

/**
 * 获取验证码
 */
function getVerifyCode() {
  return axios.get("/verifyCode/getCode", {responseType: 'blob'})
}

/**
 * 校验验证码
 * @param code 验证码
 */
function isVerifyCode(code) {
  return axios.get("/verifyCode/isValidCode/" + code)
}

export default {
  getVerifyCode,
  isVerifyCode
}
