<template>
  <div id="archive">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="archives.length">
        <Quote :quote="$config.archiveOpts.qoute" />
        <ArchiveCard
          :posts="archives"
          :loading="loading"
          :isDisabledPrev="isDisabledPrev"
          :isDisabledNext="isDisabledNext"
          @handleClick="queryArchives"
        />
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
import ArchiveCard from '@/components/Archive'

export default {
  name: 'Archive',
  components: {
    Loading,
    Quote,
    ArchiveCard
  },
  data() {
    return {
      loading: false,
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

      if (this.list[queryPage]) {
        this.archives = this.list[queryPage]
        this.page = queryPage
        return
      }

      this.loading = true
      const archives = await this.$store.dispatch('queryArchive', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false
      if (archives.length === 0) {
        this.maxPage = queryPage - 1
        return
      }

      this.page = queryPage
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
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
