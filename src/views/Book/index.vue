<template>
  <div id="book">
    <Transition name="fade-transform" mode="out-in">
      <div class="page" v-if="book.length">
        <Quote :quote="$config.bookOpts.qoute" />
        <ul class="content">
          <li v-for="item in book" :key="item.name">
            <div class="info">
              <a class="book-container" :href="item.link" target="_blank" rel="noreferrer noopener">
                <div class="book">
                  <img :src="item.cover" :alt="item.name" />
                </div>
              </a>
              <div>
                <h3>{{ item.name }}</h3>
                <p>作者：{{ item.author }}</p>
                <p>出版时间：{{ item.published }}</p>
                <p>阅读进度：{{ item.progress }}</p>
                <p>
                  <span>读书笔记：</span>
                  <a v-if="item.postLink" :href="item.postLink" target="_blank" rel="noopener noreferrer">
                    {{ item.postTitle }}
                  </a>
                  <span v-else>暂无</span>
                </p>
                <p>
                  <span>推荐指数：</span>
                  <span></span>
                  <i class="icon icon-star" v-for="i in parseInt(item.rating)" :key="`star-${i}`"></i>
                </p>
              </div>
            </div>
            <p class="description">{{ item.description }}</p>
          </li>
        </ul>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.bookOpts.enableComment && initComment" title="书单" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'
import Comment from '@/components/Comment'

export default {
  name: 'Book',
  components: {
    Loading,
    Quote,
    Comment,
  },
  data() {
    return {
      book: [],
      initComment: false,
    }
  },
  async created() {
    await this.queryBooks()
    this.initComment = true
  },
  methods: {
    async queryBooks() {
      this.book = await this.$store.dispatch('queryPage', { type: 'book' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
