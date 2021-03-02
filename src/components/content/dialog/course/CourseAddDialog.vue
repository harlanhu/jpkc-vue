<template>
  <div id="course-add-dialog">
    <el-dialog title="新章节详细信息"
               width="60%"
               center
               :visible.sync="courseAddDialog">
      <el-form>
        <el-form-item label="章节名称">
          <el-input type="text" placeholder="请输入章节名称"/>
        </el-form-item>
        <el-form-item label="章节描述">
          <el-input type="textarea" placeholder="请输入关于本章节的描述"/>
        </el-form-item>
      </el-form>
      <el-upload drag
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
        <el-button type="primary" @click="courseAddDialog = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "CourseAddDialog",
  data() {
    return {
      courseAddDialog: false
    }
  },
  mounted() {
    this.$bus.$on("activeCourseAddDialog", isActive => {
      this.courseAddDialog = isActive
    })
  }
}
</script>

<style scoped>

</style>
