import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

const links = [
  { label: 'מחירים', href: '#pricing' },
  { label: 'עבודות', href: '#gallery' },
  { label: 'תהליך', href: '#process' },
  { label: 'צור קשר', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-4 inset-x-0 z-[9980] flex justify-center px-4"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
      >
        <motion.nav
          className="flex items-center gap-2 px-3 py-2 rounded-full"
          animate={{
            background: scrolled ? 'rgba(250,248,245,0.94)' : 'rgba(250,248,245,0.78)',
            boxShadow: scrolled
              ? '0 1px 0 rgba(201,168,76,0.1), 0 6px 28px rgba(26,23,20,0.09)'
              : '0 1px 0 rgba(201,168,76,0.07), 0 3px 14px rgba(26,23,20,0.05)',
          }}
          transition={{ duration: 0.28 }}
          style={{
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {/* Logo + full name */}
          <a href="#" className="flex items-center gap-2 px-1">
            <img src="/logo.png" alt="webforyou2" style={{ width: 26, height: 26, objectFit: 'contain' }} />
            <span style={{
              fontFamily: 'Heebo, sans-serif', fontWeight: 900, fontSize: 14,
              color: '#1A1714', letterSpacing: '-0.02em', direction: 'ltr',
            }}>
              webforyou2
            </span>
          </a>

          <div className="hidden md:block w-px h-4 mx-0.5" style={{ background: 'rgba(201,168,76,0.18)' }} />

          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium"
                style={{ color: '#6B6457', transition: 'color 140ms' }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, ease: EASE }}
                onMouseEnter={e => e.currentTarget.style.color = '#1A1714'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B6457'}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:block w-px h-4 mx-0.5" style={{ background: 'rgba(201,168,76,0.18)' }} />

          <motion.a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold"
            style={{
              background: 'linear-gradient(135deg,#C9A84C,#E8C96D)',
              color: '#1A1714',
              boxShadow: '0 1px 3px rgba(201,168,76,0.28)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            whileHover={{ scale: 1.04, boxShadow: '0 4px 14px rgba(201,168,76,0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            קבל הצעה
          </motion.a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[4px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="תפריט"
          >
            {[0, 1].map(i => (
              <motion.span key={i}
                className="block rounded-full"
                style={{ width: 17, height: 1.5, background: '#C9A84C' }}
                animate={menuOpen
                  ? { rotate: i === 0 ? 45 : -45, y: i === 0 ? 3 : -3 }
                  : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
              />
            ))}
          </button>
        </motion.nav>
      </motion.div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[9970] md:hidden flex flex-col items-center justify-center gap-3 px-8"
            style={{ background: 'rgba(250,248,245,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* Logo in mobile menu */}
            <div className="mb-6 flex flex-col items-center gap-2">
              <img src="/logo.png" alt="webforyou2" style={{ width: 60, height: 60 }} />
              <span style={{ fontFamily: 'Heebo', fontWeight: 900, fontSize: 18, color: '#C9A84C', direction: 'ltr' }}>
                webforyou2
              </span>
            </div>

            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-4 text-xl font-bold rounded-2xl"
                style={{ color: '#1A1714' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.08, ease: EASE }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 w-full text-center py-4 rounded-2xl font-bold text-base"
              style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96D)', color: '#1A1714' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, ease: EASE }}
            >
              קבל הצעה
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
