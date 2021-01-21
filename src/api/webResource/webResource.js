import axios from "@/api/http"

function getWebResourceByLayoutName(params) {
  return axios.get("/website-resource/getWebResourceByLayoutName",
      {params: {layoutName: params}})
}

export default {
  getWebResourceByLayoutName
}
