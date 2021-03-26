<template>
  <div id="teacher-card">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-avatar :size="70" :src="teacher.teacherAvatar"></el-avatar>
      <div class="info">
        <p style="margin-top: 2px; font-size: 16px">{{teacher.teacherName}}</p>
        <p style="margin-top: 2px; font-size: 12px; color: #999">{{teacher.teacherPost}}</p>
        <p style="margin-top: 2px">{{teacher.school.schoolName}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TeacherCard",
  props: {
    teacher: Object
  }
}
</script>

<style scoped>
#teacher-card {
  width: 250px;
  float: left;
  margin: 10px 0;
}

.el-avatar {
  float: left;
  margin: 12px 12px;
}

</style>
