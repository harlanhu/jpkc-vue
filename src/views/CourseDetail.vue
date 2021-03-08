<template>
  <div id="course-details">
    <div class="course-info">
      <div class="course-logo">
        <el-image></el-image>
      </div>
    </div>
    <div class="section-info"></div>
    <div class="school-info"></div>
    <div class="teacher-info"></div>
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
#course-details {
  width: 1200px;
  margin: 0 auto;
}

.course-info {
  width: 100%;
  height: 500px;
  background-color: #fff;
}
</style>
