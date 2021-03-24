import axios from "@/api/http";

const baseUrl = "/website-layout"

function getAll() {
  return  axios.get(baseUrl + "/getAll")
}

export default {
  getAll
}
