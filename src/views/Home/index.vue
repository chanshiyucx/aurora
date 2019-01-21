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
          <img :src="post.cover.src" alt="" />
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
            <span v-for="label in post.labels.slice(0, 2)" :key="label.id"> {{ label.name }}</span>
          </span>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AOS from 'aos'
import MarkDown from '@/components/MarkDown'

export default {
  name: 'Home',
  components: {
    MarkDown
  },
  computed: mapState({
    posts: state => state.posts
  }),
  watch: {
    posts(val, oldVal) {
      if (val.length !== oldVal.length) {
        console.log('refresh')
        AOS.refresh()
      }
    }
  },
  created() {
    this.queryPosts()
  },
  mounted() {
    AOS.init({
      duration: 1500,
      easing: 'ease-out'
    })
  },
  methods: {
    // 获取文章列表
    async queryPosts() {
      await this.$store.dispatch('queryPosts')
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
