<template>
  <div id="course-play">
    <exam-dialog :exams="exams" :course="course" @updateMark="updateMark"/>
    <div class="menu">
      <nav-menu :section-list="course.sectionDtoList" @select="menuSelect"/>
      <div class="section-info">
        <p style="text-align: center; font-size: 16px; color: #00c758">章节描述</p>
        <div style="font-size: 14px; color: #999; margin-top: 5px">
          {{activeSection.sectionDesc}}
        </div>
        <el-button style="margin: 30px 30px 10px 10px;" type="primary" size="small" @click="downloadPpt">课件下载</el-button>
      </div>
      <div class="section-info">
        <p style="text-align: center; color: #00c558; font-size: 16px">成绩检测</p>
        <div style="font-size: 24px; text-align: center; margin-top: 10px; color: #00c758" v-if="isExistScore">
          当前成绩：{{score.mark}}分
        </div>
        <div style="margin-top: 5px; font-size: 14px; color: #999" v-else>
          暂无课程成绩，点击在线检测
        </div>
        <el-button v-if="isExistScore" style="margin: 30px 30px 10px 10px; float: right" type="primary" size="small" @click="examOnline">重新检测</el-button>
        <el-button  v-else style="margin: 10px 30px 10px 10px; float: right" type="primary" size="small" @click="examOnline">在线检测</el-button>
      </div>
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
      <div class="comment-input">
        <el-input v-model="comment" type="textarea" :autosize="{minRows: 5, maxRows: 5}" placeholder="留下你的评论"></el-input>
        <div class="comment-button">
          <el-button @click="publishComment" type="primary">发表</el-button>
        </div>
      </div>
      <div class="gl-1"></div>
      <div class="comment-content">
        <h1>评论内容</h1>
        <el-tabs v-model="commentInfo.activeTagName" @tab-click="tabHandleClick">
          <el-tab-pane label="热评" name="1"></el-tab-pane>
          <el-tab-pane label="倒叙" name="2"></el-tab-pane>
          <el-tab-pane label="最新" name="0"></el-tab-pane>
        </el-tabs>
        <div v-if="commentInfo.commentList.length === 0">
          <span style="font-size: 18px; color: #666; text-align: center;">暂无评论</span>
        </div>
        <div v-else>
          <div class="comment-detail" v-for="(comment, index) in commentInfo.commentList">
            <div class="content-avatar">
              <avatar :image="comment.userAvatar" :size="50"/>
            </div>
            <div class="content-detail">
              <h1 style="margin-top: 23px">{{comment.userName}}</h1>
              <span style="font-size: 14px">{{comment.commentContent}}</span>
              <a @click="likeSComment(comment.commentId, index)" style="float: right"><i class="el-icon-thumb"></i>点赞{{comment.commentStar}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VPlayer from "@/components/common/VPlayer";
import NavMenu from "@/components/common/NavMenu";
import CourseAbout from "@/components/content/main/course/courseAbout";
import Avatar from "@/components/common/Avatar";
import ExamDialog from "@/components/content/dialog/course/ExamDialog";

export default {
  name: "CoursePlay",
  components: {
    ExamDialog,
    Avatar,
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
        sectionDesc: ""
      },
      commentInfo: {
        current: 1,
        size: 10,
        total: 0,
        rankType: 0,
        pages: 0,
        commentList: [],
        activeTagName: "1"
      },
      comment: "",
      exams: [],
      isExistScore: false,
      score: {}
    }
  },
  methods: {
    initData() {
      this.$api.course.getCourseById(this.$route.params.courseId)
      .then(res => {
        this.course = res.data
        let sectionList = res.data.sectionDtoList
        this.initActiveSection(sectionList[0])
        this.$api.exam.getByCourseId(this.course.courseId)
        .then(res => {
          this.exams = res.data
        })
        this.$api.score.exist(this.course.courseId)
        .then(res => {
          this.isExistScore = res.data
          if (res.data === true) {
            this.$api.score.getByCourseId(this.course.courseId)
            .then(res => {
              console.log(res.data)
              this.score = res.data
            })
          }
        })
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
      this.commentInfo.pages = 0
      this.commentInfo.commentList = []
      this.commentInfo.activeTagName = "1"
    },
    initActiveSection(section) {
      this.initPageInfo()
      this.getComment(section.sectionId, 1, 10, 0)
      this.activeSection.sectionId = section.sectionId
      this.activeSection.title = section.sectionName
      this.activeSection.videoPath = section.resources[0].resourcePath
      this.activeSection.type = this.getResourceType(section.resources[0].resourcePath)
      this.activeSection.sectionDesc = section.sectionDesc
    },
    getComment(sectionId, current, size, rankType) {
      this.$api.sectionComment.getBySectionId(sectionId, current, size, rankType)
      .then(res => {
        this.commentInfo.commentList = res.data.list
        this.commentInfo.total = res.data.total
        this.commentInfo.pages = res.data.pages
      })
    },
    tabHandleClick(tab, event) {
      this.getComment(this.activeSection.sectionId, 1, 10, tab.name)
    },
    likeSComment(commentId, index) {
      this.$api.sectionComment.like(commentId)
      .then(res => {
        this.commentInfo.commentList[index].commentStar ++
      })
    },
    publishComment() {
      this.$api.sectionComment.save(this.activeSection.sectionId, this.comment, 0)
      .then(res => {
        this.comment = ''
        this.getComment(this.activeSection.sectionId, 1, 10, 0)
      })
    },
    examOnline() {
      this.$bus.$emit("activeExamOnline", true)
    },
    downloadPpt() {
      window.location.href = this.course.coursePpt;
    },
    updateMark(value) {
      this.score.mark = value
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
  width: 984px;
  background-color: #fff;
  padding: 8px 8px;
}

.comment-button {
  margin-top: 10px;
  float: right;
}

.comment-content {
  margin-top: 30px;
}

.comment-detail {
  margin-top: 10px;
  height: 100px;
}

.gl-1 {
  width: 100%;
  margin-top: 80px;
  height: 1px;
  background-color: #999;
}

.content-avatar {
  float: left;
  margin-top: 25px;
  margin-left: 10px;
}

.content-detail {
  float: left;
  margin-left: 20px;
  width: 800px;
}

.section-info {
  border-radius: 8px;
  background-color: #fff;
  padding: 8px;
  width: 95%;
  float: left;
  margin-top: 20px;
}
</style>
