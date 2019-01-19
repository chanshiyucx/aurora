const anime = window.anime
const numberOfParticules = 30
const colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C']
const tap = 'ontouchstart' in window || navigator.msMaxTouchPoints ? 'touchstart' : 'mousedown'
let canvasEl, ctx, pointerX, pointerY

function updateCoords(e) {
  pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left
  pointerY = (e.clientY || e.touches[0].clientY) - canvasEl.getBoundingClientRect().top
}

function setParticuleDirection(p) {
  const angle = (anime.random(0, 360) * Math.PI) / 180
  const value = anime.random(50, 180)
  const radius = [-1, 1][anime.random(0, 1)] * value
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule(x, y) {
  const p = {}
  p.x = x
  p.y = y
  p.color = colors[anime.random(0, colors.length - 1)]
  p.radius = anime.random(16, 32)
  p.endPos = setParticuleDirection(p)
  p.draw = function() {
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, !0)
    ctx.fillStyle = p.color
    ctx.fill()
  }
  return p
}

function createCircle(x, y) {
  const p = {}
  p.x = x
  p.y = y
  p.color = '#F00'
  p.radius = 0.1
  p.alpha = 0.5
  p.lineWidth = 6
  p.draw = function() {
    ctx.globalAlpha = p.alpha
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, !0)
    ctx.lineWidth = p.lineWidth
    ctx.strokeStyle = p.color
    ctx.stroke()
    ctx.globalAlpha = 1
  }
  return p
}

function renderParticule(e) {
  for (let t = 0; t < e.animatables.length; t++) e.animatables[t].target.draw()
}

function animateParticules(x, y) {
  const circle = createCircle(x, y)
  const particules = []
  for (let i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y))
  }
  anime
    .timeline()
    .add({
      targets: particules,
      x: function(e) {
        return e.endPos.x
      },
      y: function(e) {
        return e.endPos.y
      },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule
    })
    .add({
      targets: circle,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800)
      },
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    })
}

function debounce(fn, delay) {
  let timer
  return function() {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

function fireworks() {
  canvasEl = document.getElementById('fireworks')
  if (!canvasEl) return
  ctx = canvasEl.getContext('2d')
  pointerX = 0
  pointerY = 0

  const setCanvasSize = debounce(function() {
    canvasEl.width = 2 * window.innerWidth
    canvasEl.height = 2 * window.innerHeight
    canvasEl.style.width = window.innerWidth + 'px'
    canvasEl.style.height = window.innerHeight + 'px'
    canvasEl.getContext('2d').scale(2, 2)
  }, 500)

  const render = anime({
    duration: 1 / 0,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    }
  })

  document.addEventListener(
    tap,
    function(e) {
      if ('A' !== e.target.nodeName && 'IMG' !== e.target.nodeName) {
        render.play()
        updateCoords(e)
        animateParticules(pointerX, pointerY)
      }
    },
    !1
  )

  setCanvasSize()
  window.addEventListener('resize', setCanvasSize, !1)
}

export default fireworks
