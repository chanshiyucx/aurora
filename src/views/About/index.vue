<template>
  <div id="about">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="about">
        <Quote :quote="$config.aboutOpts.qoute" />
        <div class="content">
          <div class="header">
            <img :src="$config.aboutOpts.avatar" alt />
            <div class="info">
              <span> <i class="icon icon-fort-awesome"></i> {{ $config.title }} </span>
              <span> <i class="icon icon-pagelines"></i> {{ $config.subtitle }} </span>
              <span> <i class="icon icon-graduation-cap"></i> {{ $config.aboutOpts.graduated }} </span>
              <span> <i class="icon icon-tripadvisor"></i> {{ $config.aboutOpts.college }} </span>
            </div>
          </div>
          <div class="contact">
            <a
              v-for="(item, i) in $config.aboutOpts.contact"
              :key="i"
              :href="item.link"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt :src="item.icon" />
            </a>
          </div>
          <Segment v-for="(item, i) in about" :key="item.title" :title="item.title" :color="colors[i]">
            <MarkDown :content="item.content" :onlyRender="true" />
          </Segment>
        </div>
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.aboutOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import Segment from '@/components/Segment'
import { shuffle } from '@/utils'

export default {
  name: 'Friend',
  components: {
    MarkDown,
    Loading,
    Quote,
    Segment
  },
  data() {
    return {
      colors: shuffle(this.$config.themeColors),
      about: ''
    }
  },
  async created() {
    await this.queryAbout()
    this.renderGitalk()
  },
  methods: {
    // 获取关于详情
    async queryAbout() {
      this.about = await this.$store.dispatch('queryPage', { type: 'about' })
    },
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.aboutOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '关于'
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
