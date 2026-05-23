import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

const navLinks = [
  { label: 'מחירים', href: '#pricing' },
  { label: 'עבודות', href: '#gallery' },
  { label: 'תהליך', href: '#process' },
  { label: 'צור קשר', href: '#contact' },
]

const contacts = [
  {
    href: 'tel:0526599957',
    label: '052-659-9957',
    icon: (
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    ),
    stroke: true,
    hoverColor: '#C9A84C',
  },
  {
    href: 'https://wa.me/972526599957',
    label: 'וואטסאפ',
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    ),
    stroke: false,
    hoverColor: '#25D366',
    external: true,
  },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <footer ref={ref} className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#EDE9DF' }} />
      <div className="dot-grid absolute inset-0 opacity-60" />

      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div className="flex flex-col md:flex-row justify-between gap-12 mb-12"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}>

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="webforyou2" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 900, fontSize: 18, color: '#1A1714', letterSpacing: '-0.02em', direction: 'ltr' }}>
                webforyou2
              </span>
            </div>
            <p className="text-xs tracking-wide mb-5" style={{ color: '#9E9589' }}>
              בניית אתרים מקצועית לעסקים קטנים בישראל
            </p>
            <div className="flex flex-col gap-2.5">
              {contacts.map((item, i) => (
                <a key={i} href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: '#9E9589', transition: 'color 150ms' }}
                  onMouseEnter={e => e.currentTarget.style.color = item.hoverColor}
                  onMouseLeave={e => e.currentTarget.style.color = '#9E9589'}>
                  <svg width="13" height="13" viewBox="0 0 24 24"
                    fill={item.stroke ? 'none' : 'currentColor'}
                    stroke={item.stroke ? 'currentColor' : 'none'}
                    strokeWidth="2">
                    {item.icon}
                  </svg>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-5" style={{ color: '#C4BDB4' }}>
              ניווט
            </div>
            <ul className="flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm"
                    style={{ color: '#9E9589', transition: 'color 150ms' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#1A1714'}
                    onMouseLeave={e => e.currentTarget.style.color = '#9E9589'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="gold-divider mb-8" />

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: '#C4BDB4' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25 }}>
          <span>© 2026 webforyou2 — כל הזכויות שמורות</span>
          <div className="flex items-center gap-1.5">
            <span>נבנה עם</span>
            <span style={{ color: '#C9A84C', fontWeight: 600 }}>♥</span>
            <span>לעסקים קטנים בישראל</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
