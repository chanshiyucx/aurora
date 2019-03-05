<template>
  <div id="home">
    <Transition name="fade-transform" mode="out-in">
      <div class="main" v-if="posts.length">
        <article
          class="card"
          data-aos="fade-up"
          v-for="post in posts"
          :key="post.id"
          @click="gotoPost(post.number)"
          @mouseenter="showTips(post)"
        >
          <div class="post-header">
            <Lazyload :src="post.cover.src" :alt="post.cover.title" />
            <div>
              <h3>{{ post.title }}</h3>
              <span>{{ post.cover.title }}</span>
            </div>
          </div>
          <div class="post-body"><MarkDown :content="post.desc" :onlyRender="true" /></div>
          <div class="post-meta">
            <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
            <span> <i class="icon icon-fire"></i> 热度{{ post.times || 1 }}℃ </span>
            <span>
              <i class="icon icon-bookmark-empty"></i> {{ post.milestone ? post.milestone.title : '未分类' }}
            </span>
            <span>
              <i class="icon icon-tag"></i>
              <span v-for="label in post.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
            </span>
          </div>
        </article>
      </div>
    </Transition>

    <Transition name="fade-transform" mode="out-in">
      <div v-if="!posts.length"><Loading /></div>
      <div v-else-if="hasMore" class="pagination" @click="queryPosts">
        <div class="previous cursor">
          <Spinner v-if="loading"></Spinner>
          <span v-else>Previous</span>
        </div>
        <div class="rect"></div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AOS from 'aos'
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Spinner from '@/components/Spinner'
import Lazyload from '@/components/Lazyload'

export default {
  name: 'Home',
  components: {
    MarkDown,
    Loading,
    Spinner,
    Lazyload
  },
  data() {
    return {
      loading: false
    }
  },
  computed: mapState({
    posts: state => state.posts,
    hasMore: state => state.hasMore
  }),
  async created() {
    if (!this.posts.length) {
      await this.queryPosts()
    }

    this.$nextTick(() => {
      AOS.init({
        duration: 2000,
        easing: 'ease-out',
        debounceDelay: 200,
        offset: 50
      })
      setTimeout(AOS.refresh, 600)
    })
  },
  methods: {
    // 获取文章列表
    async queryPosts() {
      if (this.loading) return
      this.loading = true
      await this.$store.dispatch('queryPosts')
      this.loading = false
    },
    // 跳转文章页
    gotoPost(number) {
      this.$router.push({ name: 'post', params: { number } })
    },
    // 看板娘
    showTips(post) {
      const tips = `要去看看<span style="color: #b854d4"> ${post.title} </span>吗？`
      this.$store.dispatch('showTips', { tips })
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
