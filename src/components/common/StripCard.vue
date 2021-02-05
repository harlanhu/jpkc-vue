<template>
  <div id="strip-card">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img :src="data.resourcePath" class="image" alt="加载失败">
    </el-card>
  </div>
</template>

<script>
export default {
  name: "StripCard",
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
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
