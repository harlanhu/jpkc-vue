import axios from "@/api/http";

const baseUrl = "/course"

function getCourseById(courseId) {
  return axios.get(baseUrl + "/getCourseById/" + courseId)
}

export default {
  getCourseById
}
