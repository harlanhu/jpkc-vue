<template>
  <course-card :course-logo="lCourse.avatar">
    <span slot="class-title">{{lCourse.title}}</span>
    <span slot="class-info1">开始时间: {{lCourse.reserveTime}}</span>
    <span slot="class-info2">结束时间: {{lCourse.finished}}</span>
    <span slot="infoA"><i class="el-icon-star-on"/>收藏人数 {{lCourse.star}}</span>
    <span slot="infoB">观看人数 {{lCourse.views}}</span>
  </course-card>
</template>

<script>
import CourseCard from "./CourseCard";

export default {
  name: "LiveCourseCard",
  components: {CourseCard},
  props: {
    lCourse: {}
  }
}
</script>

<style scoped>

</style>
