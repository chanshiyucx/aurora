import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import APlayer from '@moefe/vue-aplayer'
import isMobile from 'ismobilejs'
import AV from 'leancloud-storage'

// Let's go!
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

// Layout and Font
import 'aos/dist/aos.css'
import 'gitalk/dist/gitalk.css'
import '@/assets/font/fontello.scss'
import '@/styles/index.scss'

// Global variable
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = isMobile().phone

// Init Progress Bar
const options = {
  color: '#d68fe9',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.5s',
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

// Init Cover
const img = new Image()
img.src = config.defaultCover

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// (o=^•ェ•)o
const labelStyle = 'line-height:22px;color:#FFF;background:#D68FE9;'
const siteUrl = 'https://github.com/chanshiyucx/aurora'
const bg = 'https://cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/reimu.png'
console.info(`%c ${config.title} %c`, `${labelStyle}`, '', window.location.origin)
console.info('%c Theme %c', `${labelStyle}`, '', siteUrl)
console.info('~❀~ 发现控制台报错请务必联系博主 ~❀~')
console.log(
  '%c ',
  `
  margin:5px 0;
  padding:0 0 162px 200px;
  overflow:hidden;
  border-radius:10px;
  background:url(${bg}) no-repeat center;
  background-size:200px;
  `
)
