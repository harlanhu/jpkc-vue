<template>
  <div id="live-play">
    <div class="video">
      <live-video live-src="http://47.108.151.199:8080/hls/tttt.m3u8"/>
    </div>
    <div class="chat">
    </div>
  </div>
</template>

<script>
import LiveVideo from "../components/common/LiveVideo";

export default {
  name: "LivePlay",
  components: {
    LiveVideo
  },
}
</script>

<style scoped>
#live-play {
  margin: 0 auto;
}

.video {
  float: left;
  width: 1000px;
}

.chat {
  float: left;
  background-color: #fff;
  width: 300px;
  height: 580px;
}
</style>
