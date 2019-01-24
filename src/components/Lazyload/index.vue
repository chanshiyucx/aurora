<template>
  <img class="loading" :src="imgSrc" alt />
</template>

<script>
export default {
  name: 'Lazyload',
  props: ['src', 'width', 'height'],
  data() {
    return {
      imgSrc: this.$config.loadingImg
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.loading {
  width: 1rem !important;
  // height: 1rem;
}
</style>
