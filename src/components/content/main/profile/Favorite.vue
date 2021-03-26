<template>
  <div id="favorite">
    <el-table :data="courseList" style="width: 100%">
      <el-table-column prop="courseName" label="课程名"/>
      <el-table-column prop="courseLogo" label="课程Logo"/>
      <el-table-column prop="sectionCount" label="章节数"/>
      <el-table-column prop="courseStar" label="收藏数"/>
      <el-table-column prop="courseViews" label="浏览数"/>
      <el-table-column prop="操作">
        <template #default="scope">
          <el-button type="text" size="small">继续观看</el-button>
          <el-button type="text" size="small">取消收藏</el-button>
        </template>
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
    }
  }
}
</script>

<style scoped>

</style>
