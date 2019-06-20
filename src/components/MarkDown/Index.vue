<template>
  <div class="markdown" v-html="html"></div>
</template>
<script lang="ts">
import marked from "marked";
import { Component, Prop, Vue } from "vue-property-decorator";
import hljs from "@/assets/lib/highlight";

const renderer = new marked.Renderer();
renderer.heading = function(
  text: string,
  level: number,
  raw: any,
  slugger: any
) {
  const icon = ["gift", "pagelines", "pilcrow"][level - 2];
  return `<h${level} id="h-${slugger.slug(
    raw
  )}"><i class="icon icon-${icon}"></i>${text}</h${level}>`;
};
renderer.image = function(href: string, title: string, text: string) {
  return `<span class="img-box" data-src="${href}" data-sub-html="<h4>${text}</h4>"><img src="${href}" loading="lazy" alt="${text}" />${
    text ? `<span>◭ ${text}</span>` : ""
  }</span>`;
};
renderer.link = function(href: string, title: string, text: string) {
  // 只显示一个图标
  if (text.includes("icon")) {
    return `<a href="${href}" target="_blank">${text}</a>`;
  }
  return `<a href="${href}" target="_blank"><i class="icon icon-link"></i>${text}</a>`;
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
    this.html = marked(this.content); // 对于只是纯解析文字不需要代码高亮和灯箱
    if (this.onlyRender) return;
    else {
      this.$nextTick(() => {
        // 对于只是纯解析文字不需要代码高亮和灯箱
        if (this.target) {
          this.$nextTick(() => {
            // 代码行数
            hljs
              .initLineNumbersOnLoad({ target: this.target })(
                // 灯箱
                window as any
              )
              .lightGallery(document.querySelector(this.target), {
                selector: ".img-box",
                thumbMargin: 6,
                download: false,
                subHtmlSelectorRelative: true
              });
          });
        }
      });
    }
  }

  created() {
    this.doMarked();
  }
}
</script>

<style scoped lang="less"></style>
