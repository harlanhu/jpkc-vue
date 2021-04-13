import axios from "@/api/http";

const baseUrl = "/section"

function save(section) {
  return axios.post(baseUrl + "/save/", section)
}

function uploadSectionResource(courseId, sectionId, resourceFile) {
  const formData = new FormData()
  formData.append("resourceFile", resourceFile)
  return axios.post(baseUrl + "/uploadSectionResource/" + courseId + "/" + sectionId, formData, {
    timeout: 900000
  })
}

export default {
  save,
  uploadSectionResource
}
