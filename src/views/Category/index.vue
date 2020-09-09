<template>
  <div id="category">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="category.length">
        <Quote :quote="$config.categoryOpts.qoute" />
        <Transition name="fade-transform" mode="out-in">
          <div v-if="posts.length">
            <div class="clean">
              <span>Category:</span>
              <span class="clean-btn cursor" @click="reset">
                {{ milestone.title }}
                <i class="icon icon-cancel-outline"></i>
              </span>
            </div>
            <ArchiveCard
              :posts="posts"
              :times="times"
              :loading="loading"
              :isDisabledPrev="isDisabledPrev"
              :isDisabledNext="isDisabledNext"
              @handlePage="filterPosts"
            />
          </div>
          <Loading v-else-if="milestone" />
          <ul v-else class="content">
            <li class="cursor" v-for="item in category" :key="item.id" @click="handleFilter(item)">
              <img class="bg" :src="item.cover" alt />
              <div class="meta">
                <div>
                  <img class="avatar" :src="item.cover" alt />
                  <span>{{ item.title }} ({{ item.open_issues }})</span>
                </div>
                <p>{{ item.summary }}</p>
              </div>
            </li>
          </ul>
        </Transition>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.categoryOpts.enableComment && initComment" title="分类" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import ArchiveCard from '@/components/ArchiveCard'
import Comment from '@/components/Comment'

export default {
  name: 'Category',
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
      category: [],
      milestone: '',
      totalCount: 0,
      page: 0,
      pageSize: 10,
      posts: [],
      list: [],
      times: {},
    }
  },
  computed: {
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
    await this.queryCategory()
    this.initComment = true
  },
  methods: {
    // 获取分类列表
    async queryCategory() {
      this.category = await this.$store.dispatch('queryCategory')
    },
    // 筛选条件
    async handleFilter(category) {
      if (this.milestone.number === category.number) return
      this.reset()
      this.milestone = category
      this.totalCount = await this.$store.dispatch('queryFilterArchivesCount', { milestone: category.title })
      this.filterPosts()
    },
    // 重置
    reset() {
      this.milestone = ''
      this.totalCount = 0
      this.page = 0
      this.list = []
      this.posts = []
    },
    // 查找文章
    async filterPosts(type = 'next') {
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
      const filter = `&milestone=${this.milestone.number}`
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize,
        filter,
      })

      this.scrollTop(() => {
        this.loading = false
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
