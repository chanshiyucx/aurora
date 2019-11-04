<template>
  <div class="wrapper">
    <img :src="defaultCover" alt="defaultCover" />
    <img class="cover fadeIn" v-show="loadCover" :src="src" :alt="alt" @load="loadNext" />
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
    loadCover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      defaultCover: this.$config.defaultCover
    }
  },
  methods: {
    loadNext() {
      this.$emit('loadNext')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  .cover {
    position: absolute;
    top: 0;
    left: 0;
  }

  .fadeIn {
    animation: coverDown 0.4s ease-out;
  }
}
</style>
