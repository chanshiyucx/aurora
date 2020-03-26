<template>
  <div id="about">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="about">
        <Quote :quote="$config.aboutOpts.qoute" />
        <div class="content">
          <div class="header">
            <img :src="$config.aboutOpts.avatar" alt />
            <div class="info">
              <span>
                <i class="icon icon-fort-awesome"></i>
                {{ $config.title }}
              </span>
              <span>
                <i class="icon icon-pagelines"></i>
                {{ $config.subtitle }}
              </span>
              <span>
                <i class="icon icon-graduation-cap"></i>
                {{ $config.aboutOpts.graduated }}
              </span>
              <span>
                <i class="icon icon-tripadvisor"></i>
                {{ $config.aboutOpts.college }}
              </span>
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
            <MarkDown :content="item.content" />
          </Segment>
        </div>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.aboutOpts.enableComment && initComment" title="关于" />
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Comment from '@/components/Comment'
import Quote from '@/components/Quote'
import Segment from '@/components/Segment'
import { shuffle } from '@/utils'

export default {
  name: 'About',
  components: {
    MarkDown,
    Loading,
    Comment,
    Quote,
    Segment,
  },
  data() {
    return {
      colors: shuffle(this.$config.themeColors),
      about: '',
      initComment: false,
    }
  },
  async created() {
    await this.queryAbout()
    this.initComment = true
  },
  methods: {
    // 获取关于详情
    async queryAbout() {
      this.about = await this.$store.dispatch('queryPage', { type: 'about' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
