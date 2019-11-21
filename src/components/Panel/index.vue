<template>
  <div id="panel" v-show="showPanel">
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
          <div v-if="showPanel" class="body">
            <div class="swiper-wrapper">
              <ul ref="swiper" id="swiper" class="swiper animate" :style="containerStyle">
                <li>
                  <Qrcode @zoom="setZoomSrc" />
                </li>
                <li>
                  <Theme :theme="theme" @switchTheme="switchTheme" />
                </li>
                <li>
                  <Qrcode @zoom="setZoomSrc" />
                </li>
                <li>
                  <Theme :theme="theme" @switchTheme="switchTheme" />
                </li>
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
                已有
                <span>{{ likeTimes }}</span> 人点赞了哦！
              </p>
            </div>
          </div>
          <div class="footer">
            <div class="cursor" :data-title="likeBtnText" @click="likeSite"></div>
          </div>
        </div>
        <div class="long-line">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div v-if="!!zoomSrc" class="zoom" @click="setZoomSrc()">
      <img class="cursor" :src="zoomSrc" alt />
    </div>
  </div>
</template>

<script>
import Theme from './components/Theme'
import Qrcode from './components/Qrcode'
import { localSave, localRead } from '@/utils'

const bg = {
  touhou: [
    'https://i0.hdslb.com/bfs/album/59215b7db60415636d0527ac931a996f9a6d970f.jpg',
    'https://i0.hdslb.com/bfs/album/f66b6ee0d85043db921a1568a932f201d58c12ce.jpg',
    'https://i0.hdslb.com/bfs/album/fb0126be1fb4c7d3aeeedff1fa187087afda711a.jpg',
    'https://i0.hdslb.com/bfs/album/1b5ebba9c9302efb003656b2339f0a97dbb5214a.jpg',
    'https://i0.hdslb.com/bfs/album/92457e0c09028873328dabc188a2e3585e20affe.jpg',
    'https://i0.hdslb.com/bfs/album/23ab81124bb6c59c87a2758112d3d3a69942fc4a.jpg',
    'https://i0.hdslb.com/bfs/album/c0fe6af5b941ed3cbc7f630c7d4948d540e345fb.jpg',
    'https://i0.hdslb.com/bfs/album/56a474ae130d758e344e6d9ae76c364a2c485aa0.jpg',
    'https://i0.hdslb.com/bfs/album/4af73871d861579965adfe8c0edb6f2ce35488fc.jpg',
    'https://i0.hdslb.com/bfs/album/0a9bc710e9566436b17e2c58495a9390a27567a7.jpg'
  ],
  school: [
    'https://i0.hdslb.com/bfs/album/375bfad6dda18280f8e05c92db17b4a588d65aee.jpg',
    'https://i0.hdslb.com/bfs/album/cd04c2c31f0aafe6da573d5a25c0339f51418d64.jpg',
    'https://i0.hdslb.com/bfs/album/944bd435b4a31c16de1e29bdfc30e33b15b11f24.jpg',
    'https://i0.hdslb.com/bfs/album/243290acc936525c332661b5ee7aacca29579955.jpg',
    'https://i0.hdslb.com/bfs/album/fdeb5b5aeccf3ec43f424dd3baafea245331948e.jpg',
    'https://i0.hdslb.com/bfs/album/e20b2368e5439e2d0b0aadb4bffd3bd8471e0a81.jpg',
    'https://i0.hdslb.com/bfs/album/e9996999c86d9057caa554f6ac96747210551af7.jpg',
    'https://i0.hdslb.com/bfs/album/8400b3e997d555a88c3748a1456f317b0e7823b5.jpg',
    'https://i0.hdslb.com/bfs/album/aa6dae662a96c50b48dfae96197a0bcbafb7e784.jpg'
  ]
}

export default {
  name: 'Panel',
  components: { Theme, Qrcode },
  props: {
    showPanel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      theme: '',
      likeTimes: 0,
      isLikeSite: localRead('isLikeSite', false),
      currentInx: 1,
      lockSwiper: false,
      zoomSrc: ''
    }
  },
  computed: {
    panelTitle() {
      const inx = (this.currentInx + 1) % 2
      return ['背景主题', '赛钱箱'][inx]
    },
    distance() {
      return [0, -600, -1200, -1800][this.currentInx]
    },
    containerStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    },
    likeBtnText() {
      return this.isLikeSite ? "谢谢点赞 (●'◡'●)" : '点赞一下 (<ゝω・)☆'
    }
  },
  mounted() {
    this.queryLike()
    this.initTheme()
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
      localSave('isLikeSite', true)
    },
    // 初始化背景主题
    initTheme() {
      if (this.$isMobile) return
      const theme = localRead('theme', 'touhou')
      this.setTheme(theme)
    },
    // 切换主题
    switchTheme(theme) {
      if (theme === this.theme) return
      this.setTheme(theme)
    },
    // 设置主题
    setTheme(theme) {
      this.theme = theme
      localSave('theme', theme)
      window.$('#bg').backstretch(bg[theme], {
        duration: 10000,
        alignY: 0,
        transition: 'fade',
        transitionDuration: 1000
      })
    },
    // 关闭面板
    hidePanel() {
      this.$emit('hidePanel')
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
    setZoomSrc(src = '') {
      this.zoomSrc = src
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
