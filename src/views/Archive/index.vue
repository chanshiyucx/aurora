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

    <Comment v-if="$config.archiveOpts.enableGitalk && initComment" title="归档" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import ArchiveCard from '@/components/Archive'
import Comment from '@/components/Comment'

export default {
  name: 'Archive',
  components: {
    Loading,
    Quote,
    ArchiveCard,
    Comment
  },
  data() {
    return {
      loading: false,
      initComment: false,
      count: 0,
      page: 0,
      pageSize: 10,
      posts: [],
      list: []
    }
  },
  computed: {
    currentCount() {
      let count = 0
      this.list.forEach((o, i) => {
        if (i <= this.page) {
          count += o.length
        }
      })
      return count
    },
    isDisabledPrev() {
      return this.page <= 1
    },
    isDisabledNext() {
      return this.currentCount >= this.count
    }
  },
  async created() {
    this.count = await this.$store.dispatch('queryArchivesCount')
    await this.queryPosts()
    this.initComment = true
  },
  methods: {
    // 获取文章列表
    async queryPosts(type = 'next') {
      if (this.loading) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage

      if (this.list[queryPage]) {
        this.posts = this.list[queryPage]
        return
      }

      this.loading = true
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false

      this.posts = posts
      this.$set(this.list, queryPage, posts)
      // 获取文章热度
      this.$nextTick(async () => {
        this.posts = await this.$store.dispatch('queryHot', { posts: posts })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
