<template>
  <div class="wrapper">
    <Transition name="opacity-transform" mode="out-in">
      <img v-if="imgSrc" :key="imgSrc" :src="imgSrc" :alt="alt" />
      <img v-else key="defaultCover" :src="defaultCover" alt="defaultCover" />
    </Transition>
    <div
      class="mask"
      :style="{
        height: maskHeight
      }"
    >
      <Transition name="opacity-transform" mode="out-in">
        <img v-if="imgSrc" :key="imgSrc" :src="imgSrc" :alt="alt" />
        <img v-else key="defaultCover" :src="defaultCover" alt="defaultCover" />
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MagicImg',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    maskHeight: {
      type: String,
      default: '.5rem'
    }
  },
  data() {
    return {
      defaultCover: this.$config.defaultCover,
      imgSrc: ''
    }
  },
  created() {
    const img = new Image()
    img.onload = () => {
      setTimeout(() => {
        this.imgSrc = this.src
      }, 1000)
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
    filter: blur(3px);
    overflow: hidden;
    img {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
