import axios from "axios";
import {Message} from "element-ui";
import store from "../store";

/**
 * 环境变量接口区分默认地址
 */
switch (process.env.NODE_ENV) {
  case "development":
    axios.defaults.baseURL = 'http://localhost:8080'
    break
  case "beta":
    axios.defaults.baseURL = 'http://localhost:8081'
    break
  case "production":
    axios.defaults.baseURL = 'http://47.108.151.199:8080'
    break
  default:
    axios.defaults.baseURL = 'http://localhost:8080'
}

/**
 * 设置请求超时时间
 * @type {number} 时间 / 毫秒
 */
axios.defaults.timeout = 10000

/**
 * 设置CORS跨域携带资源
 * @type {boolean} 是否允许
 */
axios.defaults.withCredentials = false

/**
 * 设置POST请求头，告知服务器请求主体数据格式
 * @type {string} application/json;charset=UTF-8;multipart/form-data
 */
//axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use(config => {
  //携带token
  // let token = store.state.token
  let  token = localStorage.getItem('accessToken')
  let kaptchaCode = store.state.kaptchaCode
  token && (config.headers.Authorization = token)
  kaptchaCode && (config.headers.KaptchaCode = kaptchaCode)
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 状态码校验
 * @param status 状态码
 * @returns {boolean} 校验结果
 */
axios.defaults.validateStatus = status => {
  //自定义响应成功HTTP状态码
  return /^(2|3|4)\d{2}$/.test(status)
}

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  if (response.headers.authorization) {
    localStorage.setItem('accessToken', response.headers.authorization)
    store.commit('setToken', response.headers.authorization)
  }
  if (response.headers.kaptchacode) {
    store.commit('setKaptchaCode', response.headers.kaptchacode)
  }
  return response.data
}, error => {
  let {response} = error
  let message = response.data.message
  if (response) {
    getErrorMessage(message)
    return response.data
  }else {
    //服务器未返回结果
    if (!window.navigator.onLine) {
      //断网处理
      Message({
        message: "网络错误，请重新刷新页面",
        type: "error",
        duration: 3 * 1000
      })
      return;
    }
    return Promise.reject(error)
  }
})

function getErrorMessage(message) {
  Message({
    message: message,
    type: "error",
    duration: 3 * 1000
  })
}

export default axios

