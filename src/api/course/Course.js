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

function create(course) {
  return axios.post(baseUrl + "/create",{
    courseName: course.courseName,
    courseDesc: course.courseDesc,
    coursePrice: course.coursePrice,
    sectionCount: course.sectionCount,
    courseStatus: course.courseStatus,
    courseHour: course.courseHour
  })
}

function uploadLogo(courseId, logoFile) {
  const formData = new FormData()
  formData.append("logoFile", logoFile)
  return axios.post(baseUrl + "/uploadLogo/" + courseId, formData, {
    headers: {'Content-Type': 'multipart/form-data'}
  })
}

export default {
  getCourseById,
  getRanking,
  getNew,
  getStar,
  getBySchoolId,
  getByUserId,
  create,
  uploadLogo
}
