<template>
  <div class="layout-manage">
    <el-container style="height: 100%">
      <el-aside style="width: 300px; border-radius: 8px">
        <nav-menu @menuSelect="menuSelectHandler" :layout-list="layoutList"/>
      </el-aside>
      <el-main>
        <div class="dataList">
          <div v-show="switchCard" v-for="item in resourceList">
            <layout-school-card :school="item"/>
          </div>
          <div v-show="!switchCard" v-for="item in resourceList">
            <layout-course-card :course="item"/>
          </div>
          <el-card style="text-align: center" :body-style="{ padding: '0px'}" class="add-card">
            <i style="font-size: 150px; margin-top: 35px" class="el-icon-circle-plus"/>
          </el-card>
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

export default {
  name: "LayoutManage",
  components: {LayoutSchoolCard, LayoutCourseCard, NavMenu},
  data() {
    return {
      layoutList: [],
      resourceList: [],
      activeMenu: '35ea0cd7f84a530a8306f39c0888f4ee'
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
</style>
