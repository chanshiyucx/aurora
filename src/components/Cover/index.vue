<template>
  <div class="wrapper">
    <img :src="defaultCover" alt="defaultCover" />
    <div class="cover">
      <Transition name="cover-transform" mode="out-in">
        <img v-if="imgSrc" :key="imgSrc" :src="imgSrc" :alt="alt" />
      </Transition>
    </div>
    <div class="mask" :style="{ height: maskHeight }">
      <img :src="defaultCover" alt="defaultCover" />
      <Transition name="cover-transform" mode="out-in">
        <img v-if="imgSrc" :key="imgSrc" :src="imgSrc" :alt="alt" />
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
    this.loadImg()
  },
  methods: {
    loadImg() {
      const img = new Image()
      img.onload = () => {
        this.imgSrc = this.src
      }
      img.src = this.src
    }
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
  .cover {
    position: absolute;
    top: 0;
    left: 0;
  }
  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    filter: blur(3px);
    img {
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
