<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import baguetteBox from 'baguettebox.js'
import hljs from '@/assets/lib/highlight'

const renderer = new marked.Renderer()

renderer.heading = function(text, level, raw, slugger) {
  const icon = ['gift', 'pagelines', 'pilcrow'][level - 2]
  return `<h${level} id="h-${slugger.slug(
    raw
  )}"><i class="icon icon-${icon}"></i>${text}</h${level}>`
}

renderer.image = function(href, title, text) {
  let clazz = `img-box ${href.endsWith('#full') ? 'full-box' : ''}`
  return `<span class="${clazz}"><a href="${href}" data-caption="${text}">
    <img src="${href}" alt="${text}" /></a>${text ? `<span>◭ ${text}</span>` : ''}</span>`
}

renderer.link = function(href, title, text) {
  // 只显示一个图标
  if (text.includes('icon')) {
    return `<a href="${href}" target="_blank">${text}</a>`
  }
  return `<a href="${href}" target="_blank"><i class="icon icon-link"></i>${text}</a>`
}

marked.setOptions({
  renderer,
  highlight: code => hljs.highlightAuto(code).value
})

export default {
  name: 'MarkDown',
  props: {
    content: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    onlyRender: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      html: ''
    }
  },
  created() {
    this.marked()
  },
  watch: {
    content() {
      this.marked()
    }
  },
  methods: {
    marked() {
      this.html = marked(this.content)

      // 对于只是纯解析文字不需要代码高亮和灯箱
      if (this.onlyRender) return
      this.$nextTick(() => {
        baguetteBox.run('.markdown')

        // 并不是每个 marked 都需要高亮处理
        if (this.target) {
          hljs.initLineNumbersOnLoad({
            target: this.target
          })
        }
      })
    }
  }
}
</script>
