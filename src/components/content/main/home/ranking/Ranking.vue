<template>
  <div id="ranking">
    <p class="ranking-title">本周课程排行</p>
    <ranking-card/>
  </div>
</template>

<script>
import MiniCard from "@/components/common/MiniCard";
import RankingCard from "@/components/content/main/home/ranking/RankingCard/RankingCard";
export default {
  name: "Ranking",
  components: {
    RankingCard,
    MiniCard
  }
}
</script>

<style scoped>
.ranking-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 13px;
}
</style>
