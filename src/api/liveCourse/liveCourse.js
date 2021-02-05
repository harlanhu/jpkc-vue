import axios from "@/api/http";

const baseUrl = "/live-course"

function getAll(current, size) {
  return axios.get(baseUrl + "/getAll/" + current + "/" + size)
}

export default {
  getAll
}
