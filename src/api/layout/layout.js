import axios from "@/api/http";

const baseUrl = "/website-layout"

function getAll() {
  return axios.get(baseUrl + "/getAll")
}

function getSchool() {
  return axios.get(baseUrl + "/getSchool")
}

function getById(layoutId, current, size) {
  return axios.get(baseUrl + "/getById/" + layoutId + "/" + current + "/" + size)
}

export default {
  getAll,
  getSchool,
  getById
}
