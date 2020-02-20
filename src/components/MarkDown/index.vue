<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import Zooming from 'zooming'
import hljs from '@/assets/lib/highlight'
import { fileCDN, handleImg } from '@/utils'

let IMGID = 0

const zooming = new Zooming({
  bgOpacity: 0.8,
  zIndex: 100
})

const renderer = new marked.Renderer()

renderer.heading = function(text, level, raw, slugger) {
  const icon = ['gift', 'pagelines', 'pilcrow'][level - 2]
  return `<h${level} id="h-${slugger.slug(raw)}"><i class="icon icon-${icon}"></i>${text}</h${level}>`
}

renderer.image = function(href, title, text) {
  href = fileCDN(href)

  IMGID++
  const id = `img-${IMGID}`
  const img = new Image()
  img.src = href
  img.onload = () => {
    const dom = document.getElementById(id)
    dom.src = href
    dom.style.opacity = 1
  }

  const { style, isFull } = handleImg(href)

  return `<span class="img-box ${isFull ? 'full' : ''}">
  <span class="bg" style="${style}">
    <span class="loading">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </span>
  </span>
  <img id="${id}" class="img-zoomable cursor" style="${style}"  loading="lazy" alt="${text}" />${
    text ? `<span class="title">◭ ${text}</span>` : ''
  }</span>`
}

// Table 包裹元素，使之可以横向滚动
renderer.table = function(header, body) {
  if (body) body = `<tbody>${body}</tbody>`
  return `<div class="table-wrapper">\n<table>\n<thead>\n${header}</thead>\n${body}</table>\n</div>\n`
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
      html: '',
      lg: ''
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
      if (!this.target) return
      this.$nextTick(() => {
        hljs.initLineNumbersOnLoad({ target: this.target })
        zooming.listen('.img-zoomable')
      })
    }
  },
  beforeDestroy() {
    zooming.close()
  }
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
