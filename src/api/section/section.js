import axios from "@/api/http";

const baseUrl = "/section"

function save(courseId, section) {
  const formData = new FormData();
  let fileList = []
  for (const file of section.fileList) {
    fileList.push(file.raw)
  }
  console.log(fileList)
  formData.append("sectionName", section.sectionName)
  formData.append("sectionDesc", section.sectionDesc)
  formData.append("sectionFiles", fileList)
  return axios.post(baseUrl + "/save/" + courseId, formData)
}

export default {
  save
}
