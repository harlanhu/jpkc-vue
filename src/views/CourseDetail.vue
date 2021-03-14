<template>
  <div id="course-details">
    <div class="course-info">
      <div class="course-logo">
        <el-image style="width: 510px; height: 228px" :src="course.courseLogo"></el-image>
      </div>
      <div class="course-detail">
        <span class="course-title">{{course.courseName}}</span>
        <el-tag size="medium" v-if="course.categoryList">{{course.categoryList[0].categoryName}}</el-tag>
        <div class="course-time">
          <div>
            <span>创建时间:&nbsp;&nbsp;{{course.courseCreated}}</span>
            <span>更新时间:&nbsp;&nbsp;{{course.courseUpdated}}</span>
          </div>
          <div class="time1">
            <span>课程价格: &nbsp;&nbsp;{{coursePrice}}</span>
            <span>课程学时:&nbsp;&nbsp;{{course.courseHour}}&nbsp;&nbsp;小时</span>
          </div>
        </div>
        <div class="course-views">
          <span>已有&nbsp;&nbsp; {{course.courseViews}} &nbsp;&nbsp;人观看</span>
          <el-button type="success">立即收藏</el-button>
        </div>
      </div>
    </div>
    <div class="section-info" v-if="course.teacher">
      <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="menuHandleSelect">
        <el-menu-item index="1">课程详情</el-menu-item>
        <el-menu-item index="2">课程评价</el-menu-item>
      </el-menu>
      <div class="section-1" v-if="activeIndex === '1'">
        <div class="course-desc">
          {{course.courseDesc}}
          <p>——&nbsp;&nbsp;{{course.teacher.teacherName}}</p>
        </div>
        <div class="bg-1"></div>
        <div class="section-list">
          <h1 style="text-align: center; font-size: 24px">课程大纲</h1>
          <div class="section-of-one" v-for="(section, index) in course.sectionDtoList">
            <h1>{{"- 第 " + (index + 1) + " 章: "}}<span style="color: #8bb721">{{section.sectionName}}</span></h1>
            <div class="section-desc">
              {{section.sectionDesc}}
            </div>
          </div>
        </div>
      </div>
      <router-view/>
    </div>
    <div class="school-info" v-if="course.school && course.teacher">
      <div class="school-logo">
        <el-image style="width: 200px; height: 200px" :src="course.school.schoolLogo"></el-image>
      </div>
      <div class="bg-2"></div>
      <div class="teacher-info">
        <div class="bg-3"></div>
        <div class="teacher-from">{{course.school.schoolName}}&nbsp;&nbsp;老师授课</div>
        <div class="teacher-avatar">
          <el-avatar style="float: left" :size="60" :src="course.teacher.teacherAvatar"></el-avatar>
        </div>
        <div class="teacher-detail">
          <p style="font-size: 16px">{{course.teacher.teacherName}}</p>
          <p style="font-size: 12px; color: #666">{{course.teacher.teacherPost}}</p>
        </div>
      </div>
    </div>
    <div class="course-about">
      <div class="about">
        <div class="bg-3"></div>
        <span style="font-size: 18px">相关课程</span>
        <div class="about-item" v-for="courseAbout in courseAbout">
          <mini-card v-if="course.courseId !== courseAbout.courseId" :course="courseAbout"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MiniCard from "@/components/common/MiniCard";
export default {
  name: "CourseDetail",
  components: {MiniCard},
  data() {
    return {
      activeIndex: "1",
      course: {
        categoryList: [
          {
            categoryName: ""
          }
        ]
      },
      courseAbout: []
    }
  },
  computed: {
    coursePrice() {
      if (0 === this.course.coursePrice) {
        return "免费"
      } else {
        return this.course.coursePrice + " 元"
      }
    }
  },
  methods: {
    getCourse() {
      console.log(this.$ls.getParams().courseId)
      this.$api.course.getCourseById(this.$ls.getParams().courseId)
      .then(res => {
        this.course = res.data
        this.getCourseAbout(res.data.categoryList[0].categoryId)
      })
    },
    menuHandleSelect(key, keyPath) {
      this.activeIndex = key
    },
    getCourseAbout(categoryId) {
      this.$api.course.getAboutByCategoryId(categoryId)
      .then(res => {
        this.courseAbout = res.data
      })
    }
  },
  created() {
    this.getCourse()
  }
}
</script>

<style scoped>
#course-details {
  width: 1200px;
  margin: 0 auto;
}

.course-info {
  height: 260px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.course-logo {
  margin-top: 15px;
  margin-left: 15px;
  float: left;
}

.course-detail {
  float: left;
  margin-left: 60px;
  margin-top: 15px;
}

.course-title {
  float: left;
  font-size: 24px;
  margin-right: 20px;
  color: #333;
}

.course-time {
  margin-top: 50px;
  width: 540px;
  height: 95px;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 10px;
}

.course-time div{
  float: left;
}

.time1 {
  margin-left: 100px;
}

.course-time span {
  margin-top: 15px;
  margin-left: 10px;
  display: flex;
  font-size: 16px;
  color: #666;
}

.course-views {
  margin-top: 20px;
}

.course-views span {
  color: #666;
  font-size: 14px;
  margin-right: 30px;
}

.section-info {
  width: 850px;
  padding: 10px;
  margin-top: 20px;
  background-color: #fff;
  float: left;
}

.course-desc {
  margin: 20px 20px;
  border-radius: 8px;
  padding: 20px;
  color: #333;
  font-size: 14px;
  background-color: #f5f8f4;
}

.course-desc p {
  font-size: 16px;
  text-align: right;
}

.section-list {
  color: #666;
}

.section-list h1 {
  margin-bottom: 5px;
}

.section-of-one {
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 10px;
}

.section-desc {
  font-size: 14px;
}

.school-info {
  width: 300px;
  float: left;
  background-color: #fff;
  margin-left: 30px;
  margin-top: 20px;
}

.school-logo {
  margin-top: 20px;
  text-align: center;
}

.teacher-info {
  margin: 0 10%;
}

.teacher-from {
  font-size: 18px;
}

.teacher-avatar {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 60px;
  width: 60px;
  float: left;
}

.teacher-detail {
  position: relative;
  top: 10px;
  margin-top: 20px;
  margin-left: 75px;
}

.course-about {
  float: left;
  width: 300px;
  background-color: #fff;
  margin-left: 30px;
  margin-top: 20px;
}

.about {
  padding: 30px 30px;
}

.about-item {
  margin-top: 20px;
}

.bg-1 {
  width: 100%;
  height: 1px;
  margin-bottom: 20px;
  background-color: #999;
}

.bg-2 {
  margin: 20px auto;
  width: 80%;
  height: 1px;
  background-color: #ccc;
}

.bg-3 {
  float: left;
  background-color: #00c758;
  height: 24px;
  width: 4px;
  margin-right: 10px;
}

.el-image {
  border-radius: 8px;
}

.el-tag {
  float: left;
}
</style>
