import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Register from "@/views/Register";
import Login from "@/views/Login";

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
