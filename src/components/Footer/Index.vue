<template>
  <div class="footer">
    <span style="font-size: 16px"
      >Copyright © 2019 MiyueSC. All rights reserved.</span
    >
    <br />
    <span style="font-size: 14px">Brought to you withby MiyueSC！</span>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BlogFooter extends Vue {}
</script>

<style scoped lang="less">
.footer {
  border-top: 1px solid rgba(183, 183, 183, 0.6);
  color: darkgrey;
  width: 1200px;
  height: 48px;
  line-height: 24px;
  padding: 6px;
  margin: auto;
  margin-top: 24px;
  font-family: "Ubuntu", sans-serif;
}
</style>
