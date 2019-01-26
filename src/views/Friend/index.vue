<template>
  <div id="friend">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="friend.length">
        <Quote :quote="$config.friendOpts.qoute" />
        <ul class="content">
          <li v-for="item in friend" :key="item.name">
            <a :href="item.link" rel="noopener noreferrer" target="_blank">
              <img class="cover" alt :src="item.cover" />
              <div class="info">
                <img :src="item.avatar" alt /> <span>{{ item.name }}</span>
              </div>
            </a>
          </li>
          <li v-for="i in 4" :key="i" class="empty"></li>
        </ul>
      </div>
      <Loading v-else />
    </Transition>

    <div v-if="$config.friendOpts.enableGitalk" id="gitalk" />
  </div>
</template>

<script>
import Gitalk from 'gitalk'
import Loading from '@/components/Loading'
import Quote from '@/components/Quote'

export default {
  name: 'Friend',
  components: {
    Loading,
    Quote
  },
  data() {
    return {
      friend: []
    }
  },
  async created() {
    await this.queryFriends()
    this.renderGitalk()
  },
  methods: {
    // 获取友链
    async queryFriends() {
      this.friend = await this.$store.dispatch('queryPage', { type: 'friend' })
    },
    // 加载 Gitalk
    renderGitalk() {
      if (this.$config.friendOpts.enableGitalk) {
        this.$nextTick(() => {
          const gitalk = new Gitalk({
            ...this.$config.gitalk,
            title: '友链'
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
