<template>
  <ul class="qrcode">
    <li v-for="item in $config.qrcode" :key="item.name">
      <h3>{{ item.name }}</h3>
      <img class="cursor" :src="item.img" :alt="item.name" @click="zoom(item.img)" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Qrcode',
  methods: {
    zoom(src) {
      this.$emit('zoom', src)
    },
  },
}
</script>

<style lang="scss" scoped>
.qrcode {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  h3 {
    margin-bottom: 10px;
    font-size: $font-size-larger;
    font-weight: $font-weight-normal;
    line-height: 2;
  }

  img {
    width: 150px;
    height: 150px;
    border-radius: 3px;
  }
}
</style>
