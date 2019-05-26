<template>
  <div id="inspiration">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="inspiration.length">
        <Quote :quote="$config.inspirationOpts.qoute" />
        <div class="content">
          <Segment v-for="(item, i) in inspiration" :key="item.number" :title="item.date" :color="colors[i]">
            <MarkDown :content="item.body" :onlyRender="true" />
          </Segment>
        </div>
        <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
          <Pagination
            :loading="loading"
            :isDisabledPrev="isDisabledPrev"
            :isDisabledNext="isDisabledNext"
            @handleClick="queryInspiration"
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
import Quote from '@/components/Quote'
import Segment from '@/components/Segment'
import Pagination from '@/components/Pagination'
import Comment from '@/components/Comment'
import { shuffle } from '@/utils'

export default {
  name: 'Inspiration',
  components: {
    MarkDown,
    Loading,
    Quote,
    Segment,
    Pagination,
    Comment
  },
  data() {
    return {
      loading: false,
      initComment: false,
      colors: shuffle(this.$config.themeColors),
      count: 0,
      page: 0,
      pageSize: 10,
      inspiration: [],
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
    this.count = await this.$store.dispatch('queryInspirationCount')
    await this.queryInspiration()
    this.initComment = true
  },
  methods: {
    async queryInspiration(type = 'next') {
      if (this.loading) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage

      if (this.list[queryPage]) {
        this.inspiration = this.list[queryPage]
        return
      }

      this.loading = true
      const inspiration = await this.$store.dispatch('queryInspiration', {
        page: queryPage,
        pageSize: this.pageSize
      })
      this.loading = false

      this.inspiration = inspiration
      this.$set(this.list, queryPage, inspiration)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
