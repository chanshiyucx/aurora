<template>
  <img :src="imgSrc" alt />
</template>

<script>
export default {
  name: 'Lazyload',
  props: ['src'],
  data() {
    return {
      imgSrc: this.$config.defaultCover
    }
  },
  created() {
    const img = new Image()
    img.onload = () => {
      this.imgSrc = this.src
    }
    img.src = this.src
  }
}
</script>
