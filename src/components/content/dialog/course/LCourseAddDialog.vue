<template>
  <div id="add-dialog">
    <el-dialog title="直播预约信息"
               width="60%"
               center
               :visible.sync="lCourseAddDialog">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="直播标题">
          <el-input style="width: 200px" v-model="form.title"/>
        </el-form-item>
        <el-form-item label-width="100px" label="直播封面">
          <el-upload ref="logoUpload"
                     action="#"
                     list-type="picture-card"
                     :multiple="false"
                     :auto-upload="false"
                     accept=".png, .jpg"
                     :on-remove="logoDelete"
                     :on-change="changeUploadLogo">
            <i slot="default" class="el-icon-plus"/>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="找不到图片">
              <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview" @click="logoPreview(file)">
                    <i class="el-icon-zoom-in"/>
                  </span>
                  <span v-if="!logoFile.disabled" class="el-upload-list__item-delete" @click="logoDelete(file)">
                    <i class="el-icon-delete"/>
                  </span>
                </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="logoFile.dialogVisible">
            <img width="100%" :src="logoFile.url" alt="找不到图片">
          </el-dialog>
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
    </el-dialog>
  </div>
</template>

<script>
let customParseFormat = require('dayjs/plugin/customParseFormat')
let dayjs =  require('dayjs')
dayjs.extend(customParseFormat)

export default {
  name: "LCourseAddDialog",
  data() {
    return {
      lCourseAddDialog: false,
      inputTime: [],
      form: {
        title: "",
        finished: "",
        liveCourseDesc: "",
        reserveTime: "",
      },
      logoFile: {
        url: "",
        raw: {},
        file: {},
        dialogVisible: false,
        disabled: false
      },
    }
  },
  methods: {
    saveLCourse() {
      this.form.reserveTime = dayjs(this.inputTime[0]).format("YYYY-MM-DDTHH:MM")
      this.form.finished = dayjs(this.inputTime[1]).format("YYYY-MM-DDTHH:MM")
      this.$api.liveCourse.save(this.form, this.logoFile.raw)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              this.clearForm()
              this.getCoursesByUserId()
              this.$message.success("创建成功");
              this.lCourseAddDialog = false
            } else {
              this.$message.error("创建失败");
            }
          })
    },
    clearForm() {
      this.form.title = ""
      this.form.finished = ""
      this.liveCourseDesc = ""
      this.reserveTime = ""
      this.inputTime = []
    },
    logoPreview(file) {
      this.logoFile.url = file.url
      this.logoFile.file = file
      this.logoFile.raw = file.raw
      this.logoFile.dialogVisible = true
    },
    logoDelete(file) {
      this.logoFile.url = ''
      this.logoFile.file = {}
      this.logoFile.raw = {}
      this.$refs.logoUpload.clearFiles()
    },
    changeUploadLogo(file, fileList) {
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
      this.logoFile.file = file
      this.logoFile.raw = file.raw
      return isLt2M && isPNG && isJPG
    },
    getCoursesByUserId() {
      this.$api.course.getByUserId(this.$store.state.accountInfo.userId)
          .then(res => {
            this.courseList = res.data
          })
    }
  },
  mounted() {
    this.$bus.$on("activeLCourseAddDialog", isActive => {
      this.lCourseAddDialog = isActive
    })
  }
}
</script>

<style scoped>

</style>
