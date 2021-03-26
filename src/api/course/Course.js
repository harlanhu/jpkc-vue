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

function getAll(current, size) {
  return axios.get(baseUrl + "/getAllOpen/" + current + "/" + size)
}

function update(course) {
  return axios.post(baseUrl + "/update", {
    courseId: course.courseId,
    courseStatus: course.courseStatus
  })
}

function getAboutByCategoryId(categoryId) {
  return axios.get(baseUrl + "/getAboutByCategoryId/" + categoryId)
}

function addViews(courseId) {
  return axios.get(baseUrl + "/addViews/" + courseId)
}

function collect(courseId) {
  return axios.get(baseUrl + "/collect/" + courseId)
}

function getCollect(current, size) {
  return axios.get(baseUrl + "/getCollectByUser/" + current + "/" + size)
}

function getOpenByType(current, size, type) {
  return axios.get(baseUrl + "/getOpenByType/" + current + "/" + size  + "/" + type)
}

function getOpenByTypeAndCategory(current, size, type, categoryId) {
  return axios.get(baseUrl + "/getOpenByTypeAndCategory/" + current + "/" + size + "/" + type + "/" + categoryId)
}

function getOpenByTypeAndSchool(current, size, type, schoolId) {
  return axios.get(baseUrl + "/getOpenByTypeAndSchool/" + current + "/" + size + "/" + type + "/" + schoolId)
}

function getRecommend(current, size) {
  return axios.get(baseUrl + "/getRecommend/" + current + "/" + size)
}

function getSearchData(keyWords, current, size) {
  return axios.post(baseUrl + "/search/" + current + "/" + size, {
    keyWords: keyWords
  })
}

function deleteById(courseId) {
  return axios.get(baseUrl + "/delete/" + courseId)
}

function getWithoutLayout(layoutId, current, size) {
  return axios.get(baseUrl + "/getWithoutLayout/" + layoutId + "/" + current + "/" + size)
}

function getByTeacherId(teacherId, current, size) {
  return axios.get(baseUrl + "/getByTeacherId/" + teacherId + "/" + current + "/" +size)
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
  getByName,
  getAll,
  update,
  getAboutByCategoryId,
  addViews,
  collect,
  getCollect,
  getOpenByType,
  getOpenByTypeAndCategory,
  getOpenByTypeAndSchool,
  getRecommend,
  getSearchData,
  getWithoutLayout,
  deleteById,
  getByTeacherId
}
