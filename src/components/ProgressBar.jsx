import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      if (barRef.current) barRef.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full z-[9990] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full"
        style={{
          width: '0%',
          background: 'linear-gradient(90deg, #A8872E, #C9A84C, #E8C96D)',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  )
}
