import Vue from 'vue'
import isMobile from 'ismobilejs'
import AV from 'leancloud-storage'
import FontFaceObserver from 'fontfaceobserver'
import VueProgressBar from 'vue-progressbar'
import SmoothScroll from 'smooth-scroll'
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
import fairyDustCursor from './assets/lib/fairyDustCursor'

// 配置全局变量
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile.phone
Vue.prototype.$gallery = null

// 滚动到锚点
const scrollOpts = {
  updateURL: false,
  emitEvents: false,
  durationMin: 1000,
  durationMax: 1200,
  easing: 'easeOutQuint'
}
const scroll = new SmoothScroll()
Vue.prototype.$scroll = (anchor, toggle) => {
  if (toggle) {
    scroll.animateScroll(anchor, toggle, scrollOpts)
  } else {
    scroll.animateScroll(anchor, scrollOpts)
  }
}

// Register AV objects to the global
window.AV = AV
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

// PC 端启用烟花特效与鼠标特效
if (!isMobile.phone) {
  firework()
  fairyDustCursor()
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

// 切换页面销毁所有灯箱
router.beforeEach((to, from, next) => {
  Object.keys(window.lgData).forEach(k => {
    window.lgData[k].destroy && window.lgData[k].destroy(true)
  })
  window.lgData = {}
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 自定义控制台
const labelStyle = 'color:#ffffff;line-height: 22px;'
console.info('%c 蝉時雨 %c', `${labelStyle}background:#986db2;`, '', 'https://chanshiyu.com')
console.info('%c Theme %c', `${labelStyle}background:#986db2;`, '', 'https://github.com/chanshiyucx/aurora')
console.info('~❀~ 发现控制台报错请务必联系博主 ~❀~')
console.log(
  '%c ',
  'background:url(https://i.loli.net/2018/12/09/5c0cc2b905841.png) no-repeat center;background-size:200px;padding-left:200px;padding-bottom:162px;overflow:hidden;border-radius:10px;margin:5px 0'
)
