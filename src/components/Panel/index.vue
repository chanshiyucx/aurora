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
    <div v-if="!!zoomSrc" class="zoom" @click="setZoomSrc('')">
      <img class="cursor" :src="zoomSrc" alt />
    </div>
  </div>
</template>

<script>
import Theme from './components/Theme'
import Qrcode from './components/Qrcode'

const bg = {
  touhou: [
    'https://i.loli.net/2019/09/28/qmth7xajngTM8zl.jpg',
    'https://i.loli.net/2019/09/29/pHk8d9JPeoR17ri.jpg',
    'https://i.loli.net/2019/09/29/KcCLBO9aqTA2D5h.jpg',
    'https://i.loli.net/2019/09/29/if3acdCxLVTM7Ws.jpg',
    'https://i.loli.net/2019/09/29/uhf6Y4rFmJPdo8p.jpg',
    'https://i.loli.net/2019/09/29/swpIntC2eT41xQK.jpg',
    'https://i.loli.net/2019/09/29/vr6mEQRWi3NHVyk.jpg',
    'https://i.loli.net/2019/09/29/yK8BsTzhqvwFxCd.jpg',
    'https://i.loli.net/2019/09/29/DSJYGIjOHZ4Prp9.jpg',
    'https://i.loli.net/2019/09/29/WpQ6SyrfVN48e3n.jpg'
  ],
  school: [
    'https://i.loli.net/2019/04/23/5cbf1354a41b6.jpg',
    'https://i.loli.net/2019/04/23/5cbf136bdc2d3.jpg',
    'https://i.loli.net/2019/04/23/5cbf136fe0333.jpg',
    'https://i.loli.net/2019/04/23/5cbf137481842.jpg',
    'https://i.loli.net/2019/04/23/5cbf1379952b2.jpg',
    'https://i.loli.net/2019/04/23/5cbf13983c5ef.jpg',
    'https://i.loli.net/2019/04/23/5cbf139c68120.jpg',
    'https://i.loli.net/2019/04/23/5cbf13a0a95a2.jpg',
    'https://i.loli.net/2019/04/25/5cc08b39e2f20.jpg'
  ],
  mobile: ['https://i.loli.net/2019/08/23/mNY5iO1T6jgXPR8.png']
}

export default {
  name: 'Panel',
  components: { Theme, Qrcode },
  data() {
    return {
      theme: '',
      likeTimes: 0,
      isLikeSite: localStorage.getItem('isLikeSite', true),
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
      localStorage.setItem('isLikeSite', true)
    },
    // 初始化背景主题
    initThemeBg() {
      let theme = localStorage.getItem('theme') || 'touhou'
      if (this.$isMobile) {
        theme = 'mobile'
      }
      this.setTheme(theme)
    },
    // 切换主题
    switchTheme(theme) {
      if (this.theme === theme) return
      this.setTheme(theme)
    },
    // 设置主题
    setTheme(theme) {
      this.theme = theme
      if (!this.$isMobile) {
        localStorage.setItem('theme', theme)
      }
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
    setZoomSrc(src) {
      this.zoomSrc = src
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
