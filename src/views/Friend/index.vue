<template>
  <div id="friends">
    <Transition name="fade-transform" mode="out-in">
      <div v-if="friends.length">
        <Quote :quote="$config.friendsOpts.quote" />
        <!-- <ul>

        </ul> -->
      </div>
      <Loading v-else />
    </Transition>
  </div>
</template>

<script>
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
      friends: []
    }
  },
  created() {
    this.queryFriends()
  },
  methods: {
    async queryFriends() {
      this.friends = await this.$store.dispatch('queryPage', { type: 'friends' })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
