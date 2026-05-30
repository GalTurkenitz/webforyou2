import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

const projects = [
  {
    name: 'הגנני',
    category: 'גינון ועיצוב גינות',
    url: 'haganani.com',
    href: 'https://haganani.com',
    img: '/gallery/haganani.png',
  },
  {
    name: 'שי ממן DJ',
    category: 'DJ ואירועים',
    url: 'shay-maman-dj.com',
    href: 'https://shay-maman-dj.com',
    img: '/gallery/shay-maman-dj.png',
  },
  {
    name: 'גרר דביר',
    category: 'גרירה וחילוץ',
    url: 'grar-dvir-fast.com',
    href: 'https://grar-dvir-fast.com',
    img: '/gallery/grar-dvir-fast.png',
  },
  {
    name: 'גרר כפיר',
    category: 'גרירה ארצית',
    url: 'grar-kfir.com',
    href: 'https://grar-kfir.com',
    img: '/gallery/grar-kfir.png',
  },
]

function ProjectCard({ p }) {
  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-2xl overflow-hidden shrink-0 group block"
      style={{ width: 300, height: 220, cursor: 'pointer', flexShrink: 0,
        boxShadow: '0 8px 32px rgba(26,23,20,0.13), 0 2px 8px rgba(26,23,20,0.07)' }}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {/* Browser chrome */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3"
        style={{ height: 28, background: 'rgba(245,242,235,0.96)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
        {['#E8685A','#F5BD4F','#61C554'].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.8 }} />
        ))}
        <div className="flex-1 mx-2 rounded-full flex items-center px-2"
          style={{ height: 14, background: 'rgba(26,23,20,0.06)', fontSize: 8, color: '#9E9589', direction: 'ltr', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {p.url}
        </div>
      </div>

      {/* Screenshot */}
      <img
        src={p.img}
        alt={p.name}
        className="w-full object-cover object-top"
        loading="lazy"
        style={{ display: 'block', height: 'calc(100% - 28px)', marginTop: 28 }}
      />

      {/* Bottom gradient always visible */}
      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(26,23,20,0.82), transparent)' }} />

      {/* Resting label */}
      <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between group-hover:opacity-0"
        style={{ transition: 'opacity 180ms' }}>
        <span className="text-xs font-bold text-white">{p.name}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(201,168,76,0.22)', color: '#E8C96D', border: '1px solid rgba(201,168,76,0.3)' }}>
          {p.category}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
        style={{
          background: 'rgba(26,23,20,0.78)',
          backdropFilter: 'blur(4px)',
          transition: 'opacity 200ms cubic-bezier(0.23,1,0.32,1)',
        }}>
        <span className="text-white font-black text-base">{p.name}</span>
        <span className="text-[11px] px-3 py-1 rounded-full"
          style={{ background: 'rgba(201,168,76,0.2)', color: '#E8C96D', border: '1px solid rgba(201,168,76,0.28)' }}>
          {p.category}
        </span>
        <span className="text-[11px] mt-1 flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
          {p.url}
        </span>
      </div>
    </motion.a>
  )
}

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const doubled = [...projects, ...projects, ...projects]

  return (
    <section id="gallery" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#EDE9DF' }} />
      <div className="dot-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(255,255,255,0.35) 0%,transparent 70%)' }} />

      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.2),transparent)' }} />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-14">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          <div className="section-tag mb-5 w-fit">
            <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
            גלריה
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(34px,5vw,54px)',
              letterSpacing: '-0.03em', color: '#1A1714', lineHeight: 1.05 }}>
              אתרים <span style={{ color: '#C9A84C' }}>שבנינו</span>
            </h2>
            <p style={{ color: '#6B6457', fontSize: 15, maxWidth: '40ch' }}>
              כל אתר נבנה בהתאמה אישית — לא תמצא שני אתרים זהים
            </p>
          </div>
        </motion.div>
      </div>

      {/* Mobile grid */}
      <div className="md:hidden relative z-10 max-w-6xl mx-auto px-5 grid grid-cols-2 gap-4">
        {projects.map((p, i) => (
          <motion.a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
            className="relative rounded-2xl overflow-hidden block"
            style={{ boxShadow: '0 8px 32px rgba(26,23,20,0.13)' }}
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08 + 0.1, duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-1 px-2"
              style={{ height: 22, background: 'rgba(245,242,235,0.96)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
              {['#E8685A','#F5BD4F','#61C554'].map((c, j) => (
                <div key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: c, opacity: 0.8 }} />
              ))}
            </div>
            <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
              <img src={p.img} alt={p.name} className="w-full h-full object-cover object-top" loading="lazy" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(26,23,20,0.82), transparent)' }} />
            <div className="absolute bottom-2 right-2 left-2 flex items-end justify-between">
              <span className="text-[11px] font-bold text-white">{p.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full"
                style={{ background: 'rgba(201,168,76,0.22)', color: '#E8C96D', border: '1px solid rgba(201,168,76,0.3)' }}>
                {p.category}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Desktop carousel */}
      <div className="hidden md:block relative overflow-hidden z-10" style={{ direction: 'ltr' }}>
        <div className="absolute right-0 top-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left,#EDE9DF,transparent)' }} />
        <div className="absolute left-0 top-0 bottom-0 w-28 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right,#EDE9DF,transparent)' }} />
        <div className="gallery-track">
          {doubled.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      </div>

      {/* CTA */}
      <motion.div className="relative z-10 text-center mt-12 px-6"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 }}>
        <a href="#contact"
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: '#C9A84C', transition: 'opacity 150ms' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <span>רוצה שנבנה לך אתר כזה?</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
