<template>
    <div class="block">
      <el-carousel :height="height" style="border-radius: 4px">
        <el-carousel-item v-for="item in items">
          <img :src="item.courseLogo" alt="加载失败">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    height: {
      type: String,
      default: "360px"
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.block {
  border-radius: 4px;
}

img {
  width: 750px;
  height: 360px;
}
</style>
