<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <Header />
    <div class="page">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive :exclude="['post']" :max="10">
          <RouterView />
        </keep-alive>
      </Transition>
    </div>
    <Footer @dropPanel="showPanel = true" />
    <Panel v-show="showPanel" @hidePanel="showPanel = false" />
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
      showPanel: false
    }
  },
  created() {
    document.title = this.$config.title
    this.visitorStatistics()
    if (!this.$isMobile) this.initProgress()
  },
  mounted() {
    if (!this.$isMobile) this.$Progress.finish()
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
    // 统计访客来源
    visitorStatistics() {
      const referrer = getLocation(document.referrer)
      const hostname = referrer.hostname || '直接访问'
      this.$store.dispatch('visitorStatistics', hostname)
    }
  }
}
</script>

<style lang="less" scope>
#app {
  position: relative;
  padding-bottom: 1rem;
  text-align: center;

  .page {
    margin: 0 auto;
    padding: 0 0.12rem;
    max-width: 900px;
    user-select: text;
  }
}
</style>
