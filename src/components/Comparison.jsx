import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.23, 1, 0.32, 1]

const rows = [
  { service: 'סוכנויות דיגיטל', price: '3,000–10,000 ₪', time: 'שבועות', ok: false },
  { service: 'פרילנסרים',        price: '1,500–3,000 ₪',  time: 'ימים',   ok: false },
  { service: 'Webforyou2',       price: 'החל מ-300 ₪',    time: '24 שעות', ok: true  },
]

function OkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.35)" strokeWidth="1.5"/>
      <path d="M8 12l3 3 5-5" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function NoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.02)" stroke="#E0DBCE" strokeWidth="1.5"/>
      <path d="M15 9l-6 6M9 9l6 6" stroke="#C4BDB4" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function Stat({ value, suffix, label, active, delay = 0 }) {
  const numRef = useRef(null)
  useEffect(() => {
    if (!active || !numRef.current) return
    const el = numRef.current
    const t = setTimeout(() => {
      const start = performance.now()
      const dur = 1800
      const run = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(value * eased) + suffix
        if (p < 1) requestAnimationFrame(run)
        else el.textContent = value + suffix
      }
      requestAnimationFrame(run)
    }, delay)
    return () => clearTimeout(t)
  }, [active, value, suffix, delay])

  return (
    <div className="text-center">
      <div ref={numRef} className="font-black" style={{
        fontSize: 'clamp(38px,5vw,52px)',
        letterSpacing: '-0.04em', lineHeight: 1,
        color: '#C9A84C',
      }}>
        0{suffix}
      </div>
      <div className="mt-2 text-sm" style={{ color: '#9E9589' }}>{label}</div>
    </div>
  )
}

export default function Comparison() {
  const ref = useRef(null)
  const tableRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!tableRef.current) return
    const rowEls = tableRef.current.querySelectorAll('.table-row')
    gsap.fromTo(rowEls,
      { opacity: 0, x: 36 },
      { opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: tableRef.current, start: 'top 72%' } }
    )
  }, [])

  return (
    <section id="comparison" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#FAF8F5' }} />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.03) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} className="mb-14"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          <div className="section-tag mb-5 w-fit">
            <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
            למה אנחנו?
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(34px,5vw,54px)',
              letterSpacing: '-0.03em', color: '#1A1714', lineHeight: 1.05 }}>
              תחסוך{' '}
              <span style={{ color: '#C9A84C' }}>אלפי שקלים</span>
            </h2>
            <p style={{ color: '#6B6457', fontSize: 15, maxWidth: '38ch' }}>
              AI מתקדם מאפשר לנו לבנות אתר מקצועי תוך 24 שעות ולהעביר את החיסכון אליך
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <div ref={tableRef} className="rounded-2xl overflow-hidden mb-16"
          style={{ border: '1px solid rgba(201,168,76,0.1)', boxShadow: '0 4px 24px rgba(26,23,20,0.04)' }}>

          {/* Header row */}
          <div className="grid grid-cols-3 px-3 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold"
            style={{ background: '#F5F2EB', color: '#C4BDB4', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
            <span>שירות</span>
            <span className="text-center">מחיר</span>
            <span className="text-center">זמן</span>
          </div>

          {rows.map((row, i) => (
            <div key={i}
              className="table-row grid grid-cols-3 px-3 sm:px-6 py-3.5 sm:py-5 items-center"
              style={{
                background: row.ok ? 'rgba(201,168,76,0.03)' : '#fff',
                borderTop: '1px solid rgba(201,168,76,0.06)',
              }}>
              <div className="flex items-center gap-1.5 sm:gap-2 font-semibold text-xs sm:text-sm">
                {row.ok && (
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                    style={{ background: '#C9A84C' }} />
                )}
                <span style={{ color: row.ok ? '#C9A84C' : '#9E9589', fontWeight: row.ok ? 700 : 500 }}>
                  {row.service}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {row.ok ? <OkIcon /> : <NoIcon />}
                <span className="text-xs sm:text-sm font-medium leading-tight text-center"
                  style={{ color: row.ok ? '#1A1714' : '#C4BDB4' }}>
                  {row.price}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                {row.ok ? <OkIcon /> : <NoIcon />}
                <span className="text-xs sm:text-sm font-medium"
                  style={{ color: row.ok ? '#1A1714' : '#C4BDB4' }}>
                  {row.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <motion.div className="grid grid-cols-3 gap-2 sm:gap-6"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.65, ease: EASE }}>
          <Stat value={50} suffix="+" label="אתרים שנבנו"    active={inView} delay={0} />
          <Stat value={24} suffix="h" label="זמן ביצוע ממוצע" active={inView} delay={220} />
          <Stat value={100} suffix="%" label="לקוחות מרוצים"  active={inView} delay={440} />
        </motion.div>
      </div>
    </section>
  )
}
