import axios from "@/api/http";

const baseUrl = "/teacher"

function getOneByCourseId(courseId) {
  return axios.get(baseUrl + "/getOneByCourseId/" + courseId)
}

function getOneById(teacherId) {
  return axios.get(baseUrl + "/getOneById/" + teacherId)
}

function getAll(current, size) {
  return axios.get(baseUrl + "/getAll/" + current + "/" + size)
}

export default {
  getOneByCourseId,
  getOneById,
  getAll,
}
