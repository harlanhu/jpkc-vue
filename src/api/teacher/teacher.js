import axios from "@/api/http";

const baseUrl = "/teacher"

function getOneByCourseId(courseId) {
  return axios.get(baseUrl + "/getOneByCourseId/" + courseId)
}

export default {
  getOneByCourseId
}
