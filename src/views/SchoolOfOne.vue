<template>
  <div id="school-of-one">
    <div class="bgc">
      <div class="banner">
        <div class="banner-bg"></div>
        <div class="banner-avatar">
          <img class="school-logo" :src="school.schoolLogo" alt="加载失败">
        </div>
      </div>
    </div>
    <div class="school-doc">
      <div class="b-20"></div>
      <div class="doc">
        <div class="doc-content">
          <h1>{{school.schoolName}}</h1>
          <p class="school-desc">{{school.schoolDesc}}</p>
        </div>
      </div>
    </div>
    <div class="b-30"></div>
    <div class="school-class">
      <p>课程</p>
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">全部</el-menu-item>
        <el-menu-item index="2">人气</el-menu-item>
        <el-menu-item index="3">收藏</el-menu-item>
        <el-menu-item index="4">免费</el-menu-item>
        <el-menu-item index="5">付费</el-menu-item>
        <div class="search">
          <search-input/>
        </div>
      </el-menu>
    </div>
    <div class="school-class-item">
      <div class="class-card" v-for="course in courseList">
        <div @click="linkToCourseDetail(course.courseId)">
        <el-card :body-style="{ padding: '0px'}" shadow="hover">
          <img class="class-logo" :src="course.courseLogo" alt="加载失败">
          <div class="class-info">
            <span class="class-title">{{course.courseName}}</span>
            <span class="class-schedule">总共 {{course.courseHour}} 个学时</span>
          </div>
          <div class="school-info">
            <span class="school-name">{{school.schoolName}}</span>
            <span class="follow"><i class="el-icon-user"/>{{course.courseViews}}</span>
          </div>
        </el-card>
        </div>
      </div>
    </div>
    <div class="page-control">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="pageInfo.total"
          :page-count="pageInfo.pages"
          :page-size="pageInfo.size"
          :current-page="pageInfo.currentPage"
          @prev-click="prevPage"
          @next-click="nextPage"
          @current-change="currentChange"
          :hide-on-single-page="true">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/common/SearchInput";
export default {
  name: "SchoolOfOne",
  components: {SearchInput},
  data() {
    return {
      activeIndex: '1',
      school: {},
      pageInfo: {
        current: 1,
        size: 25,
        total: 0,
        pages: 0
      },
      courseList: []
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    getSchoolInfo() {
      this.$api.school.getByName(this.$route.params.school)
      .then(res => {
        this.school = res.data
        if (res.data.schoolId) {
          this.getCourseBySchoolId(res.data.schoolId)
        }
      })
    },
    getCourseBySchoolId(schoolId) {
      this.$api.course.getBySchoolId(schoolId, this.pageInfo.current, this.pageInfo.size)
      .then(res => {
        this.courseList = res.data.list
        this.pageInfo.total = res.data.total
        this.pageInfo.pages = res.data.pages
      })
    },
    prevPage(val) {
      if (this.pageInfo.current <= 1) {
        console.log("不能往前翻页了!")
      } else {
        this.pageInfo.current = val
        this.getCourseBySchoolId(this.school.schoolId)
      }
    },
    nextPage(val) {
      if (this.pageInfo.current >= this.pageInfo.pages) {
        console.log("不能往后翻页了！")
      } else {
        this.pageInfo.current = val
        this.getCourseBySchoolId(this.school.schoolId)
      }
    },
    currentChange(val) {
      if (this.pageInfo.current < 1 || this.pageInfo.current > this.pageInfo.pages) {
        console.log("页面错乱了！")
      } else {
        this.pageInfo.current = val
        this.getCourseBySchoolId(this.school.schoolId)
      }
    },
    linkToCourseDetail(courseId) {
      this.$router.push({
        name: 'courseDetail',
        params: {
          courseId: courseId
        }
      })
    }
  },
  created() {
    this.getSchoolInfo()
  }
}
</script>

<style scoped>
#school-of-one {
  margin: 0 auto;
  overflow: hidden;
}

.bgc {
  background-color: #000;
  border-radius: 4px;
}

.banner {
  margin: 0 auto;
  background-color: #000;
  border-radius: 4px;
  width: 1200px;
  height: 200px;
}

.banner-bg {
  padding: 0;
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: url(https://img-ph-mirror.nosdn.127.net/SkD-CO-sd86gJDlfsRix0A==/6608230909190265551.jpg) no-repeat center center;
  box-shadow: inset 50px 0 120px -20px #000000, inset 50px 0 120px -40px #000000, inset -50px 0 120px -20px #000000, inset -50px 0 120px -40px #000000, inset 0 10px 10px -10px #000000, inset 0 -10px 10px -10px #000000;
}

.school-logo {
  width: 150px;
  height: 150px;
  border-radius: 81px;
}

.banner-avatar {
  position: relative;
  border: 6px solid white;
  border-radius: 81px;
  left: 150px;
  bottom: 75px;
  background-color: #fff;
  width: 150px;
  height: 150px;
}

.school-doc {
  width: 1205px;
  margin: 0 auto;
  outline: none;
  box-sizing: border-box;
}

.b-20 {
  height: 20px;
  clear: both;
  overflow: hidden;
  display: block;
}

.doc {
  height: 100px;
  width: 100%;
}

.doc-content {
  position: relative;
  left: 370px;
  width: 800px;
  height: 100px;
}

.doc-content h1 {
  font-size: 20px;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0;
  color: rgba(0, 0, 0, .85);
  font-weight: 600;
}

.doc-content p {
  font-size: 14px;
  padding-right: 55px;
  margin-top: 15px;
  color: #666;
}

.b-30 {
  height: 80px;
  clear: both;
}

.school-class {
  margin: 0 auto;
  width: 1205px;
}

.school-class p {
  font-size: 20px;
  margin-bottom: 20px;
}

.el-menu {
  border-radius: 4px;
}

.search {
  position: relative;
  left: 620px;
  top: 13px;
}

.school-desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
}

.school-class-item {
  width: 1240px;
  margin: 20px auto 20px auto;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.class-card {
  width: 228px;
  height: 100%;
  margin-left: 17px;
  margin-bottom: 20px;
}

.class-logo {
  transition: all 0.3s cubic-bezier(0, 0.5, 0.5, 1) 0s;
  width: 228px;
  height: 128px;
  vertical-align: middle;
}

.class-info {
  margin-top: 10px;
  margin-left: 10px;
}

.class-title {
  line-height: 24px;
  display: inline-block;
  width: 100%;
  font-family: 微软雅黑, 'Microsoft YaHei',serif;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  text-align: left;
  vertical-align: middle;
}

.class-schedule {
  color: #00c758;
  box-sizing: border-box;
  font-family: 微软雅黑, 'Microsoft YaHei',serif;
  text-align: left;
  vertical-align: middle;
  width: 100%;
  display: inline-block;
}

.school-info {
  margin-top: 35px;
  margin-bottom: 10px;
}

.school-name {
  display: inline-block;
  width: 124px;
  font-family: 微软雅黑, "Microsoft YaHei",serif;
  font-size: 12px;
  color: #999;
  text-align: left;
  vertical-align: middle;
}

.follow {
  display: inline-block;
  width: 80px;
  font-size: 12px;
  color: #999;
  text-align: right;
  vertical-align: middle;
}

.page-control {
  text-align: center;
  margin-bottom: 20px;
}
</style>
