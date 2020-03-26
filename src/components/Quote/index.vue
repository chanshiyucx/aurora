<template>
  <div class="quote">
    <i class="icon icon-quote-left"></i>
    <span>{{ quote }}</span>
    <i class="icon icon-quote-right"></i>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  props: {
    quote: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
