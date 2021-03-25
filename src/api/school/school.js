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

function getByName(schoolName) {
  return axios.get(baseURL + "/getByName", {
      params: {
        schoolName
      }
  })
}

function getById(schoolId) {
  return axios.get(baseURL + "/getSchoolById/" + schoolId)
}

function getNameByResourceId(resourceId) {
  return axios.get(baseURL + "/getNameByResourceId/" + resourceId)
}

function getByPage(current, size) {
  return axios.get(baseURL + "/getAllByPage/" + current + "/" + size)
}

function getAllWithoutLayout(layoutId,current, size) {
  return axios.get(baseURL + "/getAllWithoutLayout/" + layoutId + "/" + current + "/" + size)
}

export default {
  getByTeacherId,
  getAll,
  getByCourseId,
  getCount,
  getByName,
  getNameByResourceId,
  getById,
  getByPage,
  getAllWithoutLayout
}
