<template>
  <div id="tag">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="tag.length">
        <Quote :quote="$config.tagOpts.qoute" />
        <Transition name="fade-transform" mode="out-in">
          <div v-if="posts.length">
            <div class="clean">
              <span>Tag:</span>
              <span class="clean-btn cursor" @click="reset">
                {{ label.name }}
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
          <Loading v-else-if="label" />
          <ul v-else class="content">
            <li v-for="item in tag" :key="item.id" @click="handleFilter(item)">
              <span class="cursor" :style="{ color: `#${item.color}` }">{{ item.name }}</span>
            </li>
          </ul>
        </Transition>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.tagOpts.enableComment && initComment" title="标签" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import ArchiveCard from '@/components/ArchiveCard'
import Comment from '@/components/Comment'

export default {
  name: 'Tag',
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
      tag: [],
      label: '',
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
    await this.queryTag()
    this.initComment = true
  },
  methods: {
    // 获取标签列表
    async queryTag() {
      this.tag = await this.$store.dispatch('queryTag')
    },
    // 筛选条件
    async handleFilter(label) {
      if (this.label.name === label.name) return
      this.reset()
      this.label = label
      this.totalCount = await this.$store.dispatch('queryFilterArchivesCount', { label: label.name })
      this.filterPosts()
    },
    // 重置
    reset() {
      this.label = ''
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
      const filter = `&labels=${this.label.name}`
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
