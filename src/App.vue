<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <div id="nav">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </div>
    <Transition name="fade-transform" mode="out-in"> <router-view /> </Transition>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import { on, off, throttle } from '@/utils'

let handleScroll

export default {
  name: 'App',
  components: {
    Footer
  },
  created() {
    this.initProgress()
  },
  mounted() {
    this.$Progress.finish()
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
      const scrollRange = document.body.clientHeight - document.documentElement.clientHeight - 50
      const pageYOffset = window.pageYOffset
      this.$Progress.set((pageYOffset / scrollRange) * 100)
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
