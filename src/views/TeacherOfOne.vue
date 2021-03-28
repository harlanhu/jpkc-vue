<template>
  <div id="teacher">
    <div style="background-color:#5a79a3; border-radius: 8px">
      <div class="info">
        <div class="d-avatar">
          <avatar :size="100" :image="teacher.teacherAvatar"/>
        </div>
        <div class="content">
          <span style="font-size: 30px">{{teacher.teacherName}}</span>
          <div>
            <span style="font-size: 20px;">{{school.schoolName}}</span>
            <span style="font-size: 20px; margin: 0 5px">|</span>
            <span style="font-size: 20px;">{{teacher.teacherPost}}</span>
          </div>
          <div style="font-size: 16px; color: #272727; margin-top: 10px">
            {{teacher.teacherDesc}}
          </div>
        </div>
        <div class="school-content">
          <div class="d-avatar">
            <avatar :size="100" :image="school.schoolLogo"/>
          </div>
        </div>
      </div>
    </div>
    <div class="course">
      <div @click="linkToCourseDetail(course.courseId)" class="course-content" v-for="course in courseList">
        <course-card-a :course="course"/>
      </div>
      <div class="empty" style="visibility: hidden"></div>
      <div class="empty" style="visibility: hidden"></div>
      <div class="empty" style="visibility: hidden"></div>
    </div>
    <page-control :page-info="pageInfo"/>
  </div>
</template>

<script>
import PageControl from "@/components/common/PageControl";
import Avatar from "@/components/common/Avatar";
import CourseCardA from "@/components/content/CourseCardA";
export default {
  name: "TeacherOfOne",
  components: {CourseCardA, Avatar, PageControl},
  data() {
    return {
      teacher: {},
      courseList: [],
      pageInfo: {
        current: 1,
        size: 25,
        total: 0,
        pages: 0
      },
      school: {}
    }
  },
  methods: {
    getTeacher(teacherId) {
      this.$api.teacher.getOneById(teacherId)
      .then(res => {
        this.teacher = res.data
      })
    },
    getCourse(teacherId, current, size) {
      this.$api.course.getByTeacherId(teacherId, current, size)
      .then(res => {
        this.courseList = res.data.list
        this.pageInfo.size = res.data.size
        this.pageInfo.total = res.data.total
        this.pageInfo.pages = res.data.pages
      })
    },
    getSchool(teacherId) {
      this.$api.school.getByTeacherId(teacherId)
      .then(res => {
        this.school = res.data
      })
    },
    linkToCourseDetail(courseId) {
      this.$router.push("/courseDetail/" + courseId)
    }
  },
  created() {
    let teacherId = this.$route.params.teacherId
    this.getTeacher(teacherId)
    this.getCourse(teacherId, 1, 25)
    this.getSchool(teacherId)
  }
}
</script>

<style scoped>
.info {
  margin: 0 auto;
  width: 1200px;
  height: 100px;
  padding: 30px;
}

.d-avatar {
  border: white solid 3px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  float: left;
}

.content {
  height: 100px;
  float: left;
  width: 500px;
  margin-left: 50px;
}

.content span{
 color: white;
}

.school-content {
  float: right;
  margin-right: 30px;
}

.course {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.empty {
  width: 350px;
  height: 0;
  background-color: #ededed;
}
</style>
