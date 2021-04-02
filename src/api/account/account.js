import axios from "@/api/http";

function login(data) {
  return axios.post("/login",
      {
        username: data.username,
        password: data.password,
        verifyCode: data.verifyCode
      })
}

function logout() {
  return axios.get("/logout")
}

export default {
  login,
  logout
}
