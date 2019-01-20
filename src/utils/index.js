/**
 * @description 生成范围内随机整数
 */
export const random = (a, b) => parseInt(Math.random() * (b - a + 1) + a, 10)

/**
 * @description 延时函数
 */
export const delay = time => new Promise(resolve => setTimeout(resolve, time))

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 函数节流
 */
export const throttle = (func, delay, tail = false) => {
  let lastCall = new Date()
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    const now = new Date()
    // 实现尾调用
    if (tail) {
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return func.apply(this, args)
  }
}

/**
 * @description 函数防抖
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
    // 是否立即执行一次任务
    if (immediate) {
      immediate = false
      func.apply(this, args)
    }
  }
}
