<template>
  <div id="home">
    <div class="main">
      <article
        class="card"
        v-for="post in posts"
        :key="post.id"
        @click="gotoPost(post.number)"
        data-aos="fade-up"
      >
        <div class="post-header">
          <img :src="post.cover.src" alt />
          <div>
            <h3>{{ post.title }}</h3>
            <span>{{ post.cover.title }}</span>
          </div>
        </div>
        <div class="post-body"><MarkDown :content="post.desc" /></div>
        <div class="post-meta">
          <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
          <span> <i class="icon icon-fire"></i> 热度{{ post.times || 1 }}℃ </span>
          <span> <i class="icon icon-bookmark-empty"></i> {{ post.milestone.title }} </span>
          <span>
            <i class="icon icon-tag"></i>
            <span v-for="label in post.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
          </span>
        </div>
      </article>
    </div>
    <div v-if="hasMore" class="pagination" @click="queryPosts">
      <div class="previous">
        Previous
        <Spinner v-show="loading"></Spinner>
      </div>
      <div class="rect"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AOS from 'aos'
import MarkDown from '@/components/MarkDown'
import Spinner from '@/components/Spinner'

export default {
  name: 'Home',
  components: {
    MarkDown,
    Spinner
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
  created() {
    this.queryPosts()
  },
  mounted() {
    AOS.init({
      duration: 2000,
      easing: 'ease-out'
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
    }
  },
  beforeDestroy() {
    this.$store.commit('resetPosts')
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
