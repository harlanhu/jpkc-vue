import {get} from "@/api/http";

/**
 * 数据请求唯一入口
 */
export function getAllCategory() {
  return get("/roles", null);
}
