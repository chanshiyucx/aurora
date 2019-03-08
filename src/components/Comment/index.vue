<template>
  <div id="comment">
    <div class="modeBtn" v-show="showModeBtn" @click="switchMode">
      {{ anonymous ? 'Gitalk 评论' : '匿名评论' }}
    </div>
    <div>
      <div v-show="!anonymous" id="gitalk" />
      <div v-show="anonymous" id="valine" />
    </div>
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Valine from 'valine'

export default {
  name: 'Comment',
  props: ['title'],
  data() {
    return {
      anonymous: false,
      showModeBtn: false
    }
  },
  mounted() {
    this.renderGitalk()
    this.renderValine()
    setTimeout(() => {
      this.showModeBtn = true
    }, 1000)
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
        notify: true,
        placeholder: '蝉鸣如雨，花宵道中'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
