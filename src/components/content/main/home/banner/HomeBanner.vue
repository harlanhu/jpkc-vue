<template>
  <div id="home-banner">
    <el-row type="flex" justify="space-between">
      <!-- 左边栏 -->
      <el-col :span="4">
        <top-aside>
          <course-type/>
        </top-aside>
      </el-col>
      <!-- 轮播图 -->
      <el-col :span="15">
        <carousel :items="carouselItems"/>
      </el-col>
      <!-- 右边栏 -->
      <el-col :span="4">
        <top-aside>
          <account-info/>
        </top-aside>
      </el-col>
    </el-row>
    <!-- 底边栏 -->
    <div id="school">
      <school :school-items="schoolItems"/>
    </div>
  </div>
</template>

<script>
import TopAside from "@/components/content/main/home/banner/TopAside/TopAside";
import Carousel from "@/components/common/Carousel";
import CourseType from "@/components/content/main/home/banner/TopAside/CourseType";
import AccountInfo from "@/components/content/main/home/banner/TopAside/AccountInfo";
import School from "@/components/content/main/home/banner/school/School";

export default {
  name: "HomeBanner",
  components: {
    School,
    AccountInfo,
    CourseType,
    Carousel,
    TopAside
  },
  data() {
    return {
      carouselItems: [],
      schoolItems: [],
    }
  },
  methods: {
    getCarouselItems() {
      this.$api.layout.getCarousel(1, 100)
      .then(res => {
        this.carouselItems = res.data.list
      })
    },
    getSchool() {
      this.$api.layout.getSchool()
      .then(res => {
        this.schoolItems = res.data
      })
    }
  },
  created() {
    this.getCarouselItems()
    this.getSchool()
  }
}
</script>

<style scoped>
#school {
  margin-top: 15px;
  height: 60px;
}
</style>
