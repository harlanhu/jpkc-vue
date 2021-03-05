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

function save(course, logoFile, categoryId, labelNames) {
  const formData = new FormData()
  formData.append("logoFile", logoFile)
  formData.append("courseJsonStr", JSON.stringify(course))
  formData.append("categoryId", categoryId)
  formData.append("labelNames", JSON.stringify(labelNames))
  return axios.post(baseUrl + "/create", formData)
}

function uploadLogo(courseId, logoFile) {
  const formData = new FormData()
  formData.append("logoFile", logoFile)
  return axios.post(baseUrl + "/uploadLogo/" + courseId, formData)
}

function getByName(courseName) {
  return axios.post(baseUrl + "/getByName", courseName)
}

export default {
  getCourseById,
  getRanking,
  getNew,
  getStar,
  getBySchoolId,
  getByUserId,
  save,
  uploadLogo,
  getByName
}
