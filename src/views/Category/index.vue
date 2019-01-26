<template>
  <div id="category">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="category.length">
        <Quote :quote="$config.categoryOpts.qoute" />
        <ul class="content">
          <li class="card" v-for="item in category" :key="item.id" @click="filterPosts(item)">
            <img class="bg" :src="item.cover" alt="" />
            <div class="meta">
              <div>
                <img class="avatar" :src="item.cover" alt="" />
                <span> {{ item.title }} ({{ item.open_issues }}) </span>
              </div>
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
      loading: false,
      colors: shuffle(this.$config.themeColors),
      category: [],
      posts: []
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
    },
    // 查找文章
    async filterPosts(category) {
      this.loading = true
      this.posts = await this.$store.dispatch('filterPosts', {
        type: 'milestone',
        filter: category.number
      })
      console.log('this.posts', this.posts)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
