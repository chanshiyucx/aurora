<template>
  <div class="segment card" :style="{ color }">
    <div class="label" :style="{ color }">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Segment',
  props: ['color', 'title']
}
</script>

<style lang="less" scoped>
.segment {
  margin-top: 0.16rem;
  padding: 0.14rem 0.16rem;
  text-align: justify;
  line-height: 1.6;
  overflow: unset;
  border-top: 2px solid currentColor;
  background-color: rgba(255, 255, 255, 0.4);
  transition: all 0.25s ease 0s, transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.24);
  }
  /deep/p {
    margin-bottom: 0.16rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  /deep/a {
    position: relative;
    color: #b854d4;
    i {
      color: #b854d4;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1.5px;
      background-color: #b854d4;
      transform: scaleX(0);
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    &:hover {
      &::after {
        transform-origin: bottom left;
        transform: scaleX(1);
      }
    }
  }
  .label {
    display: inline-block;
    position: relative;
    left: -0.32rem;
    margin-bottom: 0.1rem;
    padding: 0 0.14rem 0 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    border-radius: 0 3px 3px 0;
    background-color: currentColor;
    span {
      color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 0;
      height: 0;
      background-color: transparent;
      border-style: solid;
      border-width: 0 0.16rem 0.16rem 0;
      border-color: transparent;
      border-right-color: currentColor;
      filter: brightness(120%);
    }
  }
}
</style>
