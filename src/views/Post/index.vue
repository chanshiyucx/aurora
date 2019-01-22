<template>
  <div id="post">
    <article class="card"><MarkDown :content="post.body" target="#post" /></article>
  </div>
</template>

<script>
import MarkDown from '@/components/MarkDown'

export default {
  name: 'Post',
  components: {
    MarkDown
  },
  data() {
    return {
      number: '',
      post: {}
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
