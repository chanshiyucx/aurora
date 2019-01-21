<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <div id="nav">
      <RouterLink to="/">Home</RouterLink> |
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
import { on, off, throttle } from '@/utils'

let handleScroll

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      showBackTop: false,
      topDistance: -950,
      clientHeight: 0
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
      updateURL: false
    })

    // 滚动页面
    handleScroll = throttle(this.handleScroll, 100, true)
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
    handleScroll() {
      const clientHeight = document.documentElement.clientHeight
      const scrollRange = document.body.clientHeight - clientHeight - 50
      const pageYOffset = window.pageYOffset
      this.$Progress.set((pageYOffset / scrollRange) * 100)
      // 判断位置，控制滚动到顶部
      const showBackTop = pageYOffset >= 200
      if (showBackTop !== this.showBackTop || this.clientHeight !== clientHeight) {
        this.showBackTop = pageYOffset >= 200
        this.topDistance = -950 + (showBackTop ? clientHeight : 0)
        this.clientHeight = clientHeight
      }
    }
  },
  beforeDestroy() {
    off(window, 'scroll', handleScroll)
  }
}
</script>

<style lang="less" scope>
#app {
  text-align: center;
  .back-to-top {
    position: fixed;
    right: 0.25rem;
    width: 70px;
    height: 900px;
    z-index: 99;
    opacity: 1;
    transition: all 0.5s ease-in-out;
    background: url(https://cdn.jsdelivr.net/gh/moezx/cdn@3.1.9/img/Sakura/images/scroll.png)
      no-repeat center;
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
