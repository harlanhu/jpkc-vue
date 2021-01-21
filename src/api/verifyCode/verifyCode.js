import axios from "@/api/http";

function getVerifyCode() {
  return axios.get("/verifyCode/getCode")
}

export default {
  getVerifyCode
}
