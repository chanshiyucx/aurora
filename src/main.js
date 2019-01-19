import Vue from 'vue'
import isMobile from 'ismobilejs'

// Let's go!
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import './assets/style/reset.less'
import './assets/style/layout.less'

// 一些三方库
import firework from './assets/lib/fireworks'

Vue.config.productionTip = false
Vue.config.isMobile = isMobile.phone

// PC 端启用烟花特效
if (!isMobile.phone) {
  firework()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
