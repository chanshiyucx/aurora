<template>
  <div id="home">
    <Transition name="fade-transform" mode="out-in">
      <div v-if="posts.length">
        <div class="content">
          <article
            class="cursor"
            data-aos="fade-up"
            v-for="(post, index) in posts"
            :key="post.id"
            @mouseenter="showTips(post)"
          >
            <router-link :to="{ name: 'post', params: { number: post.number, post } }">
              <div class="post-header">
                <Cover
                  :src="post.cover.src"
                  :alt="post.cover.title"
                  :loadCover="index < LOAD_INX"
                  @loadNext="loadNext"
                />
                <div class="post-head">
                  <h3>{{ post.title }}</h3>
                  <span>{{ post.cover.title }}</span>
                </div>
              </div>
              <div class="post-body">
                <MarkDown :content="post.description" />
              </div>
              <div class="post-meta">
                <span>
                  <i class="icon icon-calendar"></i>
                  {{ post.created_at }}
                </span>
                <span>
                  <i class="icon icon-fire"></i>
                  热度{{ times[post.id] || 1 }}℃
                </span>
                <span>
                  <i class="icon icon-bookmark-empty"></i>
                  {{ post.milestone ? post.milestone.title : '未分类' }}
                </span>
                <span>
                  <i class="icon icon-tag"></i>
                  <span v-for="label in post.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
                </span>
              </div>
            </router-link>
          </article>
        </div>
        <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
          <Pagination
            :loading="loading"
            :isDisabledPrev="isDisabledPrev"
            :isDisabledNext="isDisabledNext"
            @handlePage="queryPosts"
          />
        </div>
      </div>
      <Loading v-else />
    </Transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AOS from 'aos'
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
import Cover from '@/components/Cover'

export default {
  name: 'Home',
  components: {
    MarkDown,
    Loading,
    Pagination,
    Cover,
  },
  data() {
    return {
      loading: false,
      page: 0,
      pageSize: 10,
      posts: [],
      list: [],
      times: {},
      LOAD_INX: 4,
    }
  },
  computed: {
    ...mapState({
      totalCount: (state) => state.totalCount,
    }),
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
    if (!this.totalCount) {
      await this.$store.dispatch('queryArchivesCount')
    }
    await this.queryPosts()

    AOS.init({
      duration: 2000,
      easing: 'ease',
      debounceDelay: 50,
      throttleDelay: 100,
      offset: 50,
    })
  },
  methods: {
    // 获取文章列表
    async queryPosts(type = 'next') {
      if (this.loading) return
      const queryPage = type === 'prev' ? this.page - 1 : this.page + 1
      this.page = queryPage
      this.LOAD_INX = 4

      if (this.list[queryPage]) {
        this.scrollTop(() => {
          this.posts = this.list[queryPage]
        })
        return
      }

      this.loading = true
      const posts = await this.$store.dispatch('queryPosts', {
        page: queryPage,
        pageSize: this.pageSize,
      })
      this.loading = false

      this.scrollTop(() => {
        this.posts = posts
        this.list[queryPage] = posts
      })

      // 获取文章热度
      const ids = posts.map((o) => o.id)
      const hot = await this.$store.dispatch('queryHot', { ids })
      this.times = { ...this.times, ...hot }
    },
    // 滚动到顶部
    scrollTop(cb) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      const delayTime = this.$isMobile.value ? 200 : 0
      setTimeout(cb, 800 + delayTime)
      setTimeout(AOS.refresh, 1200 + delayTime)
    },
    // 按顺序加载封面图
    loadNext() {
      this.LOAD_INX += 1
    },
    // 看板娘
    showTips(post) {
      const tips = `要去看看<span style="color: #b854d4"> ${post.title} </span>吗？`
      this.$store.dispatch('showTips', { tips })
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
