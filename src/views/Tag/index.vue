<template>
  <div id="tag">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="tag.length">
        <Quote :quote="$config.tagOpts.qoute" />
        <ul class="content">
          <li v-for="item in tag" :key="item.id" @click="handleFilter(item)">
            <span :style="{ color: `#${item.color}` }">{{ item.name }}</span>
          </li>
        </ul>
        <Transition name="fade-transform" mode="out-in">
          <div v-if="posts.length">
            <div class="clean">
              <span>Tag:</span>
              <span class="clean-btn" @click="reset">
                {{ label.name }} <i class="icon icon-cancel-outline"></i>
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
          <Loading v-else-if="label && loading" />
        </Transition>
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.tagOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import ArchiveCard from '@/components/Archive'

export default {
  name: 'Tag',
  components: {
    Loading,
    Quote,
    ArchiveCard
  },
  data() {
    return {
      loading: false,
      tag: [],
      label: '',
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
    await this.queryTag()
    this.renderGitalk()
  },
  methods: {
    async queryTag() {
      this.tag = await this.$store.dispatch('queryTag')
    },
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.tagOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '标签'
          })
          gitalk.render('gitalk')
        })
      }
    },
    // 筛选条件
    handleFilter(label) {
      this.reset()
      this.label = label
      this.filterPosts()
    },
    // 重置
    reset() {
      this.label = ''
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
      const filter = `&labels=${this.label.name}`
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
