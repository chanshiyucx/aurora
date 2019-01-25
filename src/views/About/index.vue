<template>
  <div id="about">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="about">
        <Quote :quote="$config.aboutOpts.qoute" />
        <div class="content">
          <div class="header">
            <img :src="$config.aboutOpts.avatar" alt="" />
            <div class="info">
              <span> <i class="icon icon-heart"></i> {{ $config.title }}</span>
              <span> <i class="icon icon-heart"></i> {{ $config.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
      <Loading v-else />
    </Transition>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'

export default {
  name: 'Friend',
  components: {
    Loading,
    Quote
  },
  data() {
    return {
      about: ''
    }
  },
  created() {
    this.queryAbout()
  },
  methods: {
    async queryAbout() {
      this.friends = await this.$store.dispatch('queryPage', { type: 'about' })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
