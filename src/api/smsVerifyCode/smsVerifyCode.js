import axios from "@/api/http";

function getSmsVerifyCode(phone) {
  return axios.get("sms/getSmsVerifyCode/" + phone)
}

export default {
  getSmsVerifyCode
}
