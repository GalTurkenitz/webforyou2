const items = [
  'מוכן תוך 24 שעות',
  'SEO מובנה',
  'מותאם למובייל',
  'עיצוב ייחודי לכל עסק',
  'ללא התחייבות',
  'החל מ-300 ₪ בלבד',
  'תמיכה מלאה',
  'כפתור וואטסאפ ישיר',
  'בניית אתרים מקצועית',
  'ביקורות גוגל מוטמעות',
]

const doubled = [...items, ...items]

function Sep() {
  return (
    <span style={{
      display: 'inline-block', width: 3, height: 3,
      borderRadius: '50%', background: 'rgba(201,168,76,0.45)',
      margin: '0 18px', verticalAlign: 'middle', flexShrink: 0,
    }} />
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden py-5"
      style={{
        background: '#F5F2EB',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {/* Animated radial shimmer behind the track */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 200% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

      {/* Edge fades to match bg */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left,#F5F2EB,transparent)' }} />
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right,#F5F2EB,transparent)' }} />

      <div className="trust-track">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(168,135,46,0.55)',
              whiteSpace: 'nowrap', padding: '0 16px',
            }}>
              {item}
            </span>
            <Sep />
          </span>
        ))}
      </div>
    </div>
  )
}
