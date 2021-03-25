<template>
  <div class="layout-card">
    <el-card :body-style="{ padding: '0px'}">
      <img :src="school.schoolLogo" class="image">
      <div style="padding: 14px">
        <span>{{school.schoolName}}</span>
        <div class="bottom">
          <time class="time">{{school.created}}</time>
          <el-button @click="unbindSchool(school.schoolId)" type="text" class="button">删除</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "layoutSchoolCard",
  props: {
    school: Object
  },
  methods: {
    unbindSchool(schoolId) {
      this.$emit("unbindSchool", schoolId)
    }
  }
}
</script>

<style scoped>
.layout-card {
  width: 350px;
  height: 225px;
  margin: 15px 0;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 350px;
  height: 150px;
  display: block;
}
</style>

