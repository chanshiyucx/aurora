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

    <Comment v-if="$config.tagOpts.enableGitalk && initComment" title="标签" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import ArchiveCard from '@/components/Archive'
import Comment from '@/components/Comment'

export default {
  name: 'Tag',
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
      tag: [],
      label: '',
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
      this.count = await this.$store.dispatch('queryFilterArchivesCount', { label: label.name })
      this.label = label
      this.filterPosts()
    },
    // 重置
    reset() {
      this.label = ''
      this.count = 0
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
        this.posts = this.list[queryPage]
        return
      }

      this.loading = true
      const filter = `&labels=${this.label.name}`
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize,
        filter
      })
      this.loading = false

      this.posts = posts
      this.$set(this.list, queryPage, posts)
      // 获取文章热度
      this.$nextTick(async () => {
        const ids = this.posts.map(o => o.id)
        const hot = await this.$store.dispatch('queryHot', { ids })
        this.posts.forEach((o, i) => {
          o.times = hot[i]
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
