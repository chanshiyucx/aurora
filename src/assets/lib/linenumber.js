export default function linenumber(hljs) {
  const w = window
  const d = document
  const TABLE_NAME = 'hljs-ln',
    LINE_NAME = 'hljs-ln-line',
    CODE_BLOCK_NAME = 'hljs-ln-code',
    NUMBERS_BLOCK_NAME = 'hljs-ln-numbers',
    NUMBER_LINE_NAME = 'hljs-ln-n',
    DATA_ATTR_NAME = 'data-line-number',
    BREAK_LINE_REGEXP = /\r\n|\r|\n/g

  w.hljs = hljs
  w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad
  w.hljs.lineNumbersBlock = lineNumbersBlock
  w.hljs.lineNumbersValue = lineNumbersValue

  addStyles()

  function addStyles() {
    const css = d.createElement('style')
    css.type = 'text/css'
    css.innerHTML = format('.{0}{border-collapse:collapse}' + '.{1}:before{content:attr({2})}', [
      TABLE_NAME,
      NUMBER_LINE_NAME,
      DATA_ATTR_NAME,
    ])
    d.getElementsByTagName('head')[0].appendChild(css)
  }

  function initLineNumbersOnLoad(options) {
    try {
      const targetElement = d.querySelector(options.target)
      const blocks = targetElement.querySelectorAll('code[class*="language-"]')
      for (let i in blocks) {
        if (Object.prototype.hasOwnProperty.call(blocks, i)) {
          lineNumbersBlock(blocks[i], options)
        }
      }
    } catch (e) {
      w.console.error('LineNumbers error: ', e)
    }
  }

  function lineNumbersBlock(element, options) {
    if (typeof element !== 'object') return
    async(function () {
      element.innerHTML = lineNumbersInternal(element, options)
    })
  }

  function lineNumbersValue(value, options) {
    if (typeof value !== 'string') return

    const element = document.createElement('code')
    element.innerHTML = value

    return lineNumbersInternal(element, options)
  }

  function lineNumbersInternal(element, options) {
    // define options or set default
    options = options || {
      singleLine: false,
    }

    // convert options
    const firstLineIndex = options.singleLine ? 0 : 1

    duplicateMultilineNodes(element)

    return addLineNumbersBlockFor(element.innerHTML, firstLineIndex)
  }

  function addLineNumbersBlockFor(inputHtml, firstLineIndex) {
    const lines = getLines(inputHtml)

    // if last line contains only carriage return remove it
    if (lines[lines.length - 1].trim() === '') {
      lines.pop()
    }

    if (lines.length > firstLineIndex) {
      let html = ''

      for (let i = 0, l = lines.length; i < l; i++) {
        html += format(
          '<tr>' +
            '<td class="{0}">' +
            '<div class="{1} {2}" {3}="{5}"></div>' +
            '</td>' +
            '<td class="{4}">' +
            '<div class="{1}">{6}</div>' +
            '</td>' +
            '</tr>',
          [
            NUMBERS_BLOCK_NAME,
            LINE_NAME,
            NUMBER_LINE_NAME,
            DATA_ATTR_NAME,
            CODE_BLOCK_NAME,
            i + 1,
            lines[i].length > 0 ? lines[i] : ' ',
          ]
        )
      }

      return format('<table class="{0}">{1}</table>', [TABLE_NAME, html])
    }

    return inputHtml
  }

  /**
   * Recursive method for fix multi-line elements implementation in highlight.js
   * Doing deep passage on child nodes.
   * @param {HTMLElement} element
   */
  function duplicateMultilineNodes(element) {
    const nodes = element.childNodes
    for (let node in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, node)) {
        const child = nodes[node]
        if (getLinesCount(child.textContent) > 0) {
          if (child.childNodes.length > 0) {
            duplicateMultilineNodes(child)
          } else {
            duplicateMultilineNode(child.parentNode)
          }
        }
      }
    }
  }

  /**
   * Method for fix multi-line elements implementation in highlight.js
   * @param {HTMLElement} element
   */
  function duplicateMultilineNode(element) {
    const className = element.className

    if (!/hljs-/.test(className)) return

    const lines = getLines(element.innerHTML)

    let result = ''
    for (let i = 0; i < lines.length; i++) {
      const lineText = lines[i].length > 0 ? lines[i] : ' '
      result += format('<span class="{0}">{1}</span>\n', [className, lineText])
    }

    element.innerHTML = result.trim()
  }

  function getLines(text) {
    if (text.length === 0) return []
    return text.split(BREAK_LINE_REGEXP)
  }

  function getLinesCount(text) {
    return (text.trim().match(BREAK_LINE_REGEXP) || []).length
  }

  function async(func) {
    w.setTimeout(func, 0)
  }

  /**
   * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
   * @param {string} format
   * @param {array} args
   */
  function format(format, args) {
    return format.replace(/\{(\d+)\}/g, function (m, n) {
      return args[n] ? args[n] : m
    })
  }
}
