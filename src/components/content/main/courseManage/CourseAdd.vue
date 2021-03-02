<template>
  <div id="course-add">
    <el-form ref="form" :model="course">
      <el-form-item label-width="100px" label="课程名称">
        <el-input  style="width: 200px" prefix-icon="el-icon-collection" show-word-limit v-model="course.courseName" placeholder="请输入课程名称"/>
      </el-form-item>
      <el-row>
        <el-col span="12">
          <el-form-item label-width="100px" label="课程描述">
            <el-input style="width: 500px" type="textarea" prefix-icon="el-icon-document" v-model="course.courseDesc" placeholder="请输入关于课程的描述"/>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label-width="100px" label="课程Logo">
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程价格">
            <el-input-number :min="0" :max="9999" precision="1" step="0.1" v-model="course.coursePrice"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程学时数">
            <el-input-number :min="1" :max="999"  v-model="course.courseHour"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程章节数">
            <el-input-number :min="1" :max="99" v-model="course.sectionCount"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label-width="100px" label="课程状态">
            <el-switch active-color="#13ce66"
                       active-text="开放"
                       active-value="0"
                       inactive-text="关闭"
                       inactive-value="1"
                       v-model="course.courseStatus"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CourseAdd",
  data() {
    return {
      course: {
        courseName: '',
        courseDesc: '',
        courseLogo: '',
        sectionCount: 0,
        courseHour: 0,
        coursePrice: 0,
        courseStatus: 0,
      },
      logoFile: {
        url: "",
        dialogVisible: false,
        disabled: false
      }
    }
  },
  methods: {
    logoPreview(file) {
      console.log(file)
      this.logoFile.url = file.url
      this.logoFile.dialogVisible = true
    },
    logoDelete(file) {
      this.logoFile.url = ''
      this.$refs.logoUpload.clearFiles()
    },
    changeUploadLogo(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1)
      }
      console.log(file.raw.type)
      const isJPEG = file.raw.type === "image/jpeg"
      const isJPG = file.raw.type === "image/jpg"
      const isPNG = file.raw.type === "image/png"
      const isLt2M = file.size / 1024 / 1024 < 5
      console.log(!isJPEG + "---" + !isJPG + "---" + isPNG)
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error("请上传 PNG 或 JPG 格式图片！")
        this.$refs.logoUpload.clearFiles()
      }
      if (!isLt2M) {
        this.$message.error("上传大小不能超过 5MB")
        this.$refs.logoUpload.clearFiles()
      }
      return isLt2M && isPNG && isJPG
    }
  }
}
</script>

<style scoped>

</style>
