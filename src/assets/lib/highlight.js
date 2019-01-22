import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import line from './line'

hljs.registerLanguage('javascript', javascript)

line(hljs)

hljs.initLineNumbersOnLoad({
  singleLine: true
})

export default hljs
