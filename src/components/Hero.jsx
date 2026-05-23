import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import HeroCanvas from './HeroCanvas'

const EASE = [0.23, 1, 0.32, 1]

/* Stylized device mockup — pure CSS, no images */
function DeviceMockup() {
  return (
    <motion.div
      className="relative w-full max-w-[320px] mx-auto lg:mx-0"
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
    >
      {/* Subtle rotation — Z-axis depth */}
      <div style={{ transform: 'perspective(800px) rotateY(-4deg) rotateX(2deg)' }}>

        {/* Outer bezel */}
        <div className="rounded-[2.2rem] p-[2.5px]"
          style={{
            background: 'linear-gradient(145deg,#E8C96D 0%,#C9A84C 40%,#A8872E 80%,#E8C96D 100%)',
            boxShadow: '0 24px 80px rgba(201,168,76,0.2), 0 4px 16px rgba(26,23,20,0.08)',
          }}>
          {/* Inner screen */}
          <div className="rounded-[1.9rem] overflow-hidden"
            style={{ background: '#FAF8F5' }}>

            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3"
              style={{ background: '#F0EDE5', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              {[1,2,3].map(i => (
                <div key={i} className="w-2 h-2 rounded-full"
                  style={{ background: i === 1 ? '#C9A84C' : 'rgba(201,168,76,0.2)' }} />
              ))}
              <div className="flex-1 mx-3 h-4 rounded-full flex items-center px-2"
                style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.12)' }}>
                <div className="w-12 h-1.5 rounded-full" style={{ background: 'rgba(201,168,76,0.2)' }} />
              </div>
            </div>

            {/* Page content */}
            <div className="p-5 space-y-4">
              {/* Hero block */}
              <div className="space-y-2">
                <div className="h-2.5 rounded-full" style={{ width: '72%', background: 'rgba(201,168,76,0.4)' }} />
                <div className="h-2 rounded-full" style={{ width: '55%', background: 'rgba(201,168,76,0.18)' }} />
              </div>

              {/* Image area */}
              <div className="rounded-xl overflow-hidden" style={{ height: 110, background: 'linear-gradient(135deg,rgba(201,168,76,0.08),rgba(232,201,109,0.05))' }}>
                <div className="h-full flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.1)', border: '1.5px solid rgba(201,168,76,0.25)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Body lines */}
              <div className="space-y-1.5">
                {[100,88,74,60].map((w,i) => (
                  <div key={i} className="h-1.5 rounded-full"
                    style={{ width: `${w}%`, background: `rgba(180,168,152,${0.18 - i*0.03})` }} />
                ))}
              </div>

              {/* CTA */}
              <div className="h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(90deg,#C9A84C,#E8C96D)' }}>
                <div className="w-20 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.45)' }} />
              </div>

              {/* Footer links */}
              <div className="flex gap-2">
                {[...Array(3)].map((_,i) => (
                  <div key={i} className="flex-1 h-5 rounded-lg"
                    style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge — 24h */}
      <motion.div
        className="absolute rounded-2xl px-4 py-3"
        style={{
          background: '#fff',
          boxShadow: '0 8px 28px rgba(201,168,76,0.16), 0 1px 4px rgba(26,23,20,0.06)',
          border: '1px solid rgba(201,168,76,0.12)',
          left: '-10%', top: '22%',
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-xs font-bold" style={{ color: '#C9A84C' }}>24 שעות</div>
        <div className="text-[10px] mt-0.5" style={{ color: '#9E9589' }}>זמן ביצוע</div>
      </motion.div>

      {/* Floating badge — price */}
      <motion.div
        className="absolute rounded-2xl px-4 py-3"
        style={{
          background: '#C9A84C',
          boxShadow: '0 8px 28px rgba(201,168,76,0.32)',
          right: '-8%', bottom: '28%',
        }}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <div className="text-xs font-bold text-white">החל מ-300 ₪</div>
        <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>חד פעמי</div>
      </motion.div>
    </motion.div>
  )
}

function GoldBtn({ href, children, external }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 20 })
  const sy = useSpring(y, { stiffness: 180, damping: 20 })
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <motion.div ref={ref} className="inline-block" style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <a href={href} {...extra}
        className="relative flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[14px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg,#C9A84C,#E8C96D)',
          color: '#1A1714',
          boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset, 0 6px 20px rgba(201,168,76,0.28)',
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; e.currentTarget.style.transition = 'transform 160ms cubic-bezier(0.23,1,0.32,1)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {children}
      </a>
    </motion.div>
  )
}

function GhostBtn({ href, children, external }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 20 })
  const sy = useSpring(y, { stiffness: 180, damping: 20 })
  const onMove = e => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  const extra = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <motion.div ref={ref} className="inline-block" style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <a href={href} {...extra}
        className="flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-[14px]"
        style={{
          border: '1.5px solid rgba(201,168,76,0.28)',
          color: '#6B6457',
          transition: 'border-color 150ms, color 150ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.55)'; e.currentTarget.style.color = '#1A1714' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.28)'; e.currentTarget.style.color = '#6B6457' }}
        onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; e.currentTarget.style.transition = 'transform 160ms cubic-bezier(0.23,1,0.32,1)' }}
        onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        {children}
      </a>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#FAF8F5' }} />
      <div className="dot-grid absolute inset-0 opacity-35" />

      {/* Ambient gold light */}
      <div className="orb orb-1 absolute pointer-events-none"
        style={{ width: 520, height: 520, background: 'rgba(201,168,76,0.06)', top: '-15%', right: '25%' }} />
      <div className="orb orb-2 absolute pointer-events-none"
        style={{ width: 380, height: 380, background: 'rgba(232,201,109,0.04)', bottom: '5%', left: '10%' }} />

      {/* Particle network — behind content */}
      <HeroCanvas />

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent)' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Editorial split: text right (RTL natural), visual left */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-16 items-center">

          {/* ── Text block ── */}
          <div>
            <motion.div className="mb-7"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}>
              <span className="section-tag">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C9A84C' }} />
                מבוסס AI · עסקים קטנים בישראל
              </span>
            </motion.div>

            {/* Headline — clip-path per line */}
            <h1 style={{ fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.02, color: '#1A1714',
              fontSize: 'clamp(46px,7.5vw,90px)' }}>
              {[
                { text: 'אתר מקצועי',  delay: 0.1 },
                { text: 'לעסק שלך —',  delay: 0.22 },
                { text: <span style={{ color: '#C9A84C' }}>תוך 24 שעות</span>, delay: 0.34 },
              ].map((line, i) => (
                <div key={i} className="line-mask">
                  <motion.div
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{ delay: line.delay, duration: 0.78, ease: EASE }}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* Body copy */}
            <motion.p
              className="mt-6 leading-relaxed"
              style={{ fontSize: 17, color: '#6B6457', maxWidth: '46ch' }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.65, ease: EASE }}
            >
              בניית אתרים לעסקים קטנים בישראל. מהיר, מקצועי ובמחיר שלא תאמין.{' '}
              <span style={{ color: '#9E9589' }}>החל מ-300 ₪ בלבד.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div className="flex flex-wrap gap-3 mt-9"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.66, duration: 0.6, ease: EASE }}>
              <GoldBtn href="#contact">
                קבל אתר לדוגמה — חינם
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
              </GoldBtn>
              <GhostBtn href="https://wa.me/972526599957?text=היי%2C%20רוצה%20לשמוע%20על%20בניית%20אתר" external>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                דברו איתנו
              </GhostBtn>
            </motion.div>

            {/* Trust row — NOT hero-metrics, just soft signals */}
            <motion.div className="flex flex-wrap items-center gap-5 mt-10"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.88, duration: 0.5 }}>
              {['50+ אתרים שנבנו', 'ביצוע תוך 24 שעות', 'ללא התחייבות'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[13px]"
                  style={{ color: '#9E9589' }}>
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: '#C9A84C' }} />
                  {t}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Visual ── */}
          <DeviceMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="bounce-arrow absolute bottom-7 left-1/2 pointer-events-none z-10">
        <div className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ border: '1px solid rgba(201,168,76,0.18)', background: 'rgba(255,255,255,0.55)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>

      {/* Bottom fade to Marquee */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,transparent,#F5F2EB)' }} />
    </section>
  )
}
