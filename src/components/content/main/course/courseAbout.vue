<template>
  <div id="about">
    <div class="bg-3"></div>
    <span style="font-size: 18px">相关推荐</span>
    <div class="about-item" @click="linkToCourseDetail(courseAbout.courseId)" v-for="courseAbout in courseAboutList">
      <mini-card v-if="course.courseId !== courseAbout.courseId" :course="courseAbout"/>
    </div>
  </div>
</template>

<script>
import MiniCard from "@/components/common/MiniCard";

export default {
  name: "courseAbout",
  components: {
    MiniCard
  },
  props: {
    course: Object,
  },
  data() {
    return {
      courseDetail: this.course,
      categoryId: String,
      courseAboutList: [],
    }
  },
  methods: {
    linkToCourseDetail(courseId) {
      this.$router.push('/courseDetail/' + courseId)
      this.getCourse(courseId)
    },
    getCourseAbout(categoryId) {
      this.$api.course.getAboutByCategoryId(categoryId)
          .then(res => {
            this.courseAboutList = res.data
          })
    }
  },
  watch: {
    course(val) {
      this.courseDetail = val
      this.categoryId = val.categoryList[0].categoryId
      this.getCourseAbout(this.categoryId)
    }
  }
}
</script>

<style scoped>
#about {
  padding: 30px 30px;
}

.bg-3 {
  float: left;
  background-color: #00c758;
  height: 24px;
  width: 4px;
  margin-right: 10px;
}

.about-item {
  margin-top: 20px;
}

</style>
