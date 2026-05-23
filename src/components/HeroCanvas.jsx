import { useEffect, useRef } from 'react'

const GOLD = 'rgba(201,168,76,'
const MAX_DIST = 130
const MAX_SPEED = 0.5

export default function HeroCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W, H, nodes, raf

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const makeNode = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * MAX_SPEED,
      vy: (Math.random() - 0.5) * MAX_SPEED,
      alpha: Math.random() * 0.45 + 0.15,
    })

    const init = () => {
      const count = Math.max(40, Math.min(80, Math.floor(W * H / 12000)))
      nodes = Array.from({ length: count }, makeNode)
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const mx = mouse.current.x
      const my = mouse.current.y

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Mouse repulsion
        const dxm = n.x - mx
        const dym = n.y - my
        const dm = Math.sqrt(dxm * dxm + dym * dym)
        if (dm < 100) {
          const f = ((100 - dm) / 100) * 0.4
          n.vx += (dxm / dm) * f
          n.vy += (dym / dm) * f
        }

        // Damping
        n.vx *= 0.985
        n.vy *= 0.985

        // Clamp speed
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy)
        if (spd > MAX_SPEED) {
          n.vx = (n.vx / spd) * MAX_SPEED
          n.vy = (n.vy / spd) * MAX_SPEED
        }

        n.x += n.vx
        n.y += n.vy

        // Wrap edges softly
        if (n.x < -10) n.x = W + 10
        if (n.x > W + 10) n.x = -10
        if (n.y < -10) n.y = H + 10
        if (n.y > H + 10) n.y = -10

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x
          const dy = n.y - m.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `${GOLD}${lineAlpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `${GOLD}${n.alpha})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onResize = () => { resize(); init() }

    resize()
    init()
    draw()

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
