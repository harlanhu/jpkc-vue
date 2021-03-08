<template>
  <div id="course-details">
    <div class="course-info">
      <div class="course-logo">
        <el-image style="width: 510px; height: 228px" src=""></el-image>
      </div>
      <div class="course-detail">
        <span class="course-title">CourseTitle</span>
        <el-tag>类别</el-tag>
        <div class="course-time">
          <span>创建时间</span>
          <span>更新时间</span>
        </div>
        <span>参加人数</span>
        <button>立即收藏</button>
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
  height: 500px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.course-logo {
  float: left;
}

.course-detail {
  float: left;
  margin-left: 100px;
}

.course-title {
  float: left;
  font-size: 24px;
  color: #333;
  margin-right: 6px;
}

.el-image {
  border-radius: 8px;
}

.el-tag {
  float: left;
}
</style>
