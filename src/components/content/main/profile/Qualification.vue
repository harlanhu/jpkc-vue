<template>
  <div id="qualification">
    <div v-if="!isTeacher">
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
          <el-upload ref="avatarLogo"
                     action="#"
                     list-type="picture-card"
                     :multiple="false"
                     :auto-upload="false"
                     accept=".png, .jpg"
                     :on-remove="avatarDelete"
                     :on-change="changeAvatar">
            <i slot="default" class="el-icon-plus"/>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="找不到图片">
              <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="avatarPreview(file)">
                <i class="el-icon-zoom-in"/>
              </span>
              <span v-if="!avatarFile.disabled" class="el-upload-list__item-delete" @click="avatarDelete(file)">
                <i class="el-icon-delete"/>
              </span>
            </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="avatarFile.dialogVisible">
            <img width="100%" :src="avatarFile.url" alt="找不到图片">
          </el-dialog>
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
        <el-button @click="createTeacher" style="margin-left: 40%" type="primary">立即申请</el-button>
      </el-form>
    </div>
    <div v-else>
      <el-form :model="teacher" label-width="80px">
        <el-form-item label="姓名">
          <el-input style="width: 300px" disabled v-model="teacher.teacherName"/>
        </el-form-item>
        <el-form-item style="width: 400px" label="学校" v-if="teacher.school">
          <el-input disabled v-model="teacher.school.schoolName"/>
        </el-form-item>
        <el-form-item label="照片">
          <el-image style="width: 200px; height: 200px" :src="teacher.teacherAvatar"/>
        </el-form-item>
        <el-form-item label="教授工号">
          <el-input style="width: 400px" disabled v-model="teacher.teacherNo"/>
        </el-form-item>
        <el-form-item label="职位">
          <el-input style="width: 300px" disabled v-model="teacher.teacherPost"/>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input disabled type="textarea" v-model="teacher.teacherDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-button style="width: 100%" @click="linkToCourseManage" type="primary">进入课程管理页面</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Qualification",
  data() {
    return {
      teacher: {},
      schoolList: [],
      avatarFile: {
        url: "",
        raw: {},
        file: {},
        dialogVisible: false,
        disabled: false
      },
      isTeacher: false
    }
  },
  methods: {
    getSchool() {
      this.$api.school.getAll()
      .then(res => {
        this.schoolList = res.data
      })
    },
    avatarDelete(file) {
      this.avatarFile.url = ''
      this.avatarFile.file = {}
      this.avatarFile.raw = {}
      this.$refs.avatarLogo.clearFiles()
    },
    changeAvatar(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      const isJPEG = file.raw.type === "image/jpeg"
      const isJPG = file.raw.type === "image/jpg"
      const isPNG = file.raw.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("请上传 PNG 或 JPG 格式图片！")
        this.$refs.logoUpload.clearFiles()
      }
      if (!isLt2M) {
        this.$message.error("上传大小不能超过 5MB")
        this.$refs.logoUpload.clearFiles()
      }
      this.avatarFile.file = file
      this.avatarFile.raw = file.raw
      return isLt2M && isPNG && isJPG
    },
    avatarPreview(file) {
      this.avatarFile.url = file.url
      this.avatarFile.file = file
      this.avatarFile.raw = file.raw
      this.avatarFile.dialogVisible = true
    },
    createTeacher() {
      this.$api.teacher.save(this.teacher, this.avatarFile.file.raw)
      .then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          this.getIsTeacher()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getIsTeacher() {
      this.$api.teacher.isTeacher()
      .then(res => {
        if (res.data === true) {
          this.isTeacher = true
          this.$api.teacher.getByUser()
          .then(response => {
            this.teacher = response.data
          })
        }
      })
    },
    linkToCourseManage() {
      this.$router.push("/course-manage")
    }
  },
  created() {
    this.getIsTeacher()
    this.getSchool()
  }
}
</script>

<style scoped>

</style>
