import axios from "@/api/http";

const baseUrl = "/section-comment"

function getBySectionId(sectionId, current, size, rankType) {
  return axios.get(baseUrl + "/getBySectionId/" + sectionId + "/" + current + "/" + size + "/" + rankType)
}

function save(sectionId, content, parentId) {
  return axios.post(baseUrl + "/save", {
    sectionId: sectionId,
    commentContent: content,
    parentId: parentId
  })
}

function remove(commentId) {
  return axios.get(baseUrl + "/remove/" + commentId)
}

function getByUser(current, size) {
  return axios.get(baseUrl + "/getByUser/" + current + "/" + size)
}

function like(sCommentId) {
  return axios.get(baseUrl + "/like/" + sCommentId);
}

export default {
  getBySectionId,
  save,
  remove,
  getByUser,
  like,
}
