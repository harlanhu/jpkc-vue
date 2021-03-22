<template>
  <div id="course-play">
    <div class="menu">
      <nav-menu :section-list="course.sectionDtoList" @select="menuSelect"/>
    </div>
    <div class="video-title">
      <span>— {{activeSection.title}}</span>
    </div>
    <div class="video">
      <v-player :src="activeSection.videoPath" :type="activeSection.type"/>
    </div>
    <div class="recommend">
      <course-about :course="course"/>
    </div>
    <div class="info">
      <div class="label">
        <el-tag v-for="label in course.labelList" size="medium" type="info">{{label.labelName}}</el-tag>
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
        title: "",
        sectionId: "",
        videoPath: "",
        type: "",
      },
      commentInfo: {
        current: 1,
        size: 10,
        total: 0,
        rankType: 0,
        commentList: []
      },
    }
  },
  methods: {
    initData() {
      this.$api.course.getCourseById(this.$route.params.courseId)
      .then(res => {
        this.course = res.data
        let sectionList = res.data.sectionDtoList
        this.initActiveSection(sectionList[0])
      })
    },
    menuSelect(sectionId, index) {
      let sectionList = this.course.sectionDtoList
      for (const section of sectionList) {
        if (section.sectionId === sectionId) {
          this.initActiveSection(section)
          break
        }
      }
    },
    getResourceType(resourcePath) {
      return "video/" + resourcePath.split(".")[resourcePath.split(".").length - 1]
    },
    initPageInfo() {
      this.commentInfo.current = 1
      this.commentInfo.size = 10
      this.commentInfo.rankType = 0
      this.commentInfo.total = 0
      this.commentInfo.commentList = []
    },
    initActiveSection(section) {
      this.initPageInfo()
      this.getComment(section.sectionId, 1, 10, 0)
      this.activeSection.sectionId = section.sectionId
      this.activeSection.title = section.sectionName
      this.activeSection.videoPath = section.resources[0].resourcePath
      this.activeSection.type = this.getResourceType(section.resources[0].resourcePath)
    },
    getComment(sectionId, current, size, rankType) {
      this.$api.sectionComment.getBySectionId(sectionId, current, size, rankType)
      .then(res => {
        this.commentInfo.commentList = res.data.list
        this.commentInfo.total = res.data.total
        console.log(this.commentInfo)
      })
    }
  },
  created() {
    this.initData()
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
}

.video-title span {
  margin-left: 30px;
  font-size: 25px;
  display: block;
  padding-top: 10px;
  color: #8bb721;
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
  margin-right: 15px;
}

.comment {
  margin: 20px auto;
  border-radius: 8px;
  width: 1000px;
  height: 1000px;
  background-color: #fff;
}
</style>
