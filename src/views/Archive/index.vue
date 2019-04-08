<template>
  <div id="archive">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="posts.length">
        <Quote :quote="$config.archiveOpts.qoute" />
        <ArchiveCard
          :posts="posts"
          :loading="loading"
          :isDisabledPrev="isDisabledPrev"
          :isDisabledNext="isDisabledNext"
          @handleClick="queryPosts"
        />
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.archiveOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import ArchiveCard from '@/components/Archive'

export default {
  name: 'Archive',
  components: {
    Loading,
    Quote,
    ArchiveCard
  },
  data() {
    return {
      loading: false,
      page: 0,
      pageSize: 10,
      maxPage: 0,
      posts: [],
      list: []
    }
  },
  computed: {
    isDisabledPrev() {
      return this.page <= 1
    },
    isDisabledNext() {
      if (!this.maxPage) return false
      return this.page >= this.maxPage
    }
  },
  async created() {
    await this.queryPosts()
    this.renderGitalk()
  },
  methods: {
    // 获取文章列表
    async queryPosts(type = 'next') {
      if (this.loading) return
      if (type === 'prev' && this.isDisabledPrev) return
      if (type === 'next' && this.isDisabledNext) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1

      if (this.list[queryPage]) {
        this.posts = this.list[queryPage]
        this.page = queryPage
        return
      }

      this.loading = true
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false
      if (posts.length === 0) {
        this.maxPage = queryPage - 1
        return
      }

      this.page = queryPage
      this.posts = posts
      this.list[queryPage] = posts
      if (posts.length < this.pageSize) {
        this.maxPage = queryPage
      }
      // 获取文章热度
      this.$nextTick(async () => {
        this.posts = await this.$store.dispatch('queryHot', { posts: posts })
      })
    },
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.archiveOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '归档'
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
