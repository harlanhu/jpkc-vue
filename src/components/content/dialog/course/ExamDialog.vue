<template>
  <div id="exam-dialog">
    <el-dialog title="在线检测"
               center
               :visible.sync="examOnline"
               width="60%">
      <h4 style="text-align: center; color: red">总分100，只有一次提交机会</h4>
      <div style="margin: 10px 10px" v-for="(exam, index) in exams" :key="index">
        <h1><small>第{{index + 1}}题：</small>{{exam.topic}}</h1>
        <div style="margin: 10px 20px" v-for="(option, indexO) in exam.options" :key="indexO">
          <el-radio v-model="answers[index]" :label="indexO">{{option}}</el-radio>
        </div>
        <div style="width: 100%; height: 1px; background-color:#5a79a3;"></div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="info" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ExamDialog",
  props: {
    course: {},
    exams: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      examOnline: false,
      answers: [],
    }
  },
  methods: {
    submit() {
      console.log(this.answers)
      this.$api.exam.rating(this.course.courseId, this.answers)
      .then(res => {
        if (res.data >= 90) {
         this.$message.success("您的成绩优秀，得分:" + res.data)
        } else if (res.data >= 80) {
          this.$message.success("您的成绩良好，得分:" + res.data)
        } else if (res.data >= 70) {
          this.$message.success("您的成绩一般，得分:" + res.data)
        } else if (res.data >= 60) {
          this.$message.success("您的成绩较差，得分:" + res.data)
        } else {
          this.$message.error("此次测试不及格，得分:" + res.data)
        }
        this.$emit("updateMark", res.data)
        this.examOnline = false
        this.answers = []
      })
    },
    cancel() {
      this.answers = []
      this.examOnline = false
    }
  },
  mounted() {
    this.$bus.$on("activeExamOnline", isActive => {
      this.examOnline = isActive
    })
  }
}
</script>

<style scoped>

</style>
