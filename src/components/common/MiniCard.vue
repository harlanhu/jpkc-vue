<template>
  <div id="mini-card">
    <div id="images">
      <img :src="course.courseLogo" class="image" alt="加载失败">
    </div>
    <div class="detail">
      <p class="title">{{course.courseName}}</p>
      <p class="producer">测试数据</p>
      <p class="join-count">{{course.courseViews}}人参加</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniCard",
  props: {
    course: {
      type: Object
    }
  },
  data() {
    return {
      school: {}
    }
  },
  methods: {
    getSchoolByCourseId() {

    }
  },
  created() {

  }
}
</script>

<style scoped>
#mini-card {
  width: 322px;
  height: 63px;
}

#mini-card img {
  width: 102px;
  height: 63px;
  border-radius: 4px;
}

#images {
  position: relative;
  float: left;
}


.detail {
  position: relative;
  float: left;
  margin-left: 10px;
}

.detail p{
  margin-bottom: 3px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 3px;
  overflow: hidden;
  display: -webkit-box;
  width: 210px;
}

.producer {
  margin: 0;
  padding: 0;
  outline: none;
  color: #666;
}

.join-count {
  margin: 0;
  padding: 0;
  outline: none;
  color: #999;
}
</style>
