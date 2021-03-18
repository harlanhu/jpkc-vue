<template>
  <div id="course-play">
    <div class="menu">
      <nav-menu :section-list="course.sectionDtoList" @select="menuSelect"/>
    </div>
    <div class="video-title" v-if="">
      {{activeSection.title}}
    </div>
    <div class="video">
      <v-player :video-src="activeSection.videoPath()"/>
    </div>
    <div class="recommend">
      <course-about :course="course"/>
    </div>
    <div class="info">
      <div class="label">
        <el-tag size="medium" type="info">标签</el-tag>
      </div>
      <div class="icon">
        <i class="el-icon-star-on"/>
        <i class="el-icon-success"/>
        <i class="el-icon-share"/>
      </div>
    </div>
    <div class="comment">
      <h1>评论</h1>
    </div>
  </div>
</template>

<script>
import VPlayer from "@/components/common/VPlayer";
import NavMenu from "@/components/common/NavMenu";
import CourseAbout from "@/components/content/main/course/courseAbout";

export default {
  name: "CoursePlay",
  components: {
    CourseAbout,
    NavMenu,
    VPlayer
  },
  data() {
    return {
      course: {},
      activeSection: {
        title: String,
        videoPath: String
      }
    }
  },
  methods: {
    getCourse() {
      this.$api.course.getCourseById(this.$route.params.courseId)
      .then(res => {
        this.course = res.data
      })
    },
    menuSelect(sectionId, index) {
      let sectionList = this.course.sectionDtoList
      for (let i = 0; i < sectionList.length; i++) {
        if (sectionList[i].sectionId === sectionId) {
          this.activeSection.title = sectionList[i].sectionName
          this.activeSection.videoPath = sectionList[i].resources[0].resourcePath
          console.log(this.activeSection.videoPath)
          return;
        }
      }
    }
  },
  created() {
    this.getCourse()
  }
}
</script>

<style scoped>
#course-play {
  width: 1700px;
  margin: 0 auto;
}

.menu {
  border-radius: 8px;
  width: 300px;
  float: left;
}

.video-title {
  vertical-align: middle;
  margin: 0 auto;
  width: 1000px;
  height: 50px;
  border-radius: 8px 8px 0 0;
  background-color: #fff;
  font-size: 25px;
}

.video {
  margin: 0 auto;
  width: 1000px;
  height: 0;
}

.recommend {
  border-radius: 8px;
  background-color: #fff;
  float: right;
  width: 300px;
}

.info {
  background-color: #fff;
  border-radius: 0 0 8px 8px;
  margin: 563px auto 0 auto ;
  width: 1000px;
  height: 50px;
}

.icon {
  float: right;
  margin-top: 8px;
  margin-right: 30px;
}

.icon i {
  margin-left: 30px;
  font-size: 35px;
}

.label {
  float: left;
  margin-top: 10px;
  margin-left: 30px;
}

.el-tag {
  border-radius: 10px;
  margin-right: 30px;
}

.comment {
  margin: 20px auto;
  border-radius: 8px;
  width: 1000px;
  height: 1000px;
  background-color: #fff;
}
</style>
