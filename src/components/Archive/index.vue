<template>
  <div class="archive">
    <ul class="content">
      <li
        v-for="(post, i) in posts"
        :key="post.id"
        @click="gotoPost(post.number)"
        :style="{ borderTopColor: colors[i] }"
      >
        <h3>{{ post.title }}</h3>
        <div class="post-meta">
          <span> <i class="icon icon-calendar"></i> {{ post.created_at }} </span>
          <span> <i class="icon icon-fire"></i> 热度{{ post.times || 1 }}℃ </span>
          <span>
            <i class="icon icon-bookmark-empty"></i> {{ post.milestone ? post.milestone.title : '未分类' }}
          </span>
          <span>
            <i class="icon icon-tag"></i>
            <span v-for="label in post.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
          </span>
        </div>
      </li>
      <li v-for="i in 2" :key="i" class="empty"></li>
    </ul>
    <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
      <Pagination
        :loading="loading"
        :isDisabledPrev="isDisabledPrev"
        :isDisabledNext="isDisabledNext"
        @handleClick="handleClick"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { shuffle } from '@/utils'

export default {
  name: 'Archive',
  components: {
    Pagination
  },
  props: ['posts', 'loading', 'isDisabledPrev', 'isDisabledNext'],
  data() {
    return {
      colors: shuffle(this.$config.themeColors)
    }
  },
  methods: {
    handleClick(type) {
      this.$emit('handleClick', type)
    },
    // 跳转文章页
    gotoPost(number) {
      this.$router.push({ name: 'post', params: { number } })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
