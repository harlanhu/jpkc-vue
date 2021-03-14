import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home";

const CourseManage = () => import("@/views/CourseManage");
const CourseDetail = () => import("@/views/CourseDetail")
const Register = () => import("@/views/Register");
const Login = () => import("@/views/Login");
const School = () => import("@/views/School");
const SchoolOfOne = () => import("@/views/SchoolOfOne");
const Course = () => import("@/views/Course");
const CourseAdd = () => import("@/components/content/main/courseManage/CourseAdd");
const CourseList = () => import("@/components/content/main/courseManage/CourseList");
const CourseEdit = () => import("@/components/content/main/courseManage/CourseEdit");
const CourseData = () => import("@/components/content/main/courseManage/CourseData");
const CourseDetails = () => import("@/components/content/main/courseManage/CourseDetails");
const LiveOrder = () => import("@/components/content/main/courseManage/CourseLiveOrder");

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
  },
  {
    path: '/course-manage',
    component: CourseManage,
    children: [
      {
        path: "/",
        components: {
          courseManage: CourseList
        }
      },
      {
        path: 'all',
        components: {
          courseManage: CourseList
        }
      },
      {
        path: 'add',
        components: {
          courseManage: CourseAdd
        }
      },
      {
        path: 'edit/:courseId',
        components: {
          courseManage: CourseEdit
        }
      },
      {
        path: 'details/:courseId',
        components: {
          courseManage: CourseDetails
        }
      },
      {
        path: 'data',
        components: {
          courseManage: CourseData
        }
      },
      {
        path: 'live-order',
        components: {
          courseManage: LiveOrder
        }
      }
    ]
  },
  {
    path: '/course',
    component: Course,
  },
  {
    path: '/courseDetail',
    name: 'courseDetail',
    component: CourseDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

/**
 * 路由前将数据保存
 */
router.beforeEach(((to, from, next) => {
  localStorage.setItem("routerParams", JSON.stringify(to.params));
  next()
}))

export default router
