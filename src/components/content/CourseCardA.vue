<template>
  <div id="course-card">
    <course-card :course-logo="course.courseLogo">
      <span slot="class-title">{{course.courseName}}</span>
      <span slot="class-info1">总共 {{course.courseHour}} 个学时</span>
      <span slot="class-info2">包含 {{course.sectionCount}} 章节</span>
      <span slot="infoA"><i class="el-icon-view"/> {{course.courseViews}}</span>
      <span slot="infoB">价格 {{course.coursePrice === 0 ? "免费" : (course.coursePrice + "￥")}}</span>
    </course-card>
  </div>
</template>

<script>
import CourseCard from "@/components/common/CourseCard";
export default {
  name: "CourseCardA",
  components: {CourseCard},
  props: {
    course: {
      type: Object,
      default() {
        return {
          courseLogo: "https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/course/default/logo/course-default-logo.png",
          courseName: "加载失败...",
          courseHour: "加载失败..."
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
