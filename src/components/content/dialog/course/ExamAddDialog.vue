<template>
  <div id="exam-info">
    <el-dialog title="课程试题添加"
               center
               :visible.sync="examAddShow"
               width="60%">
      <h4 style="text-align: center; color: red">*请添加至少一则试题，总分为100分</h4>
      <div style="margin: 20px 0" v-for="(exam, index) in exams" :key="index">
        <span style="font-size: 18px; margin-right: 10px">第{{index + 1}}题: </span><el-input v-model="exam.topic" placeholder="请输入题目" style="width: 90%"></el-input>
        <div style="margin: 10px 0" v-for="(option, indexO) in exam.options">
          <span style="font-size: 16px; margin-left: 20px; margin-right: 10px">选项{{indexO + 1}}: </span><el-input v-model="exam.options[indexO]" :key="indexO" placeholder="请输入选项" style="width: 50%"></el-input>
          <el-radio style="margin-left: 20px" v-model="exam.answer" :label="indexO">正确选项</el-radio>
        </div>
        <el-button style="margin: 10px 30px 10px 80px;" @click="addOption(exam.options)">添加选项</el-button>
        <span style="font-size: 14px">当题分数: </span><el-input-number v-model="exam.value" @change="valueClick" :min="1" :step="1" label="当题分数" step-strictly></el-input-number>
        <div style="width: 100%; height: 2px; background-color:#999999"></div>
      </div>
      <div style="text-align: center">
        <el-button type="primary" @click="addExam(exams)" style="margin-right: 60px">继续添加</el-button>
        <el-button type="info" @click="save">结束保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ExamAddDialog",
  props: {
    exams: {
      type: Array,
      default() {
        return [
          {
            topic: "",
            options: [""],
            answer: "1",
            value: 0
          }
        ]
      }
    }
  },
  data() {
    return {
      examAddShow: false,
      currentOptions: []
    }
  },
  methods: {
    addOption(options) {
      if (options.length >= 5) {
        this.$message.error("每题最多添加5个选项")
      } else {
        options.push("")
      }
    },
    addExam(exam) {
      if (exam.length >= 30) {
        this.$message.error("每个课程最多添加30则题目")
      } else {
        exam.push({
          topic: "",
          options: ["", ""],
          answer: "1",
          value: 0
        })
      }
    },
    valueClick(value) {
      const total = 100
      let current = 0
      for (let i = 0; i < this.exams.length; i++) {
        current += this.exams[i].value
      }
      if (current + value > total) {
        this.$message.error("分数超出限制!")
      }
    },
    save() {
      const total = 100
      let current = 0
      for (let i = 0; i < this.exams.length; i++) {
        current += this.exams[i].value
      }
      if (current > total) {
        this.$message.error("分数超出限制!")
      } else if (current < total) {
        this.$message.error("请合理分配分数!")
      } else {
        this.examAddShow = false
      }
    }
  },
  mounted() {
    this.$bus.$on("activeExamAddDialog", isActive => {
      this.examAddShow = isActive
    })
  }
}
</script>

<style scoped>

</style>
