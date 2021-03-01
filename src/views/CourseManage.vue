<template>
  <div id="course-manage">
    <el-container style="height: 100%">
      <el-aside style="width: 150px; margin: 20px 0">
        <nav-menu/>
      </el-aside>
      <el-main>
        <router-view name="courseManage"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "@/components/content/main/courseManage/NavMenu";
import CourseList from "@/components/content/main/courseManage/CourseList";

export default {
  name: "CourseManage",
  components: {
    CourseList,
    NavMenu
  }
}
</script>

<style scoped>

</style>
