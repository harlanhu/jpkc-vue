import axios from "@/api/http"

const baseUrl = "/exam"

function addExam(courseId, exam) {
  return axios.post(baseUrl + "/add/" + courseId, JSON.stringify(exam))
}


export default {
  addExam
}
