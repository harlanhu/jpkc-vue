<template>
  <div>
    <div id="wrapper"></div>
  </div>
</template>

<script>
import Chimee from 'chimee'
import ChimeePlayer from 'chimee-player';
import Controlbar from 'chimee-plugin-controlbar';

export default {
  name: "LiveVideo",
  props: {
    liveSrc: {
      type: String
    }
  },
  data() {
    return {
      chimeePlayer: {}
    }
  },
  mounted() {
    Chimee.install(Controlbar)
    this.chimeePlayer = new ChimeePlayer({
      wrapper: '#wrapper',
      src: this.liveSrc,
      box: 'hls',
      isLive: true,
      autoplay: true,
      controls: true,
      plugin: [
        Controlbar
      ]
    })
  }
}
</script>

<style scoped>

</style>
