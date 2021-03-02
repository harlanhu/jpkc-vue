<template>
  <div id="course-add-dialog">
    <el-dialog title="新章节详细信息"
               width="60%"
               center
               :visible.sync="courseAddDialog">
      <el-form ref="sectionForm" :model="section">
        <el-form-item label="章节名称">
          <el-input v-model="section.sectionName" type="text" placeholder="请输入章节名称"/>
        </el-form-item>
        <el-form-item label="章节描述">
          <el-input v-model="section.sectionDesc" type="textarea" placeholder="请输入关于本章节的描述"/>
        </el-form-item>
      </el-form>
      <el-upload drag
                 :auto-upload="false"
                 class="upload-demo"
                 multiple
                 accept=".mp3, .mp4, .avi, .mpg, .mpeg, .wmv, .rmvb, .rm, .flv"
                 action="#">
        <i class="el-icon-upload"/>
        <div class="el-upload__text">将课程视频拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip">只能上传视频文件，且不超过1.5G</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="courseAddDialog = false">取消</el-button>
        <el-button type="primary" @click="createSection">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "CourseAddDialog",
  data() {
    return {
      section: {
        sectionName: "",
        sectionDesc: ""
      },
      courseAddDialog: false,
      treeData: {},
      id: 0
    }
  },
  methods: {
    createSection() {
      const newChild = {
        id: this.id,
        label: this.section.sectionName,
        sectionDesc: this.section.sectionDesc,
        child: []
      }
      this.$refs.sectionForm.resetFields()
      this.$emit("createNewChild", newChild, this.treeData)
      this.courseAddDialog = false
    }
  },
  mounted() {
    this.$bus.$on("activeCourseAddDialog", (isActive, treeData, id) => {
      this.courseAddDialog = isActive
      this.treeData = treeData
      this.id = id
    })
  }
}
</script>

<style scoped>

</style>
