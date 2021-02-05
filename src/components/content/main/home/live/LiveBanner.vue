<template>
  <div id="live-banner">
    <p class="live-banner-title">最近直播</p>
    <el-carousel trigger="click" :loop="false" :autoplay="false" indicator-position="none" @change="changePage">
      <el-carousel-item v-for="page in pages">
        <div v-if="sonRefresh" class="content">
          <div class="content-item" v-for="item in dataList">
            <live-card :data="item"/>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import LiveCard from "@/components/common/LiveCard";

export default {
  name: "LiveBanner",
  components: {
    LiveCard
  },
  data() {
    return {
      dataList: [],
      current: 1,
      pages: 0,
      total: 0,
      sonRefresh: true
    }
  },
  methods: {
    getLiveCourse(current, size) {
      this.$api.liveCourse.getAll(current, size)
      .then(res => {
        console.log(res.data.list)
        this.dataList = res.data.list
        this.pages = res.data.pages
        this.total = res.data.total
      })
    },
    changePage() {

    }
  },
  created() {
    this.getLiveCourse(1, 8)
  }
}
</script>

<style scoped>
.live-banner-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 13px;
}

.content {
}

.content-item {
  float: left;
  margin-right: 15px;
  margin-top: 15px;
}

</style>
