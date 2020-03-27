<template>
  <div class="wrapper">
    <img :src="defaultCover" alt="defaultCover" />
    <img :class="['cover', visible && 'fadeIn']" :src="imgSrc" />
  </div>
</template>

<script>
import { fileCDN } from '@/utils'

export default {
  name: 'Cover',
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    loadCover: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultCover: this.$config.defaultCover,
      imgSrc: '',
      visible: false,
    }
  },
  watch: {
    loadCover: {
      immediate: true,
      handler(val) {
        if (val) {
          this.loadImg()
        }
      },
    },
  },
  methods: {
    loadImg() {
      const cdnUrl = fileCDN(this.src)

      const img = new Image()
      img.onload = img.onerror = () => {
        this.imgSrc = cdnUrl
        this.$emit('loadNext')
        this.$nextTick(() => (this.visible = true))
      }
      img.src = cdnUrl
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .fadeIn {
    animation: coverIn 0.8s ease-out forwards;
  }
}
</style>
