<template>
  <div id="book">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="book.length">
        <Quote :quote="$config.bookOpts.qoute" />
        <ul class="content">
          <li v-for="item in book" :key="item.name">
            <div class="info">
              <img :src="item.cover" alt />
              <div>
                <h3>{{ item.name }}</h3>
                <p>作者：{{ item.author }}</p>
                <p>出版时间：{{ item.published }}</p>
                <p>阅读进度：{{ item.progress }}</p>
                <p>
                  读书笔记：
                  <a v-if="item.postLink" :href="item.postLink" rel="noopener noreferrer" target="_blank">
                    {{ item.postTitle }}
                  </a>
                  <span v-else>暂无</span>
                </p>
                <p>
                  推荐指数：
                  <i class="icon icon-star" v-for="i in parseInt(item.rating)" :key="`star-${i}`"></i>
                  <i
                    class="icon icon-star unstar"
                    v-for="i in 5 - parseInt(item.rating)"
                    :key="`unstar-${i}`"
                  ></i>
                </p>
              </div>
            </div>
            <div class="desc">{{ item.desc }}</div>
          </li>
        </ul>
      </div>
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
      book: []
    }
  },
  async created() {
    await this.queryBooks()
    this.renderGitalk()
  },
  methods: {
    // 获取书单
    async queryBooks() {
      this.book = await this.$store.dispatch('queryPage', { type: 'book' })
    },
    // 加载 Gitalk
    renderGitalk() {
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
