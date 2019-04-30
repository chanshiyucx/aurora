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

    <Comment v-if="$config.moodOpts.enableComment && initComment" title="心情" />
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
  name: 'Mood',
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
      mood: [],
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
    this.count = await this.$store.dispatch('queryMoodCount')
    await this.queryMood()
    this.initComment = true
  },
  methods: {
    async queryMood(type = 'next') {
      if (this.loading) return
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
      this.$set(this.list, queryPage, mood)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
