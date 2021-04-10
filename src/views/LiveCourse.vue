<template>
  <div id="live-course">
    <div class="menu">
      <el-menu style="border-radius: 8px" :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleMenuSelect">
        <el-menu-item index="0">全部直播</el-menu-item>
        <el-menu-item index="1">正在直播</el-menu-item>
      </el-menu>
    </div>
    <div class="live-card-div" v-if="lCourseList.length > 0">
      <div @click="linkToLivePlay(lCourse.liveCourseId)" class="live-card" v-for="lCourse in lCourseList">
        <live-course-card :l-course="lCourse"></live-course-card>
      </div>
    </div>
    <div class="page-control">
      <page-control :page-info="pageInfo"
                    @prevPage="prevPage"
                    @nextPage="nextPage"
                    @currentChange="currentChange">
      </page-control>
    </div>
  </div>
</template>

<script>
import PageControl from "../components/common/PageControl";
import LiveCourseCard from "../components/common/LiveCourseCard";

export default {
  name: "LiveCourse",
  components: {LiveCourseCard, PageControl},
  data() {
    return {
      activeIndex: '0',
      lCourseList: [],
      pageInfo: {
        current: 1,
        size: 25,
        total: 0,
        pages: 0
      }
    }
  },
  methods: {
    handleMenuSelect(key, keyPath) {
      if (key === '0') {
        this.getAllLCourse(1, 25)
      } else {
        this.getLCourseLiving(1, 25)
      }
    },
    getAllLCourse(current, size) {
      this.$api.liveCourse.getAll(current, size)
      .then (res => {
        this.lCourseList = res.data.list
        this.pageInfo.total = res.data.total
        this.pageInfo.pages = res.data.pages
        this.pageInfo.current = res.data.current
        this.pageInfo.size = res.data.size
      })
    },
    getLCourseLiving(current, size) {
      this.$api.liveCourse.getByLiving(current, size)
      .then (res => {
          this.lCourseList = res.data.list
          this.pageInfo.total = res.data.total
          this.pageInfo.pages = res.data.pages
          this.pageInfo.current = res.data.current
          this.pageInfo.size = res.data.size

        })
    },
    prevPage(val) {
      console.log(val)
    },
    nextPage(val) {
      console.log(val)
    },
    currentChange(val) {
      console.log(val)
    },
    linkToLivePlay(lCourseId) {
      this.$router.push("/live-play/" + lCourseId)
    }
  },
  created() {
    this.getAllLCourse(this.pageInfo.current, this.pageInfo.size)
  }
}
</script>

<style scoped>
#live-course {
  margin: 0 auto;
  width: 1200px;
}

.menu {
  border-radius: 8px;
  overflow: hidden;
}

.live-card {
  width: 228px;
  height: 100%;
  margin-left: 17px;
  margin-bottom: 20px;
}

.live-card-div {
  width: 1240px;
  margin: 20px auto 20px -35px;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
