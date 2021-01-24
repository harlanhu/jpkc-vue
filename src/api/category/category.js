import axios from "@/api/http";

/**
 * 获取所有类别
 */
function getAllCategory() {
  return axios.get("category/getAllCategory")
}

export default {
  getAllCategory
}
