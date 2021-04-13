<template>
  <div id="course-list">
    <el-table :data="courseList">
      <el-table-column fixed width="150" prop="courseName" label="名称"/>
      <el-table-column width="60" prop="courseLogo" label="Logo">
        <el-popover placement="top-start"
                    title="Logo预览"
                    width="100"
                    trigger="hover"
                    slot-scope="scope">
          <el-image style="width: 100px; height: 100px; border-radius: 4px" :src="scope.row.courseLogo"></el-image>
          <el-button type="text" size="small" slot="reference">预览</el-button>
        </el-popover>
      </el-table-column>
      <el-table-column width="150" prop="courseCreated" label="创建时间"/>
      <el-table-column width="150" prop="courseUpdated" label="修改时间"/>
      <el-table-column width="70" prop="sectionCount" label="章节数"/>
      <el-table-column width="70" prop="courseHour" label="学时数"/>
      <el-table-column width="80" prop="courseViews" label="观看数"/>
      <el-table-column width="80" prop="courseStar" label="收藏数"/>
      <el-table-column width="80" prop="coursePrice" label="价格"/>
      <el-table-column width="200" prop="courseStatus" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.courseStatus"
                     @change="statusChange(scope.row)"
                     active-text="开启" :active-value="0"
                     inactive-text="关闭"
                     :inactive-value="1"
                     active-color="#13ce66"
                     inactive-color="#ff4949"/>
        </template>
      </el-table-column>
      <el-table-column prop="categoryList" label="分类">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px" v-for="item in scope.row.categoryList" :key="item.categoryId">{{item.categoryName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="250" prop="labelList" label="课程标签">
        <template slot-scope="scope">
          <el-tag type="info" style="margin-right: 5px" v-for="item in scope.row.labelList" :key="item.labelId">{{item.labelName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="150" fixed="right" label="操作">
        <div slot-scope="scope">
          <el-button style="float: left" @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button style="float: left" @click="handleDeleteClick(scope.row.courseId)" type="text" size="small">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  data() {
    return {
      courseList: []
    }
  },
  methods: {
    handleEditClick(row) {
      this.$router.replace({
        path: "/course-manage/edit/" + row.courseName,
        params: {
          course: row
        }
      })
    },
    getCoursesByUserId() {
      this.$api.course.getByUserId(this.$store.state.accountInfo.userId)
        .then(res => {
          this.courseList = res.data
        })
    },
    statusChange(course) {
      this.$api.course.update(course)
    },
    handleDeleteClick(courseId) {
      this.$api.course.deleteById(courseId)
      .then(res => {
        this.$message.success(res.message)
        this.getCoursesByUserId()
      })
    }
  },
  created() {
    this.getCoursesByUserId()
  }
}
</script>

<style scoped>
#course-list {
  width: 1620px;
}
</style>
