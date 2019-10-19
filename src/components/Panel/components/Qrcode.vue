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
    }
  }
}
</script>

<style lang="less" scoped>
.qrcode {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.1rem;

  h3 {
    margin-bottom: 0.1rem;
    font-size: 0.18rem;
    font-weight: normal;
    line-height: 0.32rem;
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 3px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
}
</style>
