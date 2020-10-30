<template>
  <div class="archive">
    <ul class="content">
      <li class="cursor" v-for="(post, i) in posts" :key="post.id" :style="{ borderTopColor: colors[i] }">
        <router-link :to="{ name: 'post', params: { number: post.number, post } }">
          <h3>{{ post.title }}</h3>
          <div class="post-meta">
            <span>
              <i class="icon icon-calendar"></i>
              {{ post.created_at }}
            </span>
            <span>
              <i class="icon icon-fire"></i>
              热度{{ times[post.id] || 1 }}℃
            </span>
            <span>
              <i class="icon icon-bookmark-empty"></i>
              {{ post.milestone ? post.milestone.title : '未分类' }}
            </span>
            <span>
              <i class="icon icon-tag"></i>
              <span v-for="label in post.labels.slice(0, 2)" :key="label.id">{{ label.name }}</span>
            </span>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="btn-group" v-if="!isDisabledPrev || !isDisabledNext">
      <Pagination
        :loading="loading"
        :isDisabledPrev="isDisabledPrev"
        :isDisabledNext="isDisabledNext"
        @handlePage="handlePage"
      />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { shuffle } from '@/utils'

export default {
  name: 'ArchiveCard',
  components: {
    Pagination,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
    times: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isDisabledPrev: {
      type: Boolean,
      default: false,
    },
    isDisabledNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      colors: shuffle(this.$config.themeColors),
    }
  },
  methods: {
    // 翻页
    handlePage(type) {
      this.$emit('handlePage', type)
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
