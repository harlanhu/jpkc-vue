<template>
  <div id="home">
    <div id="banner">
      <home-banner/>
    </div>
  </div>

</template>

<script>
import HomeBanner from "@/components/content/home/banner/HomeBanner";
export default {
  name: "Home",
  components: {
    HomeBanner
  }
}
</script>

<style scoped>
#banner {
  margin: 0 auto;
  width: 1200px;
}
</style>
