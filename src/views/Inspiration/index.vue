<template>
  <div id="inspiration">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="inspiration.length">
        <Quote :quote="$config.inspirationOpts.qoute" />
        <div class="content">
          <Segment v-for="(item, i) in inspiration" :key="item.number" :title="item.date" :color="colors[i]">
            <MarkDown :content="item.body" />
          </Segment>
        </div>
        <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
          <Pagination
            :loading="loading"
            :isDisabledPrev="isDisabledPrev"
            :isDisabledNext="isDisabledNext"
            @handlePage="queryInspiration"
          />
        </div>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.inspirationOpts.enableComment && initComment" title="灵感" />
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import Quote from '@/components/Quote'
import Segment from '@/components/Segment'
import Comment from '@/components/Comment'
import { shuffle } from '@/utils'

export default {
  name: 'Inspiration',
  components: {
    MarkDown,
    Loading,
    Pagination,
    Quote,
    Segment,
    Comment,
  },
  data() {
    return {
      loading: false,
      initComment: false,
      colors: shuffle(this.$config.themeColors),
      totalCount: 0,
      page: 0,
      pageSize: 10,
      inspiration: [],
      list: [],
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
    this.totalCount = await this.$store.dispatch('queryInspirationCount')
    await this.queryInspiration()
    this.initComment = true
  },
  methods: {
    async queryInspiration(type = 'next') {
      if (this.loading) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage

      if (this.list[queryPage]) {
        this.scrollTop(() => {
          this.inspiration = this.list[queryPage]
        })
        return
      }

      this.loading = true
      const inspiration = await this.$store.dispatch('queryInspiration', {
        page: queryPage,
        pageSize: this.pageSize,
      })
      this.loading = false

      this.scrollTop(() => {
        this.inspiration = inspiration
        this.list[queryPage] = inspiration
      })
    },
    scrollTop(cb) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const delayTime = this.$config.isMobile ? 800 : 600
      setTimeout(cb, delayTime)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
