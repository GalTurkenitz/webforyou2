import { useEffect, useRef, useState } from 'react'

export default function CursorEffect() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafId = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      rafId.current = requestAnimationFrame(animate)
    }

    const onEnter = (e) => {
      const el = e.target
      if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')) {
        ringRef.current?.classList.add('hover')
      }
    }

    const onLeave = (e) => {
      const el = e.target
      if (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest('a') || el.closest('button')) {
        ringRef.current?.classList.remove('hover')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <div ref={dotRef} className="c-dot" style={{ opacity: visible ? 1 : 0 }} />
      <div ref={ringRef} className="c-ring" style={{ opacity: visible ? 0.5 : 0 }} />
    </>
  )
}
