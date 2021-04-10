<template>
  <div id="course-live">
    <el-table :data="lCourseList">
      <el-table-column prop="title" label="直播标题"></el-table-column>
      <el-table-column prop="created" label="创建时间"></el-table-column>
      <el-table-column prop="reserveTime" label="预约时间"></el-table-column>
      <el-table-column prop="finished" label="结束时间"></el-table-column>
      <el-table-column prop="star" label="预约人数"></el-table-column>
      <el-table-column prop="liveCourseDesc" label="直播描述"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" size="small" @click="removeLiveCourse(scope.row)">删除预约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="showDialog" type="primary">直播预约</el-button>
    </div>
    <l-course-add-dialog/>
  </div>
</template>

<script>
import LCourseAddDialog from "../../dialog/course/LCourseAddDialog";
export default {
  name: "CourseLiveOrder",
  components: {LCourseAddDialog},
  data() {
    return {
      lCourseList: []
    }
  },
  methods: {
    getLCourse() {
      this.lCourseList = []
      this.$api.liveCourse.getByUser()
      .then(res => {
        for (let item of res.data) {
          item.created = item.created.replace("T", " ")
          item.finished = item.finished.replace("T", " ")
          item.reserveTime = item.reserveTime.replace("T", " ")
          this.lCourseList.push(item)
        }
      })
    },
    showDialog() {
      this.$bus.$emit("activeLCourseAddDialog", true)
    },
    removeLiveCourse(liveCourse) {
      this.$api.liveCourse.remove(liveCourse.liveCourseId)
      .then(res => {
        this.getLCourse()
      })
    }
  },
  created() {
    this.getLCourse()
  }
}
</script>

<style scoped>

</style>
