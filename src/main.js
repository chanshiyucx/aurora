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

// Layout and Font
import 'aos/dist/aos.css'
import 'gitalk/dist/gitalk.css'
import './assets/font/fontello.less'
import './assets/style/animation.less'
import './assets/style/layout.less'

// Global variable
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile().phone

// Init Progress Bar
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

// Init Player
Vue.use(APlayer, { productionTip: false })

// Init Leancloud
window.AV = AV
AV.init(config.leancloud)

// Init Font
const font = new FontFaceObserver('Noto Serif SC', { weight: '400' })
font.load().then(() => document.documentElement.classList.add('fonts-loaded'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// (o=^•ェ•)o
const labelStyle = 'color:#FFF;line-height:22px;background:#D68FE9;'
const siteUrl = 'https://github.com/chanshiyucx/aurora'
const bg = 'https://raw.githubusercontent.com/chanshiyucx/poi/master/2019/reimu.png'
console.info(`%c ${config.title} %c`, `${labelStyle}`, '', window.location.origin)
console.info('%c Theme %c', `${labelStyle}`, '', siteUrl)
console.info('~❀~ 发现控制台报错请务必联系博主 ~❀~')
console.log(
  '%c ',
  `
  background:url(${bg}) no-repeat center;
  background-size:200px;
  margin:5px 0;
  padding:0 0 162px 200px;
  border-radius:10px;
  overflow:hidden;
  `
)
