import {get, post} from "@/network/request";

export const getAllCategory = params => get('/category/getAllCategory', params)
