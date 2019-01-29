import Vue from 'vue'
import isMobile from 'ismobilejs'
import AV from 'leancloud-storage'
import FontFaceObserver from 'fontfaceobserver'
import VueProgressBar from 'vue-progressbar'
import APlayer from '@moefe/vue-aplayer'

// Let's go!
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

// 全局样式与字体图标
import 'aos/dist/aos.css'
import 'gitalk/dist/gitalk.css'
import './assets/style/reset.less'
import './assets/style/layout.less'
import './assets/style/animation.less'
import './assets/font/fontello.less'

// 引入三方库
import firework from './assets/lib/fireworks'

// 配置全局变量
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile.phone

// Init Leancloud
AV.init(config.leancloud)

// 顶部进度条
const options = {
  color: '#986DB2',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)

// 音乐播放器
Vue.use(APlayer, {
  productionTip: false // disable console output
})

// PC 端启用烟花特效
if (!isMobile.phone) {
  firework()
}

// 载入字体
;(function() {
  const font = new FontFaceObserver('Noto Serif SC', { weight: '400' })
  font.load().then(() => {
    document.documentElement.className += ' fonts-loaded'
  })
})()

// 延时载入背景图片
setTimeout(() => {
  document.getElementById('bg').className += ' backstretch'
}, 4 * 1000)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
