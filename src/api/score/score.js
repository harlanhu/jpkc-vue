import axios from "@/api/http"

const baseUrl = "/score"

function exist(courseId) {
  return axios.get(baseUrl + "/exist/" + courseId)
}

function getByCourseId(courseId) {
  return axios.get(baseUrl + "/getByCourseId/" + courseId)
}

function getExel(courseId) {
  return "http://localhost:8088" + baseUrl + "/getExelByCourseId/" + courseId
}

export default {
  exist,
  getByCourseId,
  getExel
}
