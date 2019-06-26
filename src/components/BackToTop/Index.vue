<template>
  <div
    class="back-to-top"
    @click="turnToTop()"
    :style="{ top: visible ? '-10px' : '-90vh' }"
  >
    <img src="../../assets/icons/backtop.png" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

@Component
export default class BackToTop extends Vue {
  visible: Boolean = false;

  created() {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    if (top) {
      this.visible = true;
    }
    window.addEventListener("scroll", () => {
      const tops =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.visible = tops > 100;
    });
  }
  turnToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
</script>

<style scoped lang="less">
.back-to-top {
  position: fixed;
  right: 36px;
  transition: 600ms all cubic-bezier(0.25, 0.1, 0.3, 1.5);
  outline: none;
  img {
    max-height: 86vh;
    transform-origin: top;
    -webkit-animation: grow 3.6s infinite ease-in-out;
    animation: grow 3.6s infinite ease-in-out;
  }
}

@keyframes grow {
  33% {
    -webkit-transform: rotate(1.2deg);
    transform: rotate(1.2deg);
  }
  66% {
    -webkit-transform: rotate(1deg);
    transform: rotate(1deg);
  }
}
</style>
