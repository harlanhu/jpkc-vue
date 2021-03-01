<template>
  <div id="course-list">
    <el-table :data="courseList">
      <el-table-column fixed prop="courseName" label="课程名"/>
      <el-table-column prop="courseLogo" label="课程Logo">
        <el-button type="text" size="small">预览</el-button>
      </el-table-column>
      <el-table-column prop="courseDesc" label="课程描述"/>
      <el-table-column prop="courseCreated" label="课程创建时间"/>
      <el-table-column prop="courseUpdated" label="课程修改时间"/>
      <el-table-column prop="sectionCount" label="课程章节数"/>
      <el-table-column prop="courseHour" label="课程学时数"/>
      <el-table-column prop="courseViews" label="课程观看数"/>
      <el-table-column prop="courseStar" label="课程收藏数"/>
      <el-table-column prop="coursePrice" label="课程价格"/>
      <el-table-column prop="courseStatus" label="课程状态"/>
      <el-table-column fixed="right" label="操作">
        <div slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button type="text" size="small">编辑</el-button>
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
      courseList: [
        {
          courseName: "测试课程名称",
          courseDesc: "测试课程描述",
          courseLogo: "测试课程logo",
          courseCreated: "2020-1-1",
          courseUpdated: "2020-1-2",
          sectionCount: 5,
          courseHour: 125,
          courseViews: 10,
          courseStar: 20,
          coursePrice: 120.00,
          courseStatus: 0
        },
        {
          courseName: "高等数学A",
          courseDesc: "高等数学微积分，概率",
          courseLogo: "高等数学logo",
          courseCreated: "2020-5-2",
          courseUpdated: "2020-5-9",
          sectionCount: 10,
          courseHour: 140,
          courseViews: 50,
          courseStar: 173,
          coursePrice: 155.00,
          courseStatus: 0
        }
      ]
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>

<style scoped>

</style>
