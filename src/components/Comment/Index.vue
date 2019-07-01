<template>
  <div id="comment" class="comment"></div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from "vue-property-decorator";
//@ts-ignore
import Gitalk from "../../../node_modules/gitalk";
import config from "@/config/index";

@Component
export default class Comment extends Vue {
  @Prop({ type: Number, default: "" })
  id!: any;
  @Prop({ type: String, default: "" })
  title!: any;

  mounted() {
    let gitalk: any = new Gitalk({
      ...config.gitalk,
      // id: location.pathname // 用于标记评论是哪个页面的，确保唯一，并且长度小于50
      id: this.id + this.title,
      title: this.title
    });
    gitalk.render("comment");
  }
}
</script>

<style scoped lang="less">
.comment {
  width: 800px;
  margin: auto;
  margin-top: 120px;
  height: auto;
  text-align: left !important;
}
</style>
