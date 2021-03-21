<template>
  <div id="course-live">
    <el-table :data="lCourseList">
      <el-table-column prop="title" label="直播标题"></el-table-column>
      <el-table-column prop="created" label="创建时间"></el-table-column>
      <el-table-column prop="reserveTime" label="预约时间"></el-table-column>
      <el-table-column prop="finished" label="结束时间"></el-table-column>
      <el-table-column prop="star" label="预约人数"></el-table-column>
      <el-table-column prop="liveCourseDesc" label="直播描述"></el-table-column>
    </el-table>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="直播标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="直播时间">
        <el-date-picker type="date" placeholder="选择开始时间" v-model="form.reserveTime"></el-date-picker>
        &nbsp;&nbsp;-&nbsp;&nbsp;
        <el-date-picker placeholder="选择结束时间" v-model="form.finished"></el-date-picker>
      </el-form-item>
      <el-form-item label="直播描述">
        <el-input type="textarea" v-model="form.liveCourseDesc"></el-input>
      </el-form-item>
      <el-button type="primary" @click="saveLCourse">立即预约</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CourseLiveOrder",
  data() {
    return {
      form: {
        title: "",
        finished: "",
        liveCourseDesc: "",
        reserveTime: ""
      },
      lCourseList: []
    }
  },
  methods: {
    saveLCourse() {
      this.$api.liveCourse.save(this.form)
      .then(res => {
        if (res.status === 200) {
          this.$message.success("创建成功");
        } else {
          this.$message.error("创建失败");
        }
      })
    },
    getLCourse() {
      this.$api.liveCourse.getByUser()
      .then(res => {
        for (let item of res.data) {
          item.created = item.created.replace("T", " ")
          item.finished = item.finished.replace("T", " ")
          item.reserveTime = item.reserveTime.replace("T", " ")
          console.log(item)
          this.lCourseList.push(item)
        }
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
