import Vue from 'vue';
import VueRouter from 'vue-router'

import Home from "@/views/Home";
const CourseManage = () => import("@/views/CourseManage");
const CourseDetail = () => import("@/views/CourseDetail")
const Register = () => import("@/views/Register");
const Login = () => import("@/views/Login");
const School = () => import("@/views/School");
const SchoolOfOne = () => import("@/views/SchoolOfOne");
const Course = () => import("@/views/Course");
const CoursePlay = () => import("@/views/CoursePlay");
const CourseAdd = () => import("@/components/content/main/courseManage/CourseAdd");
const CourseList = () => import("@/components/content/main/courseManage/CourseList");
const CourseEdit = () => import("@/components/content/main/courseManage/CourseEdit");
const CourseData = () => import("@/components/content/main/courseManage/CourseData");
const CourseDetails = () => import("@/components/content/main/courseManage/CourseDetails");
const LiveOrder = () => import("@/components/content/main/courseManage/CourseLiveOrder");
const Profile = () => import("@/views/Profile");
const LayoutManage = () => import("@/views/LayoutManage");
const UserInfo = () => import("@/components/content/main/profile/UserInfo");
const Favorites = () => import("@/components/content/main/profile/Favorite");
const Qualification = () => import("@/components/content/main/profile/Qualification");
const Teacher = () => import("@/views/Teacher");
const TeacherOfOne = () => import("@/views/TeacherOfOne");
const LivePlay = () => import("@/views/LivePlay");

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
    path: '/courseList',
    component: Course,
  },
  {
    path: '/courseList/:categoryId',
    component: Course
  },
  {
    path: '/course/:courseId',
    component: CoursePlay
  },
  {
    path: '/courseDetail/:courseId',
    name: 'courseDetail',
    component: CourseDetail
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        path: '/',
        components: {
          profileContent: UserInfo
        }
      },
      {
        path: 'info',
        components: {
          profileContent: UserInfo
        }
      },
      {
        path: 'favorite',
        components: {
          profileContent: Favorites
        }
      },
      {
        path: 'qualification',
        components: {
          profileContent:  Qualification
        }
      }
    ]
  },
  {
    path: '/layout-manage',
    component: LayoutManage
  },
  {
    path: '/teacher',
    component: Teacher
  },
  {
    path: '/teacher/:teacherId',
    component: TeacherOfOne
  },
  {
    path: '/live-play',
    component: LivePlay
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
  next()
}))

/**
 *
 * @type {{(location: RawLocation): Promise<Route>, (location: RawLocation, onComplete?: Function, onAbort?: ErrorHandler): void}}
 */
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
