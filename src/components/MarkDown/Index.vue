<template>
  <div class="markdown" v-html="html" v-highlight></div>
</template>
<script lang="ts">
import marked from "marked";
import { Component, Prop, Vue } from "vue-property-decorator";
import hljs from "@/assets/lib/highlight";

const renderer = new marked.Renderer();
renderer.heading = function(text: string, level: number) {
  return `<a class="hidden-anchor" ref="hiddenAnchor"></a><h${level +
    1} class="hljs-title">${text}</h${level + 1}>`;
};
renderer.image = function(href: string, title: string, text: string) {
  return `<span class="img-box" data-src="${href}" data-sub-html="<h4>${text}</h4>"><img src="${href}" loading="lazy" alt="${text}" />${
    text ? `<span>${text}</span>` : ""
  }</span>`;
};
renderer.link = function(href: string, title: string, text: string) {
  return `<a href=${href} target="_blank">${text}</a>`;
};
marked.setOptions({
  renderer,
  highlight: (code: any) => hljs.highlightAuto(code).value
});

@Component
export default class MarkDown extends Vue {
  @Prop({ type: String, default: "" })
  content!: string;
  @Prop({ type: String, default: "" })
  target!: string;
  @Prop({ type: Boolean, default: false })
  onlyRender!: boolean;
  @Prop({ type: Boolean, default: true })
  desc!: boolean;

  html: any = "";

  doMarked() {
    if (this.onlyRender && this.content.split("summary_start")[1]) {
      // 显示简介
      this.html = marked(
        this.content.split("summary_start")[1].split("summary_end")[0]
      );
    } else {
      this.html = marked(this.content.split("summary_end")[1]); // 显示正文
      this.$nextTick(() => {
        hljs.initLineNumbersOnLoad({
          target: "#post"
        });
        document
          .querySelectorAll(".hidden-anchor")
          .forEach((a: any, index: number) => {
            a.id = `h-${index}`;
          });
      });
    }
  }

  created() {
    this.doMarked();
  }
}
</script>

<style lang="less">
.markdown {
  table > tr > .hljs-ln-numbers {
    width: 24px;
  }
  blockquote {
    margin-inline-start: 12px;
    border-left: 4px solid #bcbcbc;
    background: #eeeeee;
    padding: 6px 12px;
  }
}
</style>
