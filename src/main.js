import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import APlayer from '@moefe/vue-aplayer'
import AV from 'leancloud-storage'

// Let's go!
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'
import images from './assets/images'
import { isMobile } from './utils'

// Layout and Font
import 'aos/dist/aos.css'
import 'gitalk/dist/gitalk.css'
import 'katex/dist/katex.css'
import '@/assets/font/fontello.scss'
import '@/styles/index.scss'

// Global variable
Vue.config.productionTip = false
Vue.prototype.$config = config
Vue.prototype.$isMobile = Vue.observable({ value: isMobile() })

// Init Progress Bar
const options = {
  color: '#b28fce',
  thickness: '4px',
  transition: {
    speed: '0.2s',
    opacity: '0.5s',
    termination: 300,
  },
  location: 'top',
  autoRevert: true,
  inverse: false,
}
Vue.use(VueProgressBar, options)

// Init Player
Vue.use(APlayer, { productionTip: false })

// Init Site Title
const { title, subtitle } = config
document.title = `${title} | ${subtitle}`

// Init Leancloud
window.AV = AV
AV.init(config.leancloud)

// Init Cover
new Image().src = config.defaultCover

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// (o=^•ェ•)o
const labelStyle = 'line-height:22px;color:#FFF;background:#D68FE9;'
const themeRepo = 'https://github.com/chanshiyucx/aurora'
console.info(`%c ${config.title} %c`, labelStyle, '', window.location.origin)
console.info('%c Theme %c', labelStyle, '', themeRepo)
console.info('~❀~ 发现控制台报错请务必联系博主 ~❀~')
console.log(
  '%c ',
  `
  margin:5px 0;
  padding:0 0 162px 200px;
  overflow:hidden;
  border-radius:10px;
  background:url(${images.reimu}) no-repeat center;
  background-size:200px;
  `
)
