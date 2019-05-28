<template>
  <div id="archive">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="posts.length">
        <Quote :quote="$config.archiveOpts.qoute" />
        <ArchiveCard
          :posts="posts"
          :times="postTimes"
          :loading="loading"
          :isDisabledPrev="isDisabledPrev"
          :isDisabledNext="isDisabledNext"
          @handlePage="queryPosts"
        />
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.archiveOpts.enableComment && initComment" title="归档" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
      page: 0,
      pageSize: 12,
      posts: [],
      list: [],
      times: {},
      delayTime: this.$config.isMobile ? 500 : 0 + 800
    }
  },
  computed: {
    ...mapState({
      totalCount: state => state.totalCount
    }),
    postTimes() {
      return this.posts.map(o => o.id).map(id => this.times[id])
    },
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
      return this.currentCount >= this.totalCount
    }
  },
  async created() {
    if (!this.totalCount) {
      await this.$store.dispatch('queryArchivesCount')
    }
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
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => {
          this.posts = this.list[queryPage]
        }, this.delayTime)
        return
      }

      this.loading = true
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false

      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        this.posts = posts
        this.$set(this.list, queryPage, posts)
      }, this.delayTime)

      // 获取文章热度
      const ids = posts.map(o => o.id)
      const hot = await this.$store.dispatch('queryHot', { ids })
      const newTimes = { ...this.times }
      hot.forEach(o => {
        newTimes[o.id] = o.time
      })
      this.times = newTimes
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
