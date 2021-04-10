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

function save(teacher, avatarFile) {
  const  formData = new FormData()
  formData.append("teacherJsonStr", JSON.stringify(teacher))
  formData.append("avatarFile", avatarFile)
  return axios.post(baseUrl + "/save" , formData)
}

function isTeacher() {
  return axios.get(baseUrl + "/isTeacher")
}

function getByUser() {
  return axios.get(baseUrl + "/getByUser")
}

function getByLCourseId(lCourseId) {
  return axios.get(baseUrl + "/getByLCourseId/" + lCourseId)
}

export default {
  getOneByCourseId,
  getOneById,
  getAll,
  save,
  isTeacher,
  getByUser,
  getByLCourseId
}
