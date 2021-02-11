import axios from "@/api/http";

const baseURL = "/school"

function getByTeacherId(teacherId) {
  return axios.get(baseURL + "/getByTeacherId/" + teacherId)
}

function getAll() {
  return axios.get(baseURL + "/getAll")
}

function getByCourseId(courseId) {
  return axios.get(baseURL + "/getByCourseId/" + courseId)
}

function getCount() {
  return axios.get(baseURL + "/getCount")
}

export default {
  getByTeacherId,
  getAll,
  getByCourseId,
  getCount
}
