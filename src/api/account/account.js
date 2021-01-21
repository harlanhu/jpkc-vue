import axios from "@/api/http";

function login(data) {
  return axios.post("/login",
      {
        username: data.username,
        password: data.password,
        verifyCode: data.verifyCode
      })
}

export default {
  login
}
