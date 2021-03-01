<template>
  <div id="course-manage">
    <el-container style="height: 100%">
      <el-aside style="width: 150px; margin: 20px 0">
        <nav-menu :course-list="courseList"/>
      </el-aside>
      <el-main>
        <router-view :course-list="courseList" name="courseManage"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/content/main/courseManage/NavMenu";
import CourseList from "@/components/content/main/courseManage/CourseList";

export default {
  name: "CourseManage",
  data() {
    return {
      userInfo: {},
      courseList: []
    }
  },
  components: {
    CourseList,
    NavMenu
  },
  methods: {
    getCoursesByUserId() {
      this.$api.course.getByUserId(this.$store.state.accountInfo.userId)
      .then(res => {
        this.courseList = res.data
      })
    }
  },
  created() {
    this.userInfo = this.$store.state.accountInfo
    this.getCoursesByUserId()
  }
}
</script>

<style scoped>

</style>
