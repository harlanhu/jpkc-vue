<template>
  <div id="favorite">
    <el-table :data="courseList" style="width: 100%">
      <el-table-column prop="courseName" label="课程名"/>
      <el-table-column prop="courseLogo" label="课程Logo">
        <el-popover placement="top-start"
                    title="Logo预览"
                    width="100"
                    trigger="hover"
                    slot-scope="scope">
          <el-image style="width: 100px; height: 100px; border-radius: 4px" :src="scope.row.courseLogo"></el-image>
          <el-button type="text" size="small" slot="reference">预览</el-button>
        </el-popover>
      </el-table-column>
      <el-table-column prop="sectionCount" label="章节数"/>
      <el-table-column prop="courseStar" label="收藏数"/>
      <el-table-column prop="courseViews" label="浏览数"/>
      <el-table-column fixed="right" label="操作">
        <div slot-scope="scope">
          <el-button @click="linkToPlay(scope.row.courseId)" type="text" size="small">继续观看</el-button>
          <el-button @click="unFavorite(scope.row.courseId)" type="text" size="small">取消收藏</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Favorite",
  data() {
    return {
      courseList: [],
      pageInfo: {
        current: 1,
        size: 25,
        total: 0,
        pages: 0
      }
    }
  },
  methods: {
    getCourse() {
      this.$api.course.getCollect(this.pageInfo.current, this.pageInfo.size)
      .then(res => {
        this.courseList = res.data.list
        this.pageInfo.total = res.data.total
        this.pageInfo.pages = res.data.pages
      })
    },
    linkToPlay(courseId) {
      this.$router.push("/course/" + courseId)
    },
    unFavorite(courseId) {
      this.$api.course.unCollect(courseId)
      .then(res => {
        if (res.status === 200) {
          this.$message.success(res.data)
          this.getCourse()
        } else {
          this.$message.error(res.data.message);
        }
      })
    }
  },
  created() {
    this.getCourse()
  }
}
</script>

<style scoped>

</style>
