import axios from "@/api/http"

const baseUrl = "/exam"

function addExam(courseId, exam) {
  return axios.post(baseUrl + "/add/" + courseId, JSON.stringify(exam))
}

function getByCourseId(courseId) {
  return axios.get(baseUrl + "/get/" + courseId)
}

function rating(courseId, answers) {
  return axios.post(baseUrl + "/rating/" + courseId, answers)
}

export default {
  addExam,
  getByCourseId,
  rating
}
