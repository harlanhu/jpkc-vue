import axios from "@/api/http";

const baseUrl = "/live-course"

function getAll(current, size) {
  return axios.get(baseUrl + "/getAll/" + current + "/" + size)
}

function save(lCourse) {
  return axios.post(baseUrl + "/create", JSON.stringify(lCourse))
}

function getByUser() {
  return axios.get(baseUrl + "/getByUser")
}

export default {
  getAll,
  save,
  getByUser
}
