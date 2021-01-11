<template>
  <div id="live-banner">
    <p class="live-banner-title">最近直播</p>
    <live-card/>
  </div>
</template>

<script>
import LiveCard from "@/components/common/LiveCard";

export default {
  name: "LiveBanner",
  components: {
    LiveCard
  }
}
</script>

<style scoped>
.live-banner-title {
  color: #333;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 13px;
}
</style>
