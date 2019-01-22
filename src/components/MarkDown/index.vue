<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'
import hljs from '@/assets/lib/highlight'

const renderer = new marked.Renderer()
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
      // 并不是每个 marked 都需要高亮处理
      if (!this.target) return
      this.$nextTick(() => {
        hljs.initLineNumbersOnLoad({
          target: this.target
        })
      })
    }
  }
}
</script>
