<template>
  <div id="course">
    <course-list
        :page-info="pageInfo"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @currentChange="currentChange"
        @menuSelect="menuSelectHandler">
      <div slot="category" class="categories">
        <el-button @click="categorySelectHandler('0')" size="small" round>全部</el-button>
        <el-button @click="categorySelectHandler(category.categoryId)" size="small" round v-for="category in categories" :key="category.categoryId">{{category.categoryName}}</el-button>
      </div>
      <div slot="course" v-for="course in courseList">
        <div class="class-card" @click="linkToCourseDetail(course.courseId)">
          <course-card-a :course="course"/>
        </div>
      </div>
    </course-list>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import CourseList from "@/components/common/CourseList";
import CourseCardA from "@/components/content/CourseCardA";

export default {
  name: "Course",
  components: {CourseCardA, CourseList},
  data() {
    return {
      categories: {},
      pageInfo: {
        current: 1,
        size: 25,
        total: 0,
        pages: 0
      },
      courseList: [],
      activeType: {
        categoryId: "0",
        type: 0,
      }
    }
  },
  methods: {
    getAllCategory() {
      this.$api.category.getAllCategory()
      .then(res => {
        this.categories = res.data
      })
    },
    prevPage(val) {
      this.pageInfo.current = val
    },
    nextPage(val) {
      this.pageInfo.current = val
    },
    currentChange(val) {
      this.pageInfo.current = val
    },
    getAllCourse() {
      if (this.$route.params.categoryId === "" || typeof(this.$route.params.categoryId) === 'undefined') {
        this.$api.course.getAll(this.pageInfo.current, this.pageInfo.size)
            .then(res => {
              this.courseList = res.data.list
              this.pageInfo.pages = res.data.pages
              this.pageInfo.total = res.data.total
            })
      }else {
        this.getOpenByTypeAndCategory(1, 25, this.activeType.type, this.$route.params.categoryId)
        .then(res => {
          this.activeType.categoryId = this.$route.params.categoryId
          this.courseList = res.data.list
          this.pageInfo.pages = res.data.pages
          this.pageInfo.total = res.data.total
        })
      }
    },
    getOpenByTypeAndCategory(current, size, type, categoryId) {
      this.$api.course.getOpenByTypeAndCategory(current, size, type, categoryId)
      .then(res => {
        this.courseList = res.data.list
        this.pageInfo.pages = res.data.pages
        this.pageInfo.total = res.data.total
        this.pageInfo.current = res.data.current
      })
    },
    menuSelectHandler(key) {
      this.activeType.type = key
      this.pageInfo.current = 1
      this.getOpenByTypeAndCategory(this.pageInfo.current, this.pageInfo.size, this.activeType.type, this.activeType.categoryId)
    },
    categorySelectHandler(categoryId) {
      this.activeType.categoryId = categoryId
      this.getOpenByTypeAndCategory(this.pageInfo.current, this.pageInfo.size, this.activeType.type, this.activeType.categoryId)
    },
    linkToCourseDetail(courseId) {
      console.log(courseId)
      this.$router.push({
        name: 'courseDetail',
        params: {
          courseId: courseId
        }
      })
    }
  },
  created() {
    this.getAllCategory()
    this.getAllCourse()
  }
}
</script>

<style scoped>
#course {
  margin: 0 auto;
  overflow: hidden;
  width: 1200px;
}

.categories {
  margin: 0 auto;
  padding: 10px 10px;
}

.class-card {
  width: 228px;
  height: 100%;
  margin-left: 17px;
  margin-bottom: 20px;
}

</style>
