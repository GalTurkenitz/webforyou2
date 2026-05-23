import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

const fields = [
  { name: 'business', label: 'שם העסק',   placeholder: 'למשל: מספרת גבי',           required: true },
  { name: 'category', label: 'תחום העסק', placeholder: 'למשל: מסעדה, ספא, כושר',   required: false },
  { name: 'phone',    label: 'מספר טלפון', placeholder: '05X-XXX-XXXX',              required: true, type: 'tel' },
]

function CheckSVG() {
  return (
    <motion.svg width="56" height="56" viewBox="0 0 56 56" fill="none"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.25, delay: 0.1 }}>
      <circle cx="28" cy="28" r="26" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5"/>
      <motion.path d="M16 28l9 9 15-15" stroke="#C9A84C" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }} />
    </motion.svg>
  )
}

export default function ContactForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ business: '', category: '', phone: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    if (!form.business || !form.phone) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1600)
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#FAF8F5' }} />

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent)' }} />

      {/* Ambient */}
      <div className="orb orb-1 absolute pointer-events-none"
        style={{ width: 600, height: 600, background: 'rgba(201,168,76,0.055)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-12"
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          <div className="section-tag mb-5 mx-auto w-fit">
            <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
            בחינם ללא התחייבות
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(30px,5vw,46px)',
            letterSpacing: '-0.03em', color: '#1A1714', lineHeight: 1.08 }}>
            רוצה לראות איך{' '}
            <span style={{ color: '#C9A84C' }}>האתר שלך ייראה?</span>
          </h2>
          <p className="mt-4" style={{ color: '#6B6457', fontSize: 16, lineHeight: 1.6 }}>
            שלח לנו את שם העסק ונבנה לך אתר לצפייה — חינם וללא התחייבות
          </p>
        </motion.div>

        {/* Card — clean, no shimmer */}
        <motion.div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: '#fff',
            border: '1px solid rgba(201,168,76,0.1)',
            boxShadow: '0 8px 40px rgba(26,23,20,0.06)',
          }}
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.65, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="success"
                className="text-center py-8 flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <CheckSVG />
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1A1714', marginBottom: 8 }}>קיבלנו!</h3>
                  <p style={{ color: '#6B6457', fontSize: 15 }}>נחזור אליך תוך 24 שעות עם האתר לדוגמה.</p>
                </div>
                <a href="https://wa.me/972526599957" target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold"
                  style={{ color: '#C9A84C' }}>
                  052-659-9957
                </a>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={onSubmit} className="flex flex-col gap-5"
                initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#3D3830' }}>
                      {field.label}
                      {field.required && <span className="mr-1" style={{ color: '#C9A84C' }}>*</span>}
                    </label>
                    <input
                      name={field.name} type={field.type || 'text'}
                      value={form[field.name]} onChange={onChange}
                      placeholder={field.placeholder} required={field.required}
                      className="gold-input w-full px-5 py-3.5 rounded-xl text-sm"
                    />
                  </div>
                ))}

                <motion.button type="submit" disabled={loading}
                  className="relative mt-2 py-4 rounded-2xl font-bold text-[15px]"
                  style={{
                    background: 'linear-gradient(135deg,#C9A84C,#E8C96D)',
                    color: '#1A1714',
                    boxShadow: '0 4px 18px rgba(201,168,76,0.28)',
                    transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(201,168,76,0.38)' }}
                  whileTap={{ scale: 0.97 }}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      שולח...
                    </span>
                  ) : 'שלחו לי אתר לדוגמה — חינם'}
                </motion.button>

                <p className="text-center text-xs" style={{ color: '#C4BDB4' }}>
                  חינם · ללא התחייבות · נחזור תוך 24 שעות
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
