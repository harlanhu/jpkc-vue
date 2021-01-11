<template>
  <div id="large-card">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" alt="加载失败">
      <div id="info">
        <h3>测试数据</h3>
        <p>测试大学</p>
      </div>
      <div id="detail">
        <span>123123人参加</span>
        <el-divider></el-divider>
        <span>测试数据的详细信息</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LargeCard"
}
</script>

<style scoped>
#large-card {
  width: 224px;
  height: 293px;
}

.el-card {
  height: 100%;
}

#info {
  width: 200px;
  height: 80px;
  margin: 10px auto;
  padding: 0;
  outline: none;
}

#info h3 {
  max-height: 36px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  line-height: 18px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

#info p {
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  margin-top: 8px;
  color: #666;
  overflow: hidden;
  white-space: nowrap
}

#detail {
  width: 200px;
  margin:0 auto;
}

#detail span {
  padding: 0;
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  color: #999;
  overflow: hidden;
  bottom: 11px;
  width: calc(100% - 24px);
}

.image {
  width: 224px;
  height: 126px;
}

.el-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
