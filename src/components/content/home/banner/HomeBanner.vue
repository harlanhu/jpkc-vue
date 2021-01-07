<template>
  <div id="home-banner">
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <top-aside>
          <course-type/>
        </top-aside>
      </el-col>
      <el-col :span="15">
        <carousel :items="carouselItems"/>
      </el-col>
      <el-col :span="4">
        <top-aside>
          <account-info/>
        </top-aside>
      </el-col>
    </el-row>
    <div id="school">
      <school/>
    </div>
  </div>
</template>

<script>
import TopAside from "@/components/content/home/banner/TopAside/TopAside";
import Carousel from "@/components/common/Carousel";
import CourseType from "@/components/content/home/banner/TopAside/CourseType";
import AccountInfo from "@/components/content/home/banner/TopAside/AccountInfo";
import School from "@/components/content/home/banner/school/School";

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
      carouselItems: ["测试数据1", "测试数据2", "测试数据3", "测试数据4", "测试数据5"]
    }
  }
}
</script>

<style scoped>
#school {
  margin-top: 15px;
  height: 60px;
}
</style>
