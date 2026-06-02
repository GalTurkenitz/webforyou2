import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]
const LETTERS = 'webforyou2'.split('')

export default function Loader({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Logo in: 0.2s, letters finish: ~0.5 + 9*0.09 = ~1.3s, pause then exit
    const t = setTimeout(() => setVisible(false), 550)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none"
          style={{ background: '#FAF8F5' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Ambient radial */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)' }} />

          {/* Subtle dot grid */}
          <div className="dot-grid absolute inset-0 opacity-30" />

          {/* Logo image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
            className="mb-7"
          >
            <img
              src="/logo.png"
              alt="webforyou2"
              style={{ width: 120, height: 120, objectFit: 'contain' }}
            />
          </motion.div>

          {/* "webforyou2" — letters appear LEFT → RIGHT */}
          <div className="flex items-baseline" style={{ direction: 'ltr', gap: 0 }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55 + i * 0.09,
                  duration: 0.38,
                  ease: EASE,
                }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Heebo, sans-serif',
                  fontWeight: 900,
                  fontSize: 32,
                  color: '#C9A84C',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* "web for you too" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            style={{
              fontFamily: 'Heebo, sans-serif',
              fontSize: 11,
              letterSpacing: '0.18em',
              color: '#9E9589',
              marginTop: 8,
              direction: 'ltr',
            }}
          >
            web for you too
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-10 overflow-hidden rounded-full"
            style={{ width: 100, height: 1.5, background: 'rgba(201,168,76,0.14)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#C9A84C' }}
              initial={{ scaleX: 0, transformOrigin: 'left center' }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.38, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
