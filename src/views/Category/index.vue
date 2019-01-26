<template>
  <div id="category">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="category.length">
        <Quote :quote="$config.categoryOpts.qoute" />
        <ul class="content">
          <li v-for="item in category" :key="item.id">
            <img class="bg" :src="item.cover" alt="" />
            <div class="meta">
              <div><img class="avatar" :src="item.cover" alt="" /></div>
              <p>{{ item.summary }}</p>
            </div>
          </li>
        </ul>
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.categoryOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import { shuffle } from '@/utils'

export default {
  name: 'Category',
  components: {
    Loading,
    Quote
  },
  data() {
    return {
      colors: shuffle(this.$config.themeColors),
      category: []
    }
  },
  async created() {
    await this.queryCategory()
    this.renderGitalk()
  },
  methods: {
    async queryCategory() {
      this.category = await this.$store.dispatch('queryCategory')
      console.log('category', this.category)
    },
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.categoryOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '分类'
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
