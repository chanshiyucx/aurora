<template>
  <div class="segment card">
    <span class="label" :style="{ background: color, borderTopColor: color }"> {{ title }} </span>
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
  border-top-width: 2px;
  border-top-style: solid;
  overflow: unset;
  transition: all 0.25s ease 0s, transform 0.6s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.24);
  }
  .label {
    position: relative;
    left: -0.304rem;
    padding: 0.06rem 0.144rem 0.01rem 0.304rem;
    line-height: 0.4rem;
    color: #fff;
    border-radius: 0 3px 3px 0;
    i {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      width: 0;
      height: 0;
      background-color: transparent;
      border-style: solid;
      border-width: 0 0.144rem 0.144rem 0;
      border-color: transparent;
      border-right-color: currentColor;
      filter: brightness(120%);
    }
  }
}
</style>
