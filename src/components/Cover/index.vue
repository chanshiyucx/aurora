<template>
  <div class="wrapper">
    <img :src="defaultCover" alt="defaultCover" />
    <img class="cover fadeIn" v-show="imgSrc" :src="imgSrc" :alt="alt" />
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
    }
  },
  data() {
    return {
      defaultCover: this.$config.defaultCover,
      imgSrc: ''
    }
  },
  watch: {
    loadCover: {
      immediate: true,
      handler(val) {
        if (val) {
          this.loadImg()
        }
      }
    }
  },
  methods: {
    loadImg() {
      const img = new Image()
      img.onload = () => {
        this.imgSrc = this.src
        this.$emit('loadNext')
      }
      img.src = this.src
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  transition: all 0.6s ease;

  img {
    width: 100%;
  }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
  }

  .fadeIn {
    animation: coverDown 0.5s ease-out;
  }
}
</style>
