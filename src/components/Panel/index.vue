<template>
  <div id="panel">
    <div class="mask" @click="hidePanel"></div>
    <div class="container">
      <div class="wrapper">
        <div class="short-line">
          <div></div>
          <div></div>
        </div>
        <div class="main">
          <div class="header">
            <div class="inner">{{ panelTitle }}</div>
          </div>
          <div class="body">
            <div class="swiper-wrapper">
              <ul ref="swiper" id="swiper" class="swiper animate" :style="containerStyle">
                <li><Qrcode @zoom="setZoomSrc" /></li>
                <li><Theme :theme="theme" @switchTheme="switchTheme" /></li>
                <li><Qrcode @zoom="setZoomSrc" /></li>
                <li><Theme :theme="theme" @switchTheme="switchTheme" /></li>
              </ul>
            </div>
            <button class="cursor btn left-btn" @click="swiperTo(-1)">
              <i class="icon icon-left-open-outline"></i>
            </button>
            <button class="cursor btn right-btn" @click="swiperTo(1)">
              <i class="icon icon-right-open-outline"></i>
            </button>
            <div class="like">
              <p>
                已有 <span>{{ likeTimes }}</span> 人点赞了哦！
              </p>
            </div>
          </div>
          <div class="footer"><div class="cursor" :data-title="likeBtnText" @click="likeSite"></div></div>
        </div>
        <div class="long-line">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div v-if="!!zoomSrc" class="zoom" @click="setZoomSrc('')"><img class="cursor" :src="zoomSrc" alt /></div>
  </div>
</template>

<script>
import Theme from './components/Theme'
import Qrcode from './components/Qrcode'

export default {
  name: 'Panel',
  components: { Theme, Qrcode },
  data() {
    return {
      bgNode: '',
      theme: '',
      initTheme: '',
      likeTimes: 0,
      isLikeSite: window.localStorage.getItem('isLikeSite', true),
      currentInx: 1,
      step: 6, // 每一步 6rem
      lockSwiper: false,
      swiper: '',
      zoomSrc: ''
    }
  },
  computed: {
    panelTitle() {
      const inx = (this.currentInx + 1) % 2
      return ['背景主题', '赛钱箱'][inx]
    },
    distance() {
      return [0, -6, -12, -18][this.currentInx]
    },
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}rem, 0, 0)`
      }
    },
    likeBtnText() {
      return this.isLikeSite ? "谢谢点赞 (●'◡'●)" : '点赞一下 (<ゝω・)☆'
    }
  },
  mounted() {
    this.queryLike()
    this.initThemeBg()
  },
  methods: {
    // 点赞数
    async queryLike() {
      this.likeTimes = await this.$store.dispatch('queryLike', 'getTimes')
    },
    // 点赞
    async likeSite() {
      if (this.isLikeSite) return
      this.likeTimes = await this.$store.dispatch('queryLike')
      this.isLikeSite = true
      window.localStorage.setItem('isLikeSite', true)
    },
    // 初始化背景主题
    initThemeBg() {
      const theme = this.getInitTheme()
      const initTheme = theme === 'touhou' ? 'initTouhou' : 'initSchool'
      this.theme = theme
      this.initTheme = initTheme
      this.createBgNode()
    },
    // 获取初始化主题
    getInitTheme() {
      if (this.$isMobile) return 'school'
      const localTheme = localStorage.getItem('theme')
      if (['touhou', 'school'].includes(localTheme)) return localTheme
      return 'touhou'
    },
    // 创建背景节点
    createBgNode() {
      const appNode = document.getElementById('app')
      const bgNode = document.createElement('ul')
      bgNode.id = 'bg'
      bgNode.classList.add(this.initTheme)
      document.body.insertBefore(bgNode, appNode)
      this.bgNode = bgNode
      if (this.$isMobile) return

      for (let i = 0; i < 10; i++) {
        const imgNode = document.createElement('li')
        bgNode.appendChild(imgNode)
      }
      // 延时载入背景图片
      setTimeout(() => {
        setTimeout(() => bgNode.classList.remove(this.initTheme), 2000)
        bgNode.classList.add(this.theme)
      }, 4000)
    },
    // 切换主题
    switchTheme(theme) {
      if (this.theme === theme) return
      this.bgNode.className = theme
      this.theme = theme
      localStorage.setItem('theme', theme)
    },
    // 关闭面板
    hidePanel() {
      this.$emit('hidePanel')
      // 还原面板初始位置
      this.$nextTick(() => {
        this.currentInx = 1
      })
    },
    // 滑动面板
    swiperTo(direction) {
      if (this.lockSwiper) return
      this.lockSwiper = true
      const swiper = this.$refs.swiper
      swiper.classList.add('animate')

      this.currentInx += direction
      setTimeout(() => {
        this.lockSwiper = false
        if (this.currentInx === 0) {
          swiper.classList.remove('animate')
          this.currentInx = 2
        }
        if (this.currentInx === 3) {
          swiper.classList.remove('animate')
          this.currentInx = 1
        }
      }, 500)
    },
    // 设置缩放二维码
    setZoomSrc(src) {
      this.zoomSrc = src
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
