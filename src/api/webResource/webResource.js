import axios from "@/api/http"

const baseUrl = "/website-resource"

function getWebResourceByLayoutName(layoutName) {
  return axios.get(baseUrl + "/getWebResourceByLayoutName/" + layoutName)
}

function getHomeRecommendResource(current, size) {
  return axios.get(baseUrl + "/home/getRecommendResource/" + current + "/" + size)
}

export default {
  getWebResourceByLayoutName,
  getHomeRecommendResource
}
