<template>
  <div id="course-list">
    <el-table :data="courseList">
      <el-table-column fixed prop="courseName" label="名称"/>
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
      <el-table-column prop="courseCreated" label="创建时间"/>
      <el-table-column prop="courseUpdated" label="修改时间"/>
      <el-table-column width="70" prop="sectionCount" label="章节数"/>
      <el-table-column width="70" prop="courseHour" label="学时数"/>
      <el-table-column width="80" prop="courseViews" label="观看数"/>
      <el-table-column width="80" prop="courseStar" label="收藏数"/>
      <el-table-column width="80" prop="coursePrice" label="价格"/>
      <el-table-column width="70" prop="courseStatus" label="状态">
        <el-tag :type="statusTagType(scope.row)" slot-scope="scope">{{courseStatus(scope.row)}}</el-tag>
      </el-table-column>
      <el-table-column prop="categoryList" label="分类">
        <template slot-scope="scope">
          <el-tag style="margin-right: 5px" v-for="item in scope.row.categoryList">{{item.categoryName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="labelList" label="课程标签">
        <template slot-scope="scope">
          <el-tag type="info" style="margin-right: 5px" v-for="item in scope.row.labelList">{{item.labelName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="60" fixed="right" label="操作">
        <div slot-scope="scope">
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props: {
    courseList: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleEditClick(row) {
      console.log(row)
      this.$router.replace({
        path: "/course-manage/edit/" + row.courseName,
        params: {
          course: row
        }
      })
    },
    courseStatus(course) {
      if (course.courseStatus === 0) {
        return "开启"
      } else {
        return "关闭"
      }
    },
    statusTagType(course) {
      if (course.courseStatus === 0) {
        return "success"
      } else {
        return "danger"
      }
    }
  }
}
</script>

<style scoped>

</style>
