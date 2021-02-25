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

function getNameByResourceId(resourceId) {
  return axios.get(baseURL + "/getNameByResourceId/" + resourceId)
}

export default {
  getByTeacherId,
  getAll,
  getByCourseId,
  getCount,
  getByName,
  getNameByResourceId
}
