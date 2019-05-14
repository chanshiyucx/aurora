<template>
  <div class="wrapper">
    <img :src="defaultCover" alt="defaultCover" />
    <div v-if="!disabledAnimate" class="cover">
      <Transition name="cover-transform" mode="out-in">
        <img v-if="imgSrc" :key="imgSrc" :src="imgSrc" :alt="alt" />
      </Transition>
    </div>
    <div class="mask" :style="{ height: maskHeight }">
      <img :src="defaultCover" alt="defaultCover" />
      <Transition v-if="!disabledAnimate" name="cover-transform" mode="out-in">
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
    },
    loadCover: {
      type: Boolean,
      default: false
    },
    isLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const disabledAnimate = this.isLoad
    return {
      defaultCover: disabledAnimate ? this.src : this.$config.defaultCover,
      disabledAnimate,
      imgSrc: ''
    }
  },
  watch: {
    loadCover: {
      immediate: true,
      handler(val) {
        if (val && !this.disabledAnimate) this.loadImg()
      }
    }
  },
  methods: {
    loadImg() {
      const img = new Image()
      img.onload = () => {
        this.imgSrc = this.src
        this.$emit('loadNextCover')
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
