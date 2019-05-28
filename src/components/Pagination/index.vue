<template>
  <div :class="['pagination', hide && 'hide']">
    <div class="previous">
      <Spinner v-if="loading"></Spinner>
      <div v-else class="btn cursor">
        <span :class="isDisabledPrev && 'disabled'" @click="handlePage('prev')">Prev</span>
        <span :class="isDisabledNext && 'disabled'" @click="handlePage('next')">Next</span>
      </div>
    </div>
    <div class="rect"></div>
  </div>
</template>

<script>
import Spinner from '../Spinner'

export default {
  name: 'Pagination',
  components: {
    Spinner
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    isDisabledPrev: {
      type: Boolean,
      default: false
    },
    isDisabledNext: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hide() {
      return this.isDisabledPrev && this.isDisabledNext
    }
  },
  methods: {
    handlePage(type) {
      if (type === 'prev' && this.isDisabledPrev) return
      if (type === 'next' && this.isDisabledNext) return
      this.$emit('handlePage', type)
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
