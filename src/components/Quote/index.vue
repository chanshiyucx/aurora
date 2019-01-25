<template>
  <div class="quote">
    <i class="icon icon-quote-left"></i> <span>{{ quote }}</span>
    <i class="icon icon-quote-right"></i>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  props: ['quote']
}
</script>

<style lang="less" scoped>
.quote {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 0.26rem;
  padding: 0.32rem 0;
  font-size: 0.16rem;
  span {
    letter-spacing: 1px;
  }
  i {
    position: absolute;
    font-size: 0.24rem;
  }
  i:first-child {
    top: 0.16rem;
    left: 0.16rem;
  }
  i:last-child {
    bottom: 0;
    right: 0.16rem;
  }
}
</style>
