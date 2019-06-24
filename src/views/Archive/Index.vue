<template>
  <div class="archive">
    <div class="main">
      <div class="cover">
        <span>BLOG ARCHIVE</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";

@Component
export default class Index extends Vue {}
</script>

<style scoped lang="less">
@import "./archive.less";
</style>
