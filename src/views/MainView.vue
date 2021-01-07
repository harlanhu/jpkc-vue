<template>
  <div id="content" style="height: 360px">
    <el-row type="flex"  justify="space-between">
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
  </div>
</template>

<script>
import TopAside from "@/components/content/main/TopAside/TopAside";
import Carousel from "@/components/common/Carousel";
import CourseType from "@/components/content/main/TopAside/CourseType";
import AccountInfo from "@/components/content/main/TopAside/AccountInfo";

export default {
  name: "MainView",
  components: {
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

</style>
