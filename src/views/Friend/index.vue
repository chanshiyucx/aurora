<template>
  <div id="friend">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="friend.length">
        <Quote :quote="$config.friendOpts.qoute" />
        <ul class="content">
          <li v-for="item in friend" :key="item.name">
            <a :href="item.link" rel="noopener noreferrer" target="_blank">
              <Lazyload class="cover" :src="item.cover" :alt="item.name" />
              <div class="info">
                <img :src="item.avatar" alt /> <span>{{ item.name }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.friendOpts.enableGitalk && initComment" title="友链" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Lazyload from '@/components/Lazyload'
import Quote from '@/components/Quote'
import Comment from '@/components/Comment'

export default {
  name: 'Friend',
  components: {
    Loading,
    Lazyload,
    Quote,
    Comment
  },
  data() {
    return {
      friend: [],
      initComment: false
    }
  },
  async created() {
    await this.queryFriends()
    this.initComment = true
  },
  methods: {
    // 获取友链
    async queryFriends() {
      this.friend = await this.$store.dispatch('queryPage', { type: 'friend' })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
