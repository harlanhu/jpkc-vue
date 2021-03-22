import axios from "@/api/http";

const baseUrl = "/section-comment"

function getBySectionId(sectionId, current, size, rankType) {
  return axios.get(baseUrl + "/getBySectionId/" + sectionId + "/" + current + "/" + size + "/" + rankType)
}

function save(comment) {
  return axios.post(baseUrl + "/save", JSON.stringify(comment))
}

function remove(commentId) {
  return axios.get(baseUrl + "/remove/" + commentId)
}

function getByUser(current, size) {
  return axios.get(baseUrl + "/getByUser/" + current + "/" + size)
}

export default {
  getBySectionId,
  save,
  remove,
  getByUser
}
