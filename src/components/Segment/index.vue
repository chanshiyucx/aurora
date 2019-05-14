<template>
  <div class="segment card" :style="{ color }">
    <div class="label" :style="{ color }">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Segment',
  props: {
    color: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
