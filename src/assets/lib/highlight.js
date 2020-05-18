import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import less from 'highlight.js/lib/languages/less'
import css from 'highlight.js/lib/languages/css'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
import objectivec from 'highlight.js/lib/languages/objectivec'
import markdown from 'highlight.js/lib/languages/markdown'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import http from 'highlight.js/lib/languages/http'

import linenumber from './linenumber'

// 注册代码行数
linenumber(hljs)

// 按需导入高亮语种
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('less', less)
hljs.registerLanguage('css', css)
hljs.registerLanguage('java', java)
hljs.registerLanguage('python', python)
hljs.registerLanguage('objectivec', objectivec)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('http', http)

hljs.initHighlightingOnLoad()

export default hljs
