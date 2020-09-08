<template>
  <div id="app">
    <vue-progress-bar />
    <Transition name="header-transform" mode="out-in">
      <Header v-show="showHeader" />
    </Transition>
    <main class="main">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="['Post']" :max="10">
          <RouterView />
        </keep-alive>
      </Transition>
    </main>
    <Footer />
    <Panel />
    <ScrollTop />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Panel from '@/components/Panel'
import ScrollTop from '@/components/ScrollTop'
import { getLocation, isMobile } from '@/utils'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Panel,
    ScrollTop,
  },
  data() {
    return {
      showHeader: true,
      lastResizeTimer: '',
      lastResizeAt: new Date(),
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        if (this.$isMobile.value) {
          this.showHeader = val.name !== 'post'
        }
        if (val.name === 'post') {
          setTimeout(this.scrollTop, 500)
        }
      },
    },
    '$isMobile.value': {
      immediate: true,
      handler(val) {
        if (val) {
          this.showHeader = this.$route && this.$route.name !== 'post'
        } else {
          this.showHeader = true
        }
      },
    },
  },
  created() {
    this.initProgress()
    this.visitorStatistics()
  },
  mounted() {
    this.$Progress.finish()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    // 窗口监听
    handleResize() {
      const now = new Date()
      if (now - this.lastResizeAt <= 150) return
      this.lastResizeAt = now
      this.$isMobile.value = isMobile()

      clearTimeout(this.lastResizeTimer)
      this.lastResizeTimer = setTimeout(() => {
        this.$isMobile.value = isMobile()
      }, 300)
    },
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
    // 统计访客来源
    visitorStatistics() {
      const referrer = getLocation(document.referrer)
      const hostname = referrer.hostname || '直接访问'
      this.$store.dispatch('visitorStatistics', hostname)
    },
    // 滚动到顶部
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style lang="scss" scope>
#app {
  position: relative;
  @include pc-layout {
    padding-bottom: 100px;
  }
  @include sp-layout {
    padding-bottom: 60px;
  }

  .main {
    margin: 0 auto;
    max-width: $page-desktop;
    user-select: text;
  }
}
</style>
