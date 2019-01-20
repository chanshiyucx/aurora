<template>
  <div id="home">
    <div class="main">
      <article class="card" v-for="post in posts" :key="post.id">
        <div class="post-header">
          <img :src="post.cover" alt="" />
          <h3>{{ post.title }}</h3>
        </div>
        <div class="post-body"><MarkDown :content="post.desc" /></div>
        <div class="post-meta">
          <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
          <span> <i class="icon icon-fire"></i> 热度{{ post.times }}℃ </span>
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
import MarkDown from '@/components/MarkDown'

export default {
  name: 'Home',
  components: {
    MarkDown
  },
  computed: mapState({
    posts: state => state.posts
  }),
  created() {
    this.queryPosts()
  },
  methods: {
    queryPosts() {
      console.log('queryPosts')
      this.$store.dispatch('queryPosts')
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
