<template>
  <div id="recommend">
    <p class="recommend-title">编辑推荐</p>
    <large-card/>
  </div>
</template>

<script>
import LargeCard from "@/components/common/LargeCard";
export default {
  name: "Recommend",
  components: {
    LargeCard
  }
}
</script>

<style scoped>
.recommend-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 13px;
}
</style>
