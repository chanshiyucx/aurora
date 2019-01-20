import Vue from 'vue'
import isMobile from 'ismobilejs'
import FontFaceObserver from 'fontfaceobserver'

// Let's go!
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import './assets/style/reset.less'
import './assets/style/layout.less'
import './assets/style/animation.less'

// 引入三方库
import firework from './assets/lib/fireworks'

// 配置全局变量
Vue.config.productionTip = false
Vue.$isMobile = isMobile.phone

// PC 端启用烟花特效
if (!isMobile.phone) {
  firework()
}

// 载入字体
;(function() {
  const font = new FontFaceObserver('Noto Serif SC', { weight: '400' })
  font.load().then(() => {
    document.documentElement.className += 'fonts-loaded'
  })
})()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
