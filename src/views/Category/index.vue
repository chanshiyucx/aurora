<template>
  <div id="category">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="category.length">
        <Quote :quote="$config.categoryOpts.qoute" />
        <ul class="category">
          <li class="card" v-for="item in category" :key="item.id" @click="handleFilter(item)">
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
        <Transition name="fade-transform" mode="out-in">
          <div v-if="posts.length">
            <div class="clean">
              <span>Category:</span>
              <span class="clean-btn" @click="reset">
                {{ milestone.title }} <i class="icon icon-cancel-outline"></i>
              </span>
            </div>
            <ArchiveCard
              :posts="posts"
              :loading="loading"
              :isDisabledPrev="isDisabledPrev"
              :isDisabledNext="isDisabledNext"
              @handleClick="filterPosts"
            />
          </div>
          <Loading v-else-if="milestone && loading" />
        </Transition>
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
import ArchiveCard from '@/components/Archive'

export default {
  name: 'Category',
  components: {
    Loading,
    Quote,
    ArchiveCard
  },
  data() {
    return {
      loading: false,
      category: [],
      milestone: '',
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
    await this.queryCategory()
    this.renderGitalk()
  },
  methods: {
    async queryCategory() {
      this.category = await this.$store.dispatch('queryCategory')
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
    // 筛选条件
    handleFilter(category) {
      this.reset()
      this.milestone = category
      this.filterPosts()
    },
    // 重置
    reset() {
      this.milestone = ''
      this.page = 0
      this.maxPage = 0
      this.list = []
      this.posts = []
    },
    // 查找文章
    async filterPosts(type = 'next') {
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
      const filter = `&milestone=${this.milestone.number}`
      const posts = await this.$store.dispatch('queryArchive', {
        page: queryPage,
        pageSize: this.pageSize,
        filter
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
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
