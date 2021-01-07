<template>
    <div class="block">
      <el-carousel :height="height" style="border-radius: 4px">
        <el-carousel-item v-for="item in items" :key="item">
          <h3 class="small">{{ item }}</h3>
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
        return ["暂无数据"];
      }
    }
  }
}
</script>

<style scoped>
.block {
  border-radius: 4px;
}
</style>
