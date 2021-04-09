import axios from "@/api/http";

const baseUrl = "/live-course"

function getAll(current, size) {
  return axios.get(baseUrl + "/getAll/" + current + "/" + size)
}

function save(lCourse) {
  return axios.post(baseUrl + "/create", JSON.stringify(lCourse))
}

function getByUser() {
  return axios.get(baseUrl + "/getByUser")
}

function remove(courseId) {
  return axios.get(baseUrl + "/remove/" + courseId)
}

function getById(lCourseId) {
  return axios.get(baseUrl + "/getById/" + lCourseId)
}

function getByLiving(current, size) {
  return axios.get(baseUrl + "/getByLiving/" + current + "/" + size)
}

export default {
  getAll,
  save,
  getByUser,
  remove,
  getById,
  getByLiving
}
