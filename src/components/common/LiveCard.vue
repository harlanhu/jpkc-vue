<template>
  <div id="live-card">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div id="date">
        <div class="live-date">{{ date }}</div>
      </div>
      <div class="avatar">
        <avatar :size="52"/>
      </div>
      <div class="detail">
        <p class="detail-title">{{ info }}</p>
        <p class="detail-author">{{ author }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import Avatar from "@/components/common/Avatar";

export default {
  name: "LiveCard",
  components: {
    Avatar
  },
  props: {
    date: {
      type: String,
      default: "暂无数据"
    },
    info: {
      type: String,
      default: "暂无数据"
    },
    author: {
      type: String,
      default: "暂无数据"
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
#live-card {
  width: 285px;
  height: 126px;
}

#date {
  margin-top: 15px;
  margin-left: 15px;
  width: 133px;
  height: 20px;
}

.el-card {
  height: 126px;
}

.live-date {
  font-size: 12px;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  padding: 0 10px 0 17px;
  position: relative;
  margin-bottom: 12px;
  color: rgba(153, 153, 153, 1);
  background-color: rgba(245, 245, 245, 1);
}

.avatar {
  position: relative;
  margin-left: 15px;
  margin-top: 12px;
  height: 52px;
  width: 52px;
  float: left;
}

.detail {
  float: left;
  margin-left: 15px;
  margin-top: 12px;
}

.detail-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 5px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.detail-author {
  font-size: 12px;
  color: #999;
}
</style>
