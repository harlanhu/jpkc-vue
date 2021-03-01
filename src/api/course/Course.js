import axios from "@/api/http";

const baseUrl = "/course"

function getCourseById(courseId) {
  return axios.get(baseUrl + "/getCourseById/" + courseId)
}

function getRanking(current, size) {
  return axios.get(baseUrl + "/getRanking/" + current + "/" + size)
}

function getNew(current, size) {
  return axios.get(baseUrl + "/getNew/" + current + "/" + size)
}

function getStar(current, size) {
  return axios.get(baseUrl + "/getStar/" + current + "/" +size)
}

function getBySchoolId(schoolId, current, size) {
  return axios.get(baseUrl + "/getBySchoolId/" + schoolId +"/"+ current + "/" + size)
}

function getByUserId(userId, current, size) {
  return axios.get(baseUrl + "/getCourseByUserId/" + userId)
}

export default {
  getCourseById,
  getRanking,
  getNew,
  getStar,
  getBySchoolId,
  getByUserId
}
