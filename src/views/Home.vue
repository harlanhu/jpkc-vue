<template>
  <div id="home">
    <div id="banner">
      <home-banner/>
    </div>
    <div id="live-banner" class="common-banner">
      <live-banner/>
    </div>
    <div id="recommend-banner" class="common-banner">
      <recommend/>
    </div>
  </div>

</template>

<script>
import HomeBanner from "@/components/content/main/home/banner/HomeBanner";
import LiveBanner from "@/components/content/main/home/liveBanner/LiveBanner";
import Recommend from "@/components/content/main/home/recommendBanner/Recommend";
export default {
  name: "Home",
  components: {
    Recommend,
    LiveBanner,
    HomeBanner
  }
}
</script>

<style scoped>
#home {
  margin: 0 auto;
  width: 1200px;
  height: 100%;
}

#banner {
  margin: 45px auto;
  width: 1200px;
}

.common-banner {
  width: 1200px;
  padding-bottom: 30px;
  flex-wrap: wrap;
}
</style>
