import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

const steps = [
  {
    num: '01',
    title: 'שולחים שם העסק',
    desc: 'ממלאים טופס קצר — שם, תחום, מספר טלפון. זה הכל.',
  },
  {
    num: '02',
    title: 'אנחנו בונים',
    desc: 'בעזרת AI מתקדם בונים אתר מלא ומקצועי המותאם לעסק שלך ספציפית.',
  },
  {
    num: '03',
    title: 'מאשרים ועולים לאוויר',
    desc: 'שולחים קישור, שינויים לפי בקשה, ומעלים לדומיין שלך. מוכן.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#F5F2EB' }} />
      <div className="dot-grid absolute inset-0 opacity-50" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%,rgba(255,255,255,0.45) 0%,transparent 70%)' }} />

      {/* Large decorative number watermark */}
      <div className="absolute pointer-events-none select-none"
        style={{
          fontFamily: 'Heebo', fontWeight: 900, fontSize: 'clamp(180px,28vw,320px)',
          color: 'rgba(201,168,76,0.04)', letterSpacing: '-0.06em', lineHeight: 1,
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          whiteSpace: 'nowrap',
        }}>
        ··
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} className="mb-20"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          <div className="section-tag mb-5 w-fit">
            <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
            איך זה עובד
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(34px,5vw,54px)', letterSpacing: '-0.03em', color: '#1A1714', lineHeight: 1.05 }}>
              שלושה צעדים<br />
              <span style={{ color: '#C9A84C' }}>זה הכל</span>
            </h2>
            <p style={{ color: '#9E9589', fontSize: 15, maxWidth: '38ch' }} className="md:text-left">
              מיצירת הקשר ועד שהאתר עולה לאוויר — הכל קורה תוך 24 שעות
            </p>
          </div>
        </motion.div>

        {/* Steps — horizontal timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">

          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute"
            style={{
              top: 52, right: '16.5%', left: '16.5%', height: 1,
              background: 'linear-gradient(90deg,rgba(201,168,76,0.22),rgba(201,168,76,0.12),rgba(201,168,76,0.22))',
            }} />

          {steps.map((step, i) => (
            <motion.div key={i}
              className="flex flex-col md:items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.15, duration: 0.7, ease: EASE }}>

              {/* Number bubble */}
              <div className="relative mb-8 md:flex md:justify-center">
                <div className="relative w-[104px] h-[104px] flex items-center justify-center"
                  style={{
                    background: '#FAF8F5',
                    border: '1px solid rgba(201,168,76,0.18)',
                    borderRadius: '50%',
                    boxShadow: '0 4px 24px rgba(201,168,76,0.1)',
                  }}>
                  <span style={{
                    fontFamily: 'Heebo', fontWeight: 900,
                    fontSize: 36, letterSpacing: '-0.04em',
                    color: '#C9A84C',
                  }}>
                    {step.num}
                  </span>
                  {/* Pulse ring */}
                  <motion.div className="absolute inset-0 rounded-full"
                    style={{ border: '1px solid rgba(201,168,76,0.18)' }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: i * 1.1 }} />
                </div>
              </div>

              {/* Content */}
              <div className="md:text-center md:px-4">
                <h3 style={{ fontWeight: 700, fontSize: 17, color: '#1A1714', marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9E9589' }}>
                  {step.desc}
                </p>
              </div>

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div className="md:hidden w-px h-8 mt-8 mb-2 mx-auto"
                  style={{ background: 'rgba(201,168,76,0.2)' }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="mt-16 text-center"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65 }}>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[14px]"
            style={{
              background: 'linear-gradient(135deg,#C9A84C,#E8C96D)',
              color: '#1A1714',
              boxShadow: '0 1px 0 rgba(255,255,255,0.3) inset, 0 6px 20px rgba(201,168,76,0.25)',
              transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.3) inset, 0 10px 28px rgba(201,168,76,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 1px 0 rgba(255,255,255,0.3) inset, 0 6px 20px rgba(201,168,76,0.25)' }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            מתחילים עכשיו
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
