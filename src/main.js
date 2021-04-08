import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueVideoPlayer from "vue-video-player/dist/ssr";
import VideoPlayer from 'vue-video-player'
import { vueBaberrage } from 'vue-baberrage'
import api from "@/api/api";
import MessageUtils from "@/utils/MessageUtils";
import LSUtils from "@/utils/LSUtils";
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import 'videojs-flash'
import 'lib-flexible/flexible.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css';

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$msg = MessageUtils
Vue.prototype.$ls = LSUtils

//创建事件总线
Vue.prototype.$bus = new Vue();

Vue.use(
    ElementUI,
    VueVideoPlayer,
    VideoPlayer,
    vueBaberrage
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
