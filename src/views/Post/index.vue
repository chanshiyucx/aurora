<template>
  <div id="post">
    <Transition name="fade-transform" mode="out-in">
      <article v-if="post" class="card">
        <div class="post-header">
          <Cover :src="post.cover.src" :alt="post.cover.title" loadCover maskHeight="0.8rem" />
          <div class="head">
            <div class="title">
              <h1>{{ post.title }}</h1>
              <span>{{ post.cover.title }}</span>
            </div>
            <div class="meta">
              <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
              <span> <i class="icon icon-fire"></i> 热度{{ post.times || 1 }}℃ </span>
              <span>
                <i class="icon icon-bookmark-empty"></i>
                {{ post.milestone ? post.milestone.title : '未分类' }}
              </span>
              <span>
                <i class="icon icon-tag"></i>
                <span v-for="label in post.labels" :key="label.id">{{ label.name }}</span>
              </span>
            </div>
          </div>
        </div>
        <div class="post-body">
          <MarkDown :content="post.body" target="#post" />
        </div>
      </article>
      <Loading v-else />
    </Transition>

    <Comment v-if="initComment" :title="post.title" />
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'
import Loading from '@/components/Loading'
import Comment from '@/components/Comment'
import Cover from '@/components/Cover'

export default {
  name: 'post',
  components: {
    MarkDown,
    Loading,
    Cover,
    Comment
  },
  data() {
    return {
      number: '',
      post: '',
      initComment: false
    }
  },
  async created() {
    this.number = this.$route.params.number
    await this.queryPost()
    this.$nextTick(() => (this.initComment = true))
  },
  methods: {
    // 获取文章详情
    async queryPost() {
      this.post = await this.$store.dispatch('queryPost', { number: this.number })
      this.$nextTick(async () => {
        const hot = await this.$store.dispatch('increaseHot', { post: this.post })
        this.$set(this.post, 'times', hot)
      })
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
