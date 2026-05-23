import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    class Particle {
      constructor(randomY = false) {
        this.reset(randomY)
      }

      reset(startAnywhere = false) {
        this.x = Math.random() * canvas.width
        this.y = startAnywhere ? Math.random() * canvas.height : canvas.height + Math.random() * 60
        this.baseSize = Math.random() * 2.5 + 0.8
        this.size = this.baseSize
        this.speedY = Math.random() * 0.8 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.4
        this.opacity = 0
        this.targetOpacity = Math.random() * 0.55 + 0.1
        this.life = 0
        this.maxLife = canvas.height / this.speedY
        this.wobble = Math.random() * Math.PI * 2
        this.wobbleSpeed = Math.random() * 0.02 + 0.005
      }

      update() {
        this.y -= this.speedY
        this.wobble += this.wobbleSpeed
        this.x += Math.sin(this.wobble) * 0.3 + this.speedX
        this.life++

        const progress = 1 - this.y / canvas.height
        if (progress < 0.12) {
          this.opacity = (progress / 0.12) * this.targetOpacity
        } else if (progress > 0.75) {
          this.opacity = ((1 - progress) / 0.25) * this.targetOpacity
        } else {
          this.opacity = this.targetOpacity
        }

        if (this.y < -10) this.reset(false)
      }

      draw() {
        if (this.opacity <= 0) return
        ctx.save()
        ctx.globalAlpha = this.opacity

        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3)
        g.addColorStop(0, '#E8C96D')
        g.addColorStop(0.4, '#C9A84C')
        g.addColorStop(1, 'rgba(201,168,76,0)')

        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = '#F0D875'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    const count = Math.min(Math.floor(canvas.width / 8), 180)
    const particles = Array.from({ length: count }, (_, i) => new Particle(i < count * 0.7))

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => { setSize() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
