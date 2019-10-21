<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Header />
    <!-- <div class="page">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="['post']" :max="10">
          <RouterView />
        </keep-alive>
      </Transition>
    </div>-->
    <Footer @dropPanel="showPanel = true" />
    <Panel v-show="showPanel" @hidePanel="showPanel = false" />
    <!-- <ScrollTop /> -->
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Panel from '@/components/Panel'
// import ScrollTop from '@/components/ScrollTop'
import { getLocation } from '@/utils'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Panel
    // ScrollTop
  },
  data() {
    return {
      showPanel: false
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
    }
  }
}
</script>

<style lang="scss" scope>
#app {
  position: relative;
  padding-bottom: 100px;

  .page {
    margin: 0 auto;
    max-width: $page-desktop;
    user-select: text;
  }
}
</style>
