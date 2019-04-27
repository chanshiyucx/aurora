<template>
  <ul class="qrcode">
    <li v-for="item in $config.qrcode" :key="item.name">
      <h3>{{ item.name }}</h3>
      <img :src="item.img" :alt="item.name" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Qrcode'
}
</script>
<style lang="less" scoped>
.qrcode {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.06rem 0.12rem;
  h3 {
    margin-bottom: 0.08rem;
    font-size: 0.18rem;
    line-height: 0.36rem;
    font-weight: normal;
  }
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 3px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
}
</style>
