<template>
  <div class="layout-card">
    <el-card :body-style="{ padding: '0px'}">
      <img :src="course.courseLogo" class="image">
      <div style="padding: 14px">
        <span>{{course.courseName}}</span>
        <div class="bottom">
          <time class="time">{{course.courseCreated}}</time>
          <el-button @click="unbindCourse(course.courseId)" type="text" class="button">删除</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "layoutCourseCard",
  props: {
    course: Object
  },
  methods: {
    unbindCourse(courseId) {
      this.$emit("unbindCourse", courseId)
    }
  }
}
</script>

<style scoped>
.layout-card {
  width: 350px;
  height: 225px;
  margin: 15px 0;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 350px;
  height: 150px;
  display: block;
}
</style>
