<template>
  <div id="post"><h1>This is an post page</h1></div>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
      number: ''
    }
  },
  created() {
    this.number = this.$route.params.number
    this.queryPost()
  },
  methods: {
    // 获取文章详情
    queryPost() {
      console.log('queryPost!!', this.number)
      this.$store.dispatch('queryPost', { number: this.number })
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
