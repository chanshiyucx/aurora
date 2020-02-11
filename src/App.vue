<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Transition name="header-transform" mode="out-in">
      <Header v-show="showHeader" />
    </Transition>
    <main class="main">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="['post']" :max="10">
          <RouterView />
        </keep-alive>
      </Transition>
    </main>
    <Footer @dropPanel="showPanel = true" />
    <Panel :showPanel="showPanel" @hidePanel="showPanel = false" />
    <ScrollTop />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Panel from '@/components/Panel'
import ScrollTop from '@/components/ScrollTop'
import { getLocation } from '@/utils'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Panel,
    ScrollTop
  },
  data() {
    return {
      showHeader: true,
      showPanel: false
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        if (this.$isMobile) {
          this.showHeader = val && val.name !== 'post'
        }
        if (val.name === 'post') {
          setTimeout(this.scrollTop, 500)
        }
      }
    }
  },
  created() {
    this.initSite()
    this.initProgress()
    this.visitorStatistics()
  },
  mounted() {
    this.$Progress.finish()
  },
  methods: {
    // 初始化站点信息
    initSite() {
      const { title, subtitle } = this.$config
      document.title = `${title} | ${subtitle}`
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
    }
  }
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
