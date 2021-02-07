import axios from "@/api/http";

const baseURL = "/school"

function getByTeacherId(teacherId) {
  return axios.get(baseURL + "/getByTeacherId/" + teacherId)
}

export default {
  getByTeacherId
}
