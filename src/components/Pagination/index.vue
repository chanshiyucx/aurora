<template>
  <div class="pagination">
    <div class="previous">
      <Spinner v-if="loading"></Spinner>
      <div v-else class="btn cursor">
        <span :class="isDisabledPrev && 'disabled'" @click="handleClick('prev')">Prev</span>
        <span :class="isDisabledNext && 'disabled'" @click="handleClick('next')">Next</span>
      </div>
    </div>
    <div class="rect"></div>
  </div>
</template>

<script>
import Spinner from '../Spinner'

export default {
  name: 'Pagination',
  components: {
    Spinner
  },
  props: ['loading', 'isDisabledPrev', 'isDisabledNext'],
  methods: {
    handleClick(type) {
      this.$emit('handleClick', type)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  position: relative;
  margin: 0 0.16rem;
  width: 1.6rem;
  height: 0.4rem;
  z-index: 99;
  .previous {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.4rem;
    font-size: 0.16rem;
    line-height: 0.4rem;
    background-color: rgba(255, 2555, 255, 0.66);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.24);
    transition: all 0.25s ease-out;
    overflow: hidden;
    text-shadow: 0 1px 1px #b28fce;
    .btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      span {
        display: block;
        flex: 1;
        color: #b28fce;
        transition: background 0.25s ease-out;
        &:hover {
          background: #986db2;
        }
      }
      span.disabled {
        display: none;
      }
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: #b28fce;
      transform: scaleX(0);
      transform-origin: bottom left;
      transition: all 0.25s ease-out;
    }
  }
  .rect {
    position: absolute;
    top: 7px;
    left: -0.06rem;
    width: 1.72rem;
    height: 0.4rem;
    z-index: -2;
    border: 2px solid #fff;
    border-top-width: 0;
    background: transparent;
    transition: all 0.25s ease-out;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: #fff;
      transition: background 0.25s ease-out;
    }
    &::before {
      top: 0;
      right: 0;
      width: 0.06rem;
      height: 2px;
    }
    &::after {
      top: 0;
      left: 0;
      width: 0.06rem;
      height: 2px;
    }
  }

  &:hover {
    .previous {
      transform: translateY(2px);
      span {
        color: #eee;
      }
      &::before {
        transform: scaleX(1);
      }
    }
    .rect {
      border-color: #986db2;
      &::after,
      &::before {
        background-color: #986db2;
      }
    }
  }
}
</style>
