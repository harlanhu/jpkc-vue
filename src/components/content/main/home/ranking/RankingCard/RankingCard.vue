<template>
  <div class="ranking-card">
    <div class="title">
      <slot></slot>
    </div>
    <!-- 内容 -->
    <el-carousel trigger="click" :loop="false" :autoplay="false" indicator-position="none" @change="changePage" height="425px">
      <el-carousel-item v-for="page in pages">
        <div class="card-item" v-for="(item, index) in list">
          <span :class="isNum(getIndexNum(index))">{{getIndexNum(index)}}</span>
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
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    pages: {
      type: Number,
      default: 0
    }
  },
  components: {
    MiniCard
  },
  data() {
    return {
      current: 1,
      size: 5,
      sonRefresh: true,
    }
  },
  methods: {
    changePage(current, index) {
      if (current >= index) {
        this.current ++
      }else {
        this.current --
      }
      this.sonRefresh = false
      this.$nextTick(() => {
        this.sonRefresh = true
      })
      this.$emit("changePage", this.current, this.size)
    },
    getIndexNum(index) {
      return ((this.current - 1) * this.size) + (index + 1)
    },
    isNum(index) {
      switch (index) {
        case 1:
          return {first: true}
        case 2:
          return {second: true}
        case 3:
          return {third: true}
        default:
          return {other: true}
      }
    }
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
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
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

.card-item span {
  position: relative;
  text-align: right;
  float: left;
  font-size: 20px;
  margin-right: 14px;
  margin-left: 10px;
  width: 15px;
}

.first {
  color: #FA5055;
}

.second {
  color: #FF7130;
}

.third {
  color: #FFB425;
}

.other {
  color: #b8b8b8;
}

.mini-card {
  position: relative;
  float: left;
}
</style>
