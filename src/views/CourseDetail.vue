<template>
  <div id="course-details">
    <h1>课程详情</h1>
    <h2>课程id: {{course.courseId}}</h2>
  </div>
</template>

<script>
export default {
  name: "CourseDetail",
  data() {
    return {
      course: {}
    }
  },
  methods: {
    getCourse() {
      console.log(this.$route.params.courseId)
      this.$api.course.getCourseById(this.$route.params.courseId)
      .then(res => {
        this.course = res.data
      })
    }
  },
  created() {
    this.getCourse()
  }
}
</script>

<style scoped>

</style>
