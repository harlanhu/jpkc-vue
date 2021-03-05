<template>
  <div id="course">
    <h1>课程详细展示</h1>
    <h2>{{course.courseName}}</h2>
  </div>
</template>

<script>
export default {
  name: "Course",
  data() {
    return {
      course: {}
    }
  },
  methods: {
    getCourseByName(courseName) {
      this.$api.course.getByName(courseName)
      .then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.course.courseName = this.$route.params.courseName
    this.getCourseByName(this.course.courseName)
  }
}
</script>

<style scoped>

</style>
