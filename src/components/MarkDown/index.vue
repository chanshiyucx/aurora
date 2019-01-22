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
    }
  }
}
</script>
