<template>
  <div id="friend">
    <Transition name="fade-transform" mode="out-in">
      <div class="card" v-if="friend.length">
        <Quote :quote="$config.friendOpts.qoute" />
        <ul class="content">
          <li v-for="(item, index) in friend" :key="item.name">
            <div>
              <a :href="item.link" rel="noopener noreferrer" target="_blank">
                <Cover
                  class="cover"
                  :src="item.cover"
                  :alt="item.name"
                  :loadCover="index < LOAD_INX"
                  @loadNext="loadNext"
                />
                <div class="info">
                  <img :src="item.avatar" alt /> <span>{{ item.name }}</span>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <Loading v-else />
    </Transition>

    <Comment v-if="$config.friendOpts.enableComment && initComment" title="友链" />
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import Cover from '@/components/Cover'
import Quote from '@/components/Quote'
import Comment from '@/components/Comment'

export default {
  name: 'friend',
  components: {
    Loading,
    Cover,
    Quote,
    Comment
  },
  data() {
    return {
      friend: [],
      initComment: false,
      LOAD_INX: 4
    }
  },
  async created() {
    await this.queryFriends()
    this.initComment = true
  },
  methods: {
    async queryFriends() {
      this.friend = await this.$store.dispatch('queryPage', { type: 'friend' })
    },
    loadNext() {
      this.LOAD_INX += 1
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
