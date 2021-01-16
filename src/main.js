import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import api from "@/api/api";

import 'lib-flexible/flexible.js';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/normalize.css';

Vue.config.productionTip = false
Vue.prototype.$api = api

//创建事件总线
Vue.prototype.$bus = new Vue();

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
