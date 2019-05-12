<template>
  <div class="wrapper">
    <img :src="imgSrc" :alt="alt" loading="lazy" />
    <div class="mask" :style="{ backgroundImage: `url(${imgSrc})` }"></div>
  </div>
</template>

<script>
export default {
  name: 'MagicImg',
  props: ['src', 'alt', 'temp'],
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
<style lang="less" scoped>
.wrapper {
  position: relative;
  transition: transform 0.6s ease-out;
  img {
    width: 100%;
  }
  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.5rem;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    filter: blur(3px);
    transform: scale(1.06, 1.1);
    transition: height 0.6s ease-out;
    overflow: hidden;
  }
}
</style>
