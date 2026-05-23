import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

const plans = [
  {
    id: 'landing',
    tag: 'בסיס',
    name: 'דף נחיתה',
    desc: 'נוכחות דיגיטלית מלאה — הכרטיס הביקור של העסק שלך',
    oneTime: 300,
    annual: 200,
    features: [
      'עיצוב ייחודי לעסק שלך',
      'מותאם מלא למובייל',
      'SEO מובנה',
      'כפתור וואטסאפ ישיר',
      'ביקורות גוגל מוטמעות',
      'טפסי יצירת קשר',
      'מוכן תוך 24 שעות',
    ],
    highlight: false,
    included: null,
  },
  {
    id: 'store',
    tag: 'מומלץ',
    name: 'דף נחיתה + הזמנות',
    desc: 'דף נחיתה מקצועי ומערכת הזמנות — הכל יחד בחבילה אחת',
    oneTime: 1200,
    annual: 800,
    features: [
      'כל מה שבדף נחיתה',
      'מערכת קבלת הזמנות',
      'חיבור לסליקה של העסק',
      'ניהול תפריט ומוצרים',
      'התראות הזמנה בוואטסאפ',
      'דשבורד ניהול עסקאות',
      'מוכן תוך 24 שעות',
    ],
    highlight: true,
    included: 'כולל דף נחיתה',
  },
]

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlanCard({ plan, index, inView }) {
  const dimColor = plan.highlight ? 'rgba(255,255,255,0.55)' : '#9E9589'
  const dimColorLight = plan.highlight ? 'rgba(255,255,255,0.35)' : '#C4BDB4'
  const dividerColor = plan.highlight ? 'rgba(255,255,255,0.14)' : 'rgba(201,168,76,0.08)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.12 + index * 0.14, duration: 0.72, ease: EASE }}
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={plan.highlight
        ? {
            background: '#C9A84C',
            boxShadow: '0 20px 60px rgba(201,168,76,0.3), 0 4px 14px rgba(26,23,20,0.07)',
          }
        : {
            background: '#fff',
            border: '1px solid rgba(201,168,76,0.12)',
            boxShadow: '0 4px 24px rgba(26,23,20,0.05)',
          }
      }
    >
      {/* Tag + title */}
      <div className="px-8 pt-7 pb-0">
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
          style={plan.highlight
            ? { background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.88)' }
            : { background: 'rgba(201,168,76,0.08)', color: '#A8872E', border: '1px solid rgba(201,168,76,0.18)' }
          }>
          {plan.tag}
        </span>

        {plan.included && (
          <div className="flex items-center gap-1.5 mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l5 5L20 7" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{plan.included}</span>
          </div>
        )}

        <h3 style={{
          fontWeight: 900, fontSize: 20,
          color: plan.highlight ? '#fff' : '#1A1714',
          letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6,
        }}>
          {plan.name}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.6,
          color: plan.highlight ? 'rgba(255,255,255,0.7)' : '#6B6457', marginBottom: 20 }}>
          {plan.desc}
        </p>
      </div>

      {/* Both prices side by side */}
      <div className="px-8 pb-0">
        <div className="flex items-stretch gap-3 mb-5">

          {/* One-time setup */}
          <div className="flex-1 rounded-2xl px-4 py-3.5"
            style={{ background: plan.highlight ? 'rgba(0,0,0,0.12)' : 'rgba(201,168,76,0.05)', border: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.12)' : 'rgba(201,168,76,0.1)'}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dimColor, marginBottom: 6 }}>
              הקמה
            </div>
            <div style={{
              fontSize: 'clamp(28px,3.5vw,36px)', fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: 1,
              color: plan.highlight ? '#fff' : '#1A1714',
            }}>
              {plan.oneTime}
              <span style={{ fontSize: 14, fontWeight: 600 }}> ₪</span>
            </div>
            <div style={{ fontSize: 10, color: dimColorLight, marginTop: 3 }}>חד פעמי</div>
          </div>

          {/* Plus */}
          <div className="flex items-center justify-center shrink-0"
            style={{ color: dimColor, fontSize: 20, fontWeight: 300, paddingBottom: 14 }}>
            +
          </div>

          {/* Annual */}
          <div className="flex-1 rounded-2xl px-4 py-3.5"
            style={{ background: plan.highlight ? 'rgba(255,255,255,0.14)' : 'rgba(201,168,76,0.07)', border: `1px solid ${plan.highlight ? 'rgba(255,255,255,0.18)' : 'rgba(201,168,76,0.15)'}` }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: dimColor, marginBottom: 6 }}>
              תחזוקה
            </div>
            <div style={{
              fontSize: 'clamp(28px,3.5vw,36px)', fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: 1,
              color: plan.highlight ? '#fff' : '#1A1714',
            }}>
              {plan.annual}
              <span style={{ fontSize: 14, fontWeight: 600 }}> ₪</span>
            </div>
            <div style={{ fontSize: 10, color: dimColorLight, marginTop: 3 }}>לשנה</div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-8" style={{ height: 1, background: dividerColor }} />

      {/* Features */}
      <ul className="px-8 pt-5 pb-6 flex flex-col gap-3 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm"
            style={{ color: plan.highlight ? 'rgba(255,255,255,0.88)' : '#3D3830' }}>
            <span className="shrink-0"
              style={{ color: plan.highlight ? 'rgba(255,255,255,0.65)' : '#C9A84C' }}>
              <CheckIcon />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="px-8 pb-8">
        <a href="#contact"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm"
          style={plan.highlight
            ? { background: '#1A1714', color: '#E8C96D',
                transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1)' }
            : { background: 'linear-gradient(135deg,#C9A84C,#E8C96D)', color: '#1A1714',
                boxShadow: '0 4px 14px rgba(201,168,76,0.22)',
                transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), box-shadow 160ms' }
          }
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          קבל אתר לדוגמה — חינם
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </a>
        <p className="text-center mt-3 mb-4 text-xs"
          style={{ color: plan.highlight ? 'rgba(255,255,255,0.38)' : '#C4BDB4' }}>
          ללא התחייבות · קבל אתר לדוגמה קודם
        </p>

        {/* Pay now */}
        <a href="#"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold"
          style={plan.highlight
            ? { background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(255,255,255,0.2)',
                transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), background 160ms' }
            : { background: 'transparent', color: '#6B6457',
                border: '1px solid rgba(201,168,76,0.2)',
                transition: 'transform 160ms cubic-bezier(0.23,1,0.32,1), background 160ms' }
          }
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.02)'
            e.currentTarget.style.background = plan.highlight ? 'rgba(255,255,255,0.18)' : 'rgba(201,168,76,0.06)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = plan.highlight ? 'rgba(255,255,255,0.12)' : 'transparent'
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          שלם כאן
          <span style={{ fontSize: 10, opacity: 0.6, fontWeight: 400 }}>· סליקה מאובטחת</span>
        </a>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#FAF8F5' }} />
      <div className="orb orb-1 absolute pointer-events-none"
        style={{ width: 500, height: 500, background: 'rgba(201,168,76,0.055)', top: '-12%', right: '-8%' }} />
      <div className="orb orb-2 absolute pointer-events-none"
        style={{ width: 360, height: 360, background: 'rgba(232,201,109,0.04)', bottom: '-5%', left: '-5%' }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} className="mb-14"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE }}>
          <div className="section-tag mb-5 w-fit">
            <span className="w-1 h-1 rounded-full" style={{ background: '#C9A84C' }} />
            מחירים
          </div>
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(34px,5vw,54px)',
              letterSpacing: '-0.03em', color: '#1A1714', lineHeight: 1.05 }}>
              מחירים <span style={{ color: '#C9A84C' }}>שקופים</span>
            </h2>
            <p className="mt-3" style={{ color: '#6B6457', fontSize: 15, maxWidth: '44ch' }}>
              שני מוצרים, שני מחירים — כל אחד כולל את הקודם
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}>
          <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.12)' }} />
          <p className="text-sm text-center shrink-0" style={{ color: '#9E9589' }}>
            כולל תמיכה מלאה · שינויים ללא הגבלה · מוכן תוך 24 שעות
          </p>
          <div className="h-px flex-1" style={{ background: 'rgba(201,168,76,0.12)' }} />
        </motion.div>
      </div>
    </section>
  )
}
