import Vue from 'vue'
import AV from 'leancloud-storage'
import isMobile from 'ismobilejs'
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
import './assets/font/fontello.less'
import './assets/style/animation.less'
import './assets/style/layout.less'
import './assets/style/reset.less'

// 配置全局变量
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile.phone

// Init Leancloud
window.AV = AV
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

// 载入字体
;(function() {
  const font = new FontFaceObserver('Noto Serif SC', { weight: '400' })
  font.load().then(() => {
    document.documentElement.classList.add('fonts-loaded')
  })
})()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 自定义控制台
const labelStyle = 'color:#ffffff;line-height: 22px;'
console.info(`%c ${config.title} %c`, `${labelStyle}background: #d68fe9;`, '', window.location.origin)
console.info('%c Theme %c', `${labelStyle}background: #d68fe9;`, '', 'https://github.com/chanshiyucx/aurora')
console.info('~❀~ 发现控制台报错请务必联系博主 ~❀~')
console.log(
  '%c ',
  'background:url(https://i.loli.net/2018/12/09/5c0cc2b905841.png) no-repeat center;background-size:200px;padding-left:200px;padding-bottom:162px;overflow:hidden;border-radius:10px;margin:5px 0'
)
