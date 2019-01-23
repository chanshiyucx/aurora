<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import baguetteBox from 'baguettebox.js'
import hljs from '@/assets/lib/highlight'

const renderer = new marked.Renderer()

renderer.image = function(href, title, text) {
  let clazz = `img-box ${href.endsWith('#full') ? 'full-box' : ''}`
  return `<span class="${clazz}"><a href="${href}" data-caption="${text}">
    <img src="${href}" alt="${text}" /></a>${text ? `<span>◭ ${text}</span>` : ''}</span>`
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
