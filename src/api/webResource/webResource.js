import axios from "@/api/http"

function getWebResourceByLayoutName(layoutName, current, size) {
  return axios.get("/website-resource/getWebResourceByLayoutName/" + layoutName + "/" + current + "/" + size )
}

export default {
  getWebResourceByLayoutName
}
