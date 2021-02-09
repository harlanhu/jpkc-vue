<template>
  <div id="large-card">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img :src="data.resourcePath" class="image" alt="加载失败">
      <div id="info">
        <h3>{{ course.courseName }}</h3>
        <p>{{ school.schoolName }}</p>
      </div>
      <div id="detail">
        <span>{{ course.courseViews }}人参加</span>
        <el-divider></el-divider>
        <span>{{ course.courseDesc }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LargeCard",
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      course: {},
      school: {}
    }
  },
  methods: {
    getCourseById() {
      this.$api.course.getCourseById(this.data.associateDataId)
          .then(res => {
            this.course = res.data
            this.getSchoolByTeacherId(res.data.teacherId)
          })
    },
    getSchoolByTeacherId(teacherId) {
      this.$api.school.getByTeacherId(teacherId)
      .then(res => {
        this.school = res.data
      })
    }
  },
  created() {
    this.getCourseById()
  }
}
</script>

<style scoped>
#large-card {
  width: 224px;
  height: 293px;
}

.el-card {
  height: 100%;
}

#info {
  width: 200px;
  height: 70px;
  margin: 10px auto;
  padding: 0;
  outline: none;
}

#info h3 {
  max-height: 36px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  line-height: 18px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#info p {
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  margin-top: 8px;
  color: #666;
  overflow: hidden;
  white-space: nowrap
}

#detail {
  width: 200px;
  height: 65px;
  margin: 0 auto;
  overflow: hidden;
}

#detail span {
  padding: 0;
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  color: #999;
  overflow: hidden;
  width: calc(100% - 24px);
}

.image {
  width: 224px;
  height: 126px;
}

.el-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
