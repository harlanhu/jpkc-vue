import axios from "@/api/http";

function getVerifyCode() {
  return axios.get("/verifyCode/getCode", {responseType: 'blob'})
}

export default {
  getVerifyCode
}
