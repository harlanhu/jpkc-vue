<template>
  <div id="course-data">
    <el-table :data="courseList">
      <el-table-column fixed width="200" prop="courseName" label="课程名称"/>
      <el-table-column width="150" prop="courseLogo" label="Logo">
        <el-popover placement="top-start"
                    title="Logo预览"
                    width="100"
                    trigger="hover"
                    slot-scope="scope">
          <el-image style="width: 100px; height: 100px; border-radius: 4px" :src="scope.row.courseLogo"></el-image>
          <el-button type="text" size="small" slot="reference">预览</el-button>
        </el-popover>
      </el-table-column>
      <el-table-column width="150" prop="courseViews" label="观看数"/>
      <el-table-column width="150" prop="courseStar" label="收藏数"/>
      <el-table-column width="150" prop="scoreCount" label="成绩提交数"/>
      <el-table-column width="200" label="操作">
        <div slot-scope="scope">
          <el-button style="float: left" @click="handleScore(scope.row.courseId)" type="text" size="small">导出成绩到Exel</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CourseData",
  data() {
    return {
      courseList: []
    }
  },
  methods: {
    handleEditClick(row) {
      this.$router.replace({
        path: "/courseDetail/" + row.courseId,
        params: {
          course: row
        }
      })
    },
    getCoursesByUserId() {
      this.$api.course.getByUserId(this.$store.state.accountInfo.userId)
          .then(res => {
            this.courseList = res.data
          })
    },
    statusChange(course) {
      this.$api.course.update(course)
    },
    handleDeleteClick(courseId) {
      this.$api.course.deleteById(courseId)
          .then(res => {
            this.$message.success(res.message)
            this.getCoursesByUserId()
          })
    },
    handleScore(courseId) {
      window.location.href = this.$api.score.getExel(courseId)
    }
  },
  created() {
    this.getCoursesByUserId()
  },
}
</script>

<style scoped>
#course-data {
  width: 1620px;
}
</style>
