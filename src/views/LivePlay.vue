<template>
  <div id="live-play">
    <video-player class="vjs-custom-skin videoPlayer"
                  ref="videoPlayer"
                  :playsline="false"
                  :options="playerOptions">
    </video-player>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import 'videojs-flash'

export default {
  name: "LivePlay",
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        techOrder: ["flash", "html5"],
        sources: [
          {
            type: "rtmp/mp4",
            src: "rtmp://47.108.151.199:1935/stream/test",
          },
        ],
        width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
