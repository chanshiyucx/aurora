<template>
  <div id="mood">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="mood.length">
        <Quote :quote="$config.moodOpts.qoute" />
        <div class="content">
          <Segment v-for="(item, i) in mood" :key="item.number" :title="item.date" :color="colors[i]">
            <MarkDown :content="item.body" :onlyRender="true" />
          </Segment>
        </div>
        <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
          <Pagination
            :loading="loading"
            :isDisabledPrev="isDisabledPrev"
            :isDisabledNext="isDisabledNext"
            @handleClick="queryMood"
          />
        </div>
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.moodOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import Segment from '@/components/Segment'
import Pagination from '@/components/Pagination'
import { shuffle } from '@/utils'

export default {
  name: 'Mood',
  components: {
    MarkDown,
    Loading,
    Quote,
    Segment,
    Pagination
  },
  data() {
    return {
      loading: false,
      colors: shuffle(this.$config.themeColors),
      page: 0,
      pageSize: 10,
      maxPage: 0,
      mood: [],
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
    await this.queryMood()
    this.renderGitalk()
  },
  methods: {
    async queryMood(type = 'next') {
      if (this.loading) return
      if (type === 'prev' && this.isDisabledPrev) return
      if (type === 'next' && this.isDisabledNext) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage
      if (this.list[queryPage]) {
        this.mood = this.list[queryPage]
        return
      }

      this.loading = true
      const mood = await this.$store.dispatch('queryMood', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false

      this.mood = mood
      this.list[queryPage] = mood
      if (mood.length < this.pageSize) {
        this.maxPage = queryPage
      }
    },
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.moodOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '心情'
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
