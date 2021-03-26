<template>
  <div class="layout-manage">
    <layout-dialog @layoutBind="layoutBind" :is-school="switchCard" :active-layout="activeMenu"/>
    <el-container style="height: 100%">
      <el-aside style="width: 300px; border-radius: 8px">
        <nav-menu @menuSelect="menuSelectHandler" :layout-list="layoutList"/>
      </el-aside>
      <el-main>
        <div class="dataList">
          <div v-show="switchCard" v-for="item in resourceList">
            <layout-school-card @unbindSchool="unbindSchool" :school="item"/>
          </div>
          <div v-show="!switchCard" v-for="item in resourceList">
            <layout-course-card @unbindCourse="unbindCourse" :course="item"/>
          </div>
          <div  @click="showDialog">
            <el-card style="text-align: center" :body-style="{ padding: '0px'}" class="add-card">
              <i style="font-size: 150px; margin-top: 35px" class="el-icon-circle-plus"/>
            </el-card>
          </div>
          <div class="empty" style="visibility: hidden"></div>
          <div class="empty" style="visibility: hidden"></div>
          <div class="empty" style="visibility: hidden"></div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import NavMenu from "@/components/content/main/layoutManage/NavMenu";
import LayoutCourseCard from "@/components/content/main/layoutManage/layoutCourseCard";
import LayoutSchoolCard from "@/components/content/main/layoutManage/layoutSchoolCard";
import LayoutDialog from "@/components/content/main/layoutManage/layoutDialog";

export default {
  name: "LayoutManage",
  components: {LayoutDialog, LayoutSchoolCard, LayoutCourseCard, NavMenu},
  data() {
    return {
      layoutList: [],
      resourceList: [],
      activeMenu: '35ea0cd7f84a530a8306f39c0888f4ee',
      activeResource: ''
    }
  },
  methods: {
    getLayout() {
      this.$api.layout.getAll()
      .then(res => {
        this.layoutList = res.data
      })
    },
    getSchool() {
      this.$api.layout.getSchool()
      .then(res => {
        this.resourceList = res.data;
      })
    },
    getCourse(layoutId) {
      this.$api.layout.getById(layoutId, 1, 100)
          .then(res => {
            this.resourceList = res.data.list
          })
    },
    menuSelectHandler(key, keyPath) {
      this.activeMenu = key
      if (this.switchCard) {
        this.getSchool()
      } else {
        this.getCourse(key)
      }
    },
    bindSchool(layoutId, schoolId) {
      this.$api.layout.bindSchool(layoutId, schoolId)
      .then(res => {
        this.getSchool()
      })
    },
    bindCourse(layoutId, courseId) {
      this.$api.layout.bindCourse(layoutId, courseId)
      .then(res => {
        console.log(res)
        this.getCourse(layoutId)
      })
    },
    showDialog() {
      this.$bus.$emit("layoutDialog", true)
    },
    layoutBind(resourceId) {
      console.log(this.activeMenu, resourceId)
      if (this.switchCard) {
        this.bindSchool(this.activeMenu, resourceId)
      } else {
        this.bindCourse(this.activeMenu, resourceId)
      }
    },
    unbindCourse(courseId) {
      console.log(courseId)
      this.$api.layout.unbindCourse(this.activeMenu, courseId)
      .then(res => {
        this.$message.info(res.message)
      })
      this.getCourse(this.activeMenu)
    },
    unbindSchool(schoolId) {
      this.$api.layout.unbindSchool(this.activeMenu, schoolId)
      .then(res => {
        this.$message.info(res.message)
      })
      this.getSchool()
    }
  },
  computed: {
    switchCard() {
      return this.activeMenu === '35ea0cd7f84a530a8306f39c0888f4ee'
    }
  },
  created() {
    this.getLayout()
    this.getSchool()
  }
}
</script>

<style scoped>
.el-main {
  margin-left: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.el-aside {
  border-radius: 8px;
  height: 100%;
}

.dataList {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.empty {
  width: 350px;
  height: 0;
  background-color: #ededed;
}

.add-card {
  width: 350px;
  height: 225px;
  margin: 15px 0;
}

.info {
  height: 100%;
}
</style>
