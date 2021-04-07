<template>
  <div id="live-play">
    <video-player class="vjs-custom-skin videoPlayer"
                  ref="videoPlayer"
                  :playsline="false"
                  :options="playerOptions">
    </video-player>
<!--    <video id="hlsVideo" ref="hlsVideo" controls preload="true"></video>-->
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import 'videojs-contrib-hls'
import Hls from 'hls.js';

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
        techOrder: ['html5'],
        html5: {
          hls: {
            withCredentials: false
          }
        },
        sources: [
          {
            type: "application/x-mpegURL",
            src: "http://47.108.151.199:8080/hls/test.m3u8",
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
  },
  // methods: {
  //   destroyHls:function () {
  //     if (this.hls) {
  //       this.$refs.hlsVideo.pause();
  //       this.hls.destroy();
  //       this.hls = null;
  //     }
  //   },
  //   loadVideoFn:function () {
  //     if (Hls.isSupported()) {
  //       this.hls = new Hls();
  //       this.hls.loadSource("http://47.108.151.199:8080/hls/test.m3u8");  // CCTV1直播源
  //       this.hls.attachMedia(this.$refs.hlsVideo);
  //       this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //         console.log('加载成功');
  //         this.$refs.hlsVideo.play();
  //       });
  //       this.hls.on(Hls.Events.ERROR, (event, data) => {
  //         // console.log(event, data);
  //         // 监听出错事件
  //         console.log('加载失败');
  //       });
  //     }
  //   },
  // },
  // created:function(){
  //   let _this = this
  //   _this.$once('hook:beforeDestroy', () => {
  //     _this.destroyHls()
  //   })
  // },
  //
  // mounted(){
  //   let _this = this;
  //   _this.loadVideoFn()
  // }
}
</script>

<style scoped>

</style>
