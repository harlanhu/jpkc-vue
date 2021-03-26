<template>
  <div id="qualification">
    <el-form ref="form" :model="teacher" label-width="80px">
      <el-form-item label="姓名">
        <el-input style="width: 300px" v-model="teacher.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-select v-model="teacher.schoolId" placeholder="请选择">
          <el-option v-for="school in schoolList"
                     :key="school.schoolId"
                     :label="school.schoolName"
                     :value="school.schoolId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="照片">
        <el-input v-model="teacher.teacherAvatar"></el-input>
      </el-form-item>
      <el-form-item label="教师工号">
        <el-input v-model="teacher.teacherNo" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="teacher.teacherPost" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input type="textarea" v-model="teacher.teacherDesc"></el-input>
      </el-form-item>
      <el-button style="margin-left: 40%" type="primary">立即申请</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Qualification",
  data() {
    return {
      teacher: {},
      schoolList: [],
    }
  },
  methods: {
    getSchool() {
      this.$api.school.getAll()
      .then(res => {
        console.log(res.data)
        this.schoolList = res.data
      })
    }
  },
  created() {
    this.getSchool()
  }
}
</script>

<style scoped>

</style>
