import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home";
const Register = () => import("@/views/Register");
const Login = () => import("@/views/Login");
const School = () => import("@/views/School");
const SchoolOfOne = () => import("@/views/SchoolOfOne");

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/school',
    component: School,
  },
  {
    path: '/school/:school',
    component: SchoolOfOne
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
