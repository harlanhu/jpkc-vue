import axios from "@/api/http";

const baseURL = "/school"

function getByTeacherId(teacherId) {
  return axios.get(baseURL + "/getByTeacherId/" + teacherId)
}

function getAll() {
  return axios.get(baseURL + "/getAll")
}

export default {
  getByTeacherId,
  getAll
}
