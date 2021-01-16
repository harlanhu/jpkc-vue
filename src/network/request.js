import axios from "axios";
import router from "@/router";
import Element from "element-ui"

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'


//请求拦截器
axios.interceptors.request.use(config => {
  //每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header中加上token
  //即使本地存在token，也可能是过期的，所以在响应拦截器中要对返回状态进行判断
  const token = store.status.token
  token && (config.headers.Authorization = token)
  return config
}, error => {
  return Promise.error(error)
})

//响应拦截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  //当状态码不是200时
  if (error.response.status) {
    switch (error.response.status) {
      //401：未登录，跳转登录页面，并携带当前页面的路径，在登录成功后返回当前页面
      case 401:
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}
        })
        break
      //403 token过期，对用户进行提示，清除本地token，跳转登录页面
      case 403:
        localStorage.removeItem('token')
        store.commit('loginSuccess', null)
        Element.Message({
          message: error.response.message,
          type: "error",
          duration: 2 * 1000
        })
        //跳转登录特么
        setTimeout(() => {
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          }, 1000)
        })
        break
      //404 请求不存在
      case 404:
        Element.Message({
          message: error.response.message,
          type: "error",
          duration: 2 * 1000
        })
        break
      //其它错误
      default:
        Element.Message({
          message: error.response.message,
          type: "error",
          duration: 2 * 1000
        })
    }
    return Promise.reject(error.response)
  }
})

/**
 * get请求封装
 * @param url 请求地址
 * @param params 参数
 */
export function get(url, params) {
  return new Promise(((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err.message)
    })
  }))
}


export function post(url, params) {
  return new Promise(((resolve, reject) => {
    axios.post(url, params)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.message)
        })
  }))
}
