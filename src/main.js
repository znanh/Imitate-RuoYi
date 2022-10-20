import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css

import '@/assets/iconfonts/iconfont.css';//iconfont css

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueMeta from 'vue-meta'

import '@/icons' // icon

import { CookieUtils } from './utils/cookieUtils'

Vue.use(ElementUI);
Vue.use(VueMeta)

Vue.config.productionTip = false

Vue.prototype.$cookieUtils=CookieUtils; //cookie方法

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
