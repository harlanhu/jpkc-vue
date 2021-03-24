<template>
  <div id="recommend">
    <p class="recommend-title">编辑推荐</p>
    <el-carousel trigger="click" :loop="false" :autoplay="false" indicator-position="none" @change="changePage">
      <el-carousel-item v-for="page in pages">
        <div v-if="sonRefresh" class="recommend-content">
        <div :class="{active: isSizeActive, recommendItem: !isSizeActive}" @click="linkToCourseDetail(item.courseId)" v-for="item in list">
          <large-card :data="item"/>
        </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import LargeCard from "@/components/common/LargeCard";
export default {
  name: "Recommend",
  data() {
    return {
      list: [],
      current: 1,
      size: 5,
      total: 0,
      pages: 0,
      sonRefresh: true,
    }
  },
  components: {
    LargeCard
  },
  methods: {
    getRecommend() {
      this.$api.course.getRecommend(this.current, this.size)
      .then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.pages = res.data.pages
      })
    },
    changePage(current, index) {
      if (current >= index) {
        this.current ++
      }else {
        this.current --
      }
      this.sonRefresh= false
      this.$nextTick(() => {
        this.sonRefresh= true
      });
      this.getRecommend()
    },
    linkToCourseDetail(courseId) {
      this.$router.push("courseDetail/" + courseId)
    }
  },
  computed: {
    isSizeActive() {
      if (this.list.length < this.size) return true
    }
  },
  created() {
    this.getRecommend()
  }
}
</script>

<style scoped>
.recommend-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 13px;
}

.recommend-content {
  display: flex;
}

.recommendItem {
  flex: 1;
}

.active {
  float: right;
  margin-right: 15px;
}
</style>
