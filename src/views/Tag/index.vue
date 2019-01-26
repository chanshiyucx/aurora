<template>
  <div id="tag">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="tag.length">
        <Quote :quote="$config.tagOpts.qoute" />
        <div class="content">12234</div>
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.tagOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import { shuffle } from '@/utils'

export default {
  name: 'Tag',
  components: {
    Loading,
    Quote
  },
  data() {
    return {
      colors: shuffle(this.$config.themeColors),
      tag: 0
    }
  },
  async created() {
    await this.queryTag()
    this.renderGitalk()
  },
  methods: {
    async queryTag() {},
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.tagOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '标签'
          })
          gitalk.render('gitalk')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
