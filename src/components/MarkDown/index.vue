<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import Viewer from 'viewerjs'
import hljs from '@/assets/lib/highlight'

const renderer = new marked.Renderer()

renderer.heading = function(text, level, raw, slugger) {
  const icon = ['gift', 'pagelines', 'pilcrow'][level - 2]
  return `<h${level} id="h-${slugger.slug(
    raw
  )}"><i class="icon icon-${icon}"></i>${text}</h${level}>`
}

renderer.image = function(href, title, text) {
  return `<span class="img-box"><img src="${href}" alt="${text}" />${
    text ? `<span>◭ ${text}</span>` : ''
  }</span>`
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
      html: '',
      gallery: ''
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
        // 并不是每个 marked 都需要高亮处理
        if (this.target) {
          // 代码行数
          hljs.initLineNumbersOnLoad({
            target: this.target
          })

          // 灯箱
          const box = document.getElementById('post')
          box.addEventListener('hidden', function() {
            // 清空 title
            const element = document.querySelector('.viewer-title')
            element.innerHTML = ''
          })
          this.gallery = new Viewer(box)
        }
      })
    }
  },
  beforeDestroy() {
    this.gallery && this.gallery.destroy()
  }
}
</script>
