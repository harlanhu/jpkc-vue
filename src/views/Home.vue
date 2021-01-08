<template>
  <div id="home">
    <div id="banner">
      <home-banner/>
    </div>
    <div id="live-banner">
      <live-banner/>
    </div>
  </div>

</template>

<script>
import HomeBanner from "@/components/content/main/home/banner/HomeBanner";
import LiveBanner from "@/components/content/main/home/liveBanner/LiveBanner";
export default {
  name: "Home",
  components: {
    LiveBanner,
    HomeBanner
  }
}
</script>

<style scoped>
#home {
  margin: 0 auto;
  width: 1200px;
}
#banner {
  margin: 0 auto;
  width: 1200px;
}
</style>
