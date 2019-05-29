<template>
  <div id="comment">
    <div class="modeBtn" v-show="showModeBtn" @click="switchMode">
      {{ anonymous ? 'Gitalk 评论' : '游客评论' }}
    </div>
    <div>
      <div v-show="!anonymous" id="gitalk" />
      <div v-show="anonymous && showModeBtn" id="valine" />
    </div>
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Valine from 'valine'

export default {
  name: 'Comment',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      anonymous: false,
      showModeBtn: false,
      tagName: this.$route.hash
    }
  },
  mounted() {
    // 判断切换到 Valine
    if (this.tagName) {
      this.anonymous = true
      const hash = window.location.hash
      window.location.hash = hash.split(this.tagName)[0]
    }

    setTimeout(() => (this.showModeBtn = true), 1000)

    this.renderGitalk()
    this.renderValine()
  },
  methods: {
    switchMode() {
      this.anonymous = !this.anonymous
    },
    // 加载 Gitalk
    renderGitalk() {
      const gitalk = new Gitalk({
        ...this.$config.gitalk,
        title: this.title
      })
      gitalk.render('gitalk')
    },
    // 加载 Valine
    renderValine() {
      new Valine({
        el: '#valine',
        appId: this.$config.leancloud.appId,
        appKey: this.$config.leancloud.appKey,
        path: window.location.href,
        avatar: 'identicon',
        notify: false,
        placeholder: '蝉鸣如雨，花宵道中'
      })

      setTimeout(() => {
        this.showModeBtn = true
        if (this.tagName) {
          let anchor
          let count = 0
          const timer = setInterval(() => {
            if (count > 10) return clearInterval(timer)
            count++
            anchor = document.getElementById(this.tagName.slice(1))
            if (anchor) {
              clearInterval(timer)
              const top = anchor.getBoundingClientRect().top
              window.scrollTo({ top, behavior: 'smooth' })
            }
          }, 500)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
