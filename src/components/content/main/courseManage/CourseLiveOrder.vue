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
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="直播标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="直播时间">
        <el-date-picker
            v-model="inputTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
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
      inputTime: [],
      form: {
        title: "",
        finished: "",
        liveCourseDesc: "",
        reserveTime: "",
      },
      lCourseList: []
    }
  },
  methods: {
    saveLCourse() {
      this.form.reserveTime = this.inputTime[0]
      this.form.finished = this.inputTime[1]
      this.$api.liveCourse.save(this.form)
      .then(res => {
        if (res.status === 200) {
          this.getLCourse()
          this.form.title = ""
          this.form.finished = ""
          this.liveCourseDesc = ""
          this.reserveTime = ""
          this.inputTime = []
          this.$message.success("创建成功");
        } else {
          this.$message.error("创建失败");
        }
      })
    },
    getLCourse() {
      this.lCourseList = []
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
