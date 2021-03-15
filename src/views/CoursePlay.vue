<template>
  <div id="course-play">
    <div class="menu">
      <nav-menu :section-list="course.sectionDtoList"/>
    </div>
    <div class="video">
      <v-player video-src="https://web-applications.oss-cn-chengdu.aliyuncs.com/jpck/course/ede921ddfb6e4ad6a6e8b7b211a304a9/section/6076d707040e413d909abf6dd0e81d03.mp4"/>
    </div>
    <div></div>
  </div>
</template>

<script>
import VPlayer from "@/components/common/VPlayer";
import NavMenu from "@/components/common/NavMenu";
export default {
  name: "CoursePlay",
  components: {
    NavMenu,
    VPlayer
  },
  data() {
    return {
      course: {}
    }
  },
  methods: {
    getCourse() {
      this.$api.course.getCourseById(this.$route.params.courseId)
      .then(res => {
        this.course = res.data
      })
    }
  },
  created() {
    this.getCourse()
  }
}
</script>

<style scoped>
.menu {
  border-radius: 8px;
  width: 300px;
  float: left;
}

.video {
  float: left;
  width: 1170px;
  margin-left: 10px;
}
</style>
