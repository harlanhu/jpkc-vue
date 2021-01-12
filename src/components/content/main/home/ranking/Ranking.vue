<template>
  <div id="ranking">
    <p class="ranking-title">本周课程排行</p>
    <div class="ranking-card">

    </div>
  </div>
</template>

<script>
export default {
  name: "Ranking"
}
</script>

<style scoped>
.ranking-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 13px;
}

.ranking-card {
  background-color: #fff;
  width: 387px;
  height: 496px;
  border-radius: 4px;
}
</style>
