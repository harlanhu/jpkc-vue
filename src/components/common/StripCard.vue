<template>
  <div id="strip-card">
    <el-card :body-style="{ padding: '0px' }">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" alt="加载失败">
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StripCard"
}
</script>

<style scoped>
#strip-card {
  width: 387px;
  height: 109px;
}

.image {
  width: 387px;
  height: 109px;
}
</style>
