<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <div id="nav">
      <RouterLink to="/">Home</RouterLink>|
      <RouterLink to="/about">About</RouterLink>
    </div>
    <Transition name="fade-transform" mode="out-in"> <router-view /> </Transition>
    <Footer />
    <a
      href="#"
      :style="{ top: `${topDistance}px` }"
      :class="['back-to-top', showBackTop && 'visible']"
    ></a>
  </div>
</template>

<script>
import SmoothScroll from 'smooth-scroll'
import Footer from '@/components/Footer'
import { on } from '@/utils'

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      showBackTop: false,
      topDistance: -950,
      clientHeight: 0,
      lastScroll: new Date(),
      scrollTimer: ''
    }
  },
  created() {
    this.initProgress()
  },
  mounted() {
    // 顶部进度条
    this.$Progress.finish()

    // 滚动到顶部
    new SmoothScroll('a[href*="#"]', {
      updateURL: false,
      emitEvents: false,
      durationMin: 600,
      durationMax: 1200,
      easing: 'easeOutQuint'
    })

    // 滚动页面
    const handleScroll = () => this.handleScroll()
    on(window, 'scroll', handleScroll)
  },
  methods: {
    // 注册顶部进度条
    initProgress() {
      this.$Progress.start()
      this.$router.beforeEach((to, from, next) => {
        this.$Progress.start()
        next()
      })
      this.$router.afterEach(() => {
        this.$Progress.finish()
      })
    },
    // 监听页面滚动
    handleScroll(forced) {
      const now = new Date()
      if (now - this.lastScroll <= 100 && !forced) return
      if (!forced) {
        // 尾更新 task
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          this.handleScroll(true)
        }, 300)
      }
      this.lastScroll = now

      // 更新顶部进度条
      const clientHeight = document.documentElement.clientHeight
      const scrollRange = document.body.clientHeight - clientHeight - 50
      const pageYOffset = window.pageYOffset
      this.$Progress.set((pageYOffset / scrollRange) * 100)

      // 判断位置，控制滚动到顶部
      const showBackTop = pageYOffset >= 200
      if (showBackTop !== this.showBackTop || this.clientHeight !== clientHeight) {
        this.showBackTop = showBackTop
        this.topDistance = -950 + (showBackTop ? clientHeight : 0)
        this.clientHeight = clientHeight
      }
    }
  }
}
</script>

<style lang="less" scope>
#app {
  position: relative;
  padding-bottom: 1rem;
  text-align: center;
  .back-to-top {
    position: fixed;
    right: 0.25rem;
    width: 70px;
    height: 900px;
    z-index: 99;
    opacity: 1;
    transition: all 0.5s ease-in-out;
    background: url(https://i.loli.net/2019/01/24/5c496f5c617f6.png) no-repeat center;
    background-size: contain;
    &.visible {
      animation: float 3s linear infinite;
    }
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
