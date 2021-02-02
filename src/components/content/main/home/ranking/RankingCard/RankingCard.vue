<template>
  <div class="ranking-card">
    <div class="title">
      热门排行TOP50
      <span>HOT</span>
    </div>
    <!-- 内容 -->
    <el-carousel trigger="click" :loop="false" :autoplay="false" indicator-position="none" @change="changePage">
      <el-carousel-item v-for="page in pages">
          <div class="card-item" v-for="item in list">
            <span>1</span>
            <mini-card :course="item" class="mini-card"/>
          </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import MiniCard from "@/components/common/MiniCard";
export default {
  name: "RankingCard",
  components: {
    MiniCard
  },
  data() {
    return {
      current: 0,
      size: 5,
      pages: 0,
      list: []
    }
  },
  methods: {
    getCourseRanking() {
      this.$api.course.getRanking(this.current, this.size)
      .then(res => {
        this.pages = res.pages
        this.list = res.list
      })
    },
    changePage() {
      console.log("test")
    }
  },
  created() {
    this.getCourseRanking()
  }
}
</script>

<style scoped>
.ranking-card {
  background-color: #fff;
  width: 387px;
  height: 496px;
  border-radius: 4px;
}

.title {
  padding-top: 24px;
  font-size: 16px;
  font-weight: 600;
  margin: 24px 14px 22px;
  color: rgba(51, 51, 51, 1);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.5;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
}

.title span {
  float: right;
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
  color: #e2e2e2;
}

.card-item {
  margin-bottom: 20px;
  height: 63px;
}

.card-item span{
  position: relative;
  float: left;
  color: #fa5055;
  font-size: 20px;
  margin-right: 14px;
  margin-left: 10px;
  text-align: center;
}

.mini-card {
  position: relative;
  float: left;
}
</style>
