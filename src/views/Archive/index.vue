<template>
  <div id="archive">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="archives.length">
        <Quote :quote="$config.archiveOpts.qoute" />
        <ul class="content">
          <li
            v-for="(post, i) in archives"
            :key="post.id"
            @click="gotoPost(post.number)"
            :style="{ borderTopColor: colors[i] }"
          >
            <h3>{{ post.title }}</h3>
            <div class="post-meta">
              <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
              <span> <i class="icon icon-fire"></i> 热度{{ post.times || 1 }}℃ </span>
              <span> <i class="icon icon-bookmark-empty"></i> {{ post.milestone.title }} </span>
              <span>
                <i class="icon icon-tag"></i>
                <span v-for="label in post.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
              </span>
            </div>
          </li>
        </ul>
        <div class="btn-group" v-if="!isDisabledPrev && !isDisabledNext">
          <Pagination
            :loading="loading"
            :isDisabledPrev="isDisabledPrev"
            :isDisabledNext="isDisabledNext"
            @handleClick="queryArchives"
          />
        </div>
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
import Pagination from '@/components/Pagination'
import { shuffle } from '@/utils'

export default {
  name: 'Archive',
  components: {
    Loading,
    Quote,
    Pagination
  },
  data() {
    return {
      loading: false,
      colors: shuffle(this.$config.themeColors),
      page: 0,
      pageSize: 10,
      maxPage: 0,
      archives: [],
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
    await this.queryArchives()
    this.renderGitalk()
  },
  methods: {
    // 获取文章列表
    async queryArchives(type = 'next') {
      if (this.loading) return
      if (type === 'prev' && this.isDisabledPrev) return
      if (type === 'next' && this.isDisabledNext) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage
      if (this.list[queryPage]) {
        this.archives = this.list[queryPage]
        return
      }

      this.loading = true
      const archives = await this.$store.dispatch('queryArchive', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false

      this.archives = archives
      this.list[queryPage] = archives
      if (archives.length < this.pageSize) {
        this.maxPage = queryPage
      }
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
    },
    // 跳转文章页
    gotoPost(number) {
      this.$router.push({ name: 'post', params: { number } })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
