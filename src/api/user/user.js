import axios from "@/api/http";

function isExistUser(userInfo) {
  return axios.get("user/isExistUser/" + userInfo)
}

export default {
  isExistUser
}
