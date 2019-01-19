;(function() {
  function SetRem() {
    const html = document.documentElement
    const hWidth = html.getBoundingClientRect().width
    const fz = hWidth / 7.5
    html.style.fontSize = fz <= 100 ? fz + 'px' : '100px'
  }
  SetRem()
  window.addEventListener('resize', SetRem)
})()
