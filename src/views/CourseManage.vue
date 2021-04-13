<template>
  <div id="course-manage">
    <el-container style="height: 100%">
      <el-aside style="width: 150px; border-radius: 8px">
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
.el-main {
  margin-top: 0;
  margin-left: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.el-aside {
  border-radius: 8px;
  height: 100%;
}
</style>
