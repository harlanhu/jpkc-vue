import axios from "axios";
import qs from 'qs';
import {Message} from "element-ui";

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
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8;multipart/form-data'
axios.defaults.transformRequest = data => qs.stringify(data)

/**
 * 设置请求拦截器
 */
axios.interceptors.request.use(config => {
  //携带token
  let token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
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
  return /^(2|3)\d{2}$/.test(status)
}

/**
 * 响应拦截器
 */
axios.interceptors.response.use(response => {
  return response.data
}, error => {
  let {response} = error
  let message = response.data.message
  if (response) {
    getErrorMessage(message)
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

/**
 * get请求
 * @param url 请求地址
 * @param params 参数
 * @return 结果
 */
export function get(url, params) {
  return new Promise(((resolve, reject) => {
    axios.get(url, {params: params})
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err.data)
    })
  }))
}

export function post(url, params) {
  return axios.post(url, params)
}

