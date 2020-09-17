<template>
  <div id="archive">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="posts.length">
        <Quote :quote="$config.archiveOpts.qoute" />
        <ArchiveCard
          :posts="posts"
          :times="times"
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
import ArchiveCard from '@/components/ArchiveCard'
import Comment from '@/components/Comment'

export default {
  name: 'Archive',
  components: {
    Loading,
    Quote,
    ArchiveCard,
    Comment,
  },
  data() {
    return {
      loading: false,
      initComment: false,
      page: 0,
      pageSize: 10,
      posts: [],
      list: [],
      times: {},
    }
  },
  computed: {
    ...mapState({
      totalCount: (state) => state.totalCount,
    }),
    maxPage() {
      return Math.ceil(this.totalCount / this.pageSize)
    },
    isDisabledPrev() {
      return this.page <= 1
    },
    isDisabledNext() {
      return this.page >= this.maxPage
    },
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
        this.scrollTop(() => {
          this.posts = this.list[queryPage]
        })
        return
      }

      this.loading = true
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize,
      })
      this.loading = false

      this.scrollTop(() => {
        this.posts = posts
        this.list[queryPage] = posts
      })

      // 获取文章热度
      const ids = posts.map((o) => o.id)
      const hot = await this.$store.dispatch('queryHot', { ids })
      this.times = { ...this.times, ...hot }
    },
    // 滚动到顶部
    scrollTop(cb) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const delayTime = this.$isMobile.value ? 800 : 600
      setTimeout(cb, delayTime)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
