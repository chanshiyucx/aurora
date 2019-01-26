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
        <div class="btn-group">
          <div class="pagination">
            <div class="previous">
              <Spinner v-if="loading"></Spinner>
              <div v-else class="btn cursor">
                <span :class="isDisabledPrev && 'disabled'" @click="queryArchives('prev')">Prev</span>
                <span :class="isDisabledNext && 'disabled'" @click="queryArchives('next')">Next</span>
              </div>
            </div>
            <div class="rect"></div>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade-transform" mode="out-in">
      <div v-if="archives.length === 0"><Loading /></div>
    </Transition>

    <div v-if="$config.archiveOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import Spinner from '@/components/Spinner'
import { shuffle } from '@/utils'

export default {
  name: 'Archive',
  components: {
    Loading,
    Spinner,
    Quote
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
