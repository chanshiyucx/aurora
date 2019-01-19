<template>
  <div class="markdown" v-html="html"></div>
</template>

<script>
import marked from 'marked'

const renderer = new marked.Renderer()

export default {
  name: 'MarkDown',
  props: ['content'],
  data() {
    return {
      html: ''
    }
  },
  created() {
    this.html = marked(this.content, { renderer })
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
