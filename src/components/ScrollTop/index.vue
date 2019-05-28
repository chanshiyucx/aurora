<template>
  <div
    v-if="!$isMobile"
    @click="scrollTop"
    :style="backTopStyle"
    :class="['back-to-top', 'cursor', showBackTop && !lock && 'anime']"
  ></div>
</template>

<script>
export default {
  name: 'ScrollTop',
  data() {
    return {
      showBackTop: false,
      lock: true,
      topDistance: -950,
      clientHeight: 0,
      scrollTimer: '',
      lastScroll: new Date()
    }
  },
  computed: {
    backTopStyle() {
      return { top: `${this.topDistance}px` }
    }
  },
  mounted() {
    if (!this.$isMobile) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    // 滚动到顶部
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    // 监听页面滚动
    handleScroll() {
      const now = new Date()
      if (now - this.lastScroll <= 150) return
      this.lastScroll = now
      this.handleTop()

      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(this.handleTop, 300)
    },
    // 处理滚动事件
    handleTop() {
      // 更新顶部进度条
      const clientHeight = document.documentElement.clientHeight
      const scrollRange = document.body.clientHeight - clientHeight - 50
      const pageYOffset = window.pageYOffset
      this.$Progress.set((pageYOffset / scrollRange) * 100)

      // 判断位置，控制滚动到顶部
      const showBackTop = pageYOffset >= 200
      if (showBackTop !== this.showBackTop || this.clientHeight !== clientHeight) {
        // 1.5s 后启用动画
        this.lock = true
        setTimeout(() => (this.lock = !showBackTop), 1500)

        this.topDistance = -950 + (showBackTop ? clientHeight : 0)
        this.clientHeight = clientHeight
        this.showBackTop = showBackTop
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
