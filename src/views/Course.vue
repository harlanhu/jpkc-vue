<template>
  <div id="course">
    <course-list
        :page-info="pageInfo"
        @prevPage="prevPage"
        @nextPage="nextPage"
        @currentChange="currentChange">
      <div slot="category" class="categories">
        <el-button size="small" round>全部</el-button>
        <el-button size="small" round v-for="category in categories" :key="category.categoryId">{{category.categoryName}}</el-button>
      </div>
      <div slot="course" v-for="course in courseList">
        <div class="class-card">
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
      courseList: []
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
      this.$api.course.getAll(this.pageInfo.current, this.pageInfo.size)
      .then(res => {
        this.courseList = res.data.list
        this.pageInfo.pages = res.data.pages
        this.pageInfo.total = res.data.total
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
