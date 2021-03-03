<template>
  <div id="course-add-dialog">
    <el-dialog title="新章节详细信息"
               width="60%"
               center
               :visible.sync="courseAddDialog">
      <el-form ref="sectionForm" :model="section" :rules="rules">
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="section.sectionName" type="text" placeholder="请输入章节名称"/>
        </el-form-item>
        <el-form-item label="章节描述" prop="sectionDesc">
          <el-input v-model="section.sectionDesc" type="textarea" placeholder="请输入关于本章节的描述"/>
        </el-form-item>
      </el-form>
      <h1>视频上传</h1>
      <el-upload :auto-upload="false"
                 class="upload-demo"
                 multiple
                 :file-list="section.fileList"
                 :on-change="handleChange"
                 :on-remove="handleRemove"
                 accept=".mp3, .mp4, .avi, .mpg, .mpeg, .wmv, .rmvb, .rm, .flv"
                 action="#">
        <el-button type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传视频文件，且不超过1.5G</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="createSection">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MessageUtils from "@/utils/MessageUtils";

export default {
  name: "CourseAddDialog",
  data() {
    return {
      courseAddDialog: false,
      section: {
        sectionName: "",
        sectionDesc: "",
        fileList: [],
      },
      rules: {
        sectionName: [
          {
            required: true,
            message: "请输入章节名称",
            trigger: 'blur'
          },
          {
            pattern: "[\u4e00-\u9fa5A-Za-z0-9]{4,16}",
            message: "请输入4-16个字符不包括特殊符号",
            trigger: "blur"
          }
        ],
        sectionDesc: [
          {
            required: true,
            message: '请输入章节描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    createSection() {
      this.$refs.sectionForm.validate((valid) => {
        if (valid) {
          if (this.section.fileList.length === 0) {
            MessageUtils.showError("请至少添加一条视频！")
            return false
          }
          const newSection = {
            sectionName: this.section.sectionName,
            sectionDesc: this.section.sectionDesc,
            fileList: this.section.fileList
          }
          this.$emit("createNewSection", newSection)
          this.$refs.sectionForm.resetFields()
          this.section.fileList = []
          this.courseAddDialog = false
        } else {
          MessageUtils.showError("请填写正确的信息！")
          return false
        }
      })
    },
    handleChange(file, fileList) {
      this.section.fileList.push(file)
    },
    handleRemove(file, fileList, index) {
      this.section.fileList = fileList
    },
    cancel() {
      this.$refs.sectionForm.resetFields()
      this.courseAddDialog = false
    }
  },
  mounted() {
    this.$bus.$on("activeCourseAddDialog", (isActive) => {
      this.courseAddDialog = isActive
    })
  }
}
</script>

<style scoped>

</style>
