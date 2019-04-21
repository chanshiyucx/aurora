<template>
  <img :src="imgSrc" :alt="alt" loading="lazy" />
</template>

<script>
export default {
  name: 'Lazyload',
  props: ['src', 'alt', 'temp'],
  data() {
    return {
      imgSrc: require('../../assets/img/cover.jpg')
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
