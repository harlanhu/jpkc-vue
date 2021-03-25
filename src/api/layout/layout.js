import axios from "@/api/http";

const baseUrl = "/website-layout"

function getAll() {
  return axios.get(baseUrl + "/getAll")
}

function getSchool() {
  return axios.get(baseUrl + "/getSchool")
}

function getById(layoutId, current, size) {
  return axios.get(baseUrl + "/getById/" + layoutId + "/" + current + "/" + size)
}

function bindCourse(layoutId, courseId) {
  return axios.get(baseUrl + "/bindCourse/" + layoutId + "/" + courseId)
}

function bindSchool(layoutId, schoolId) {
  return axios.get(baseUrl + "/bindSchool/" + layoutId + "/" + schoolId)
}

function getCarousel(current, size) {
  return axios.get(baseUrl + "/getCarousel/" + current + "/" + size)
}

function getAdvertising(current, size) {
  return axios.get(baseUrl + "/getAdvertising/" + current + "/" + size)
}

export default {
  getAll,
  getSchool,
  getById,
  bindSchool,
  bindCourse,
  getCarousel,
  getAdvertising
}
