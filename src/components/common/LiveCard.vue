<template>
  <div id="live-card">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div id="date">
        <div class="live-date">{{ date }}</div>
      </div>
      <div id="info">
        <avatar :size="52"/>
        <p>{{ info }}</p>
        <p>{{ author }}</p>
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

#info {
  margin-top: 15px;
  margin-left: 8px;
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
</style>
