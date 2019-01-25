<template>
  <div id="post">
    <Transition name="fade-transform" mode="out-in">
      <article v-if="post" class="card">
        <div class="post-header">
          <Lazyload :src="post.cover.src" :alt="post.cover.title" />
          <div>
            <div class="title">
              <h1>{{ post.title }}</h1>
              <span>{{ post.cover.title }}</span>
            </div>
            <div class="meta">
              <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
              <span> <i class="icon icon-fire"></i> 热度{{ post.times || 1 }}℃ </span>
              <span> <i class="icon icon-bookmark-empty"></i> {{ post.milestone.title }} </span>
              <span>
                <i class="icon icon-tag"></i>
                <span v-for="label in post.labels" :key="label.id">{{ label.name }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="post-body"><MarkDown :content="post.body" target="#post" /></div>
      </article>
      <Loading v-else />
    </Transition>
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Lazyload from '@/components/Lazyload'

export default {
  name: 'Post',
  components: {
    MarkDown,
    Loading,
    Lazyload
  },
  data() {
    return {
      number: '',
      post: ''
    }
  },
  created() {
    this.number = this.$route.params.number
    this.queryPost()
  },
  methods: {
    // 获取文章详情
    async queryPost() {
      this.post = await this.$store.dispatch('queryPost', { number: this.number })
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
