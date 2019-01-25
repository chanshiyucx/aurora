<template>
  <div id="book">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="books.length"><Quote :quote="$config.bookOpts.qoute" /></div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.bookOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'

export default {
  name: 'Book',
  components: {
    Loading,
    Quote
  },
  data() {
    return {
      books: []
    }
  },
  created() {
    this.queryBooks()
  },
  methods: {
    async queryBooks() {
      this.books = await this.$store.dispatch('queryPage', { type: 'books' })
      if (this.$config.bookOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '书单'
          })
          gitalk.render('gitalk')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
