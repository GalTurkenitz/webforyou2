import { useState, lazy, Suspense } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const CursorEffect   = lazy(() => import('./components/CursorEffect'))
const ProgressBar    = lazy(() => import('./components/ProgressBar'))
const Marquee        = lazy(() => import('./components/Marquee'))
const Pricing        = lazy(() => import('./components/Pricing'))
const Process        = lazy(() => import('./components/Process'))
const Comparison     = lazy(() => import('./components/Comparison'))
const Gallery        = lazy(() => import('./components/Gallery'))
const ContactForm    = lazy(() => import('./components/ContactForm'))
const Footer         = lazy(() => import('./components/Footer'))
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp'))

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      {/* Content always at full opacity — loader covers it visually.
          LCP is measured on first paint of h1, not when loader exits. */}
      <div style={{ pointerEvents: loaded ? 'auto' : 'none' }}>
        <div className="grain" aria-hidden="true" />
        <Suspense fallback={null}>
          <CursorEffect />
          <ProgressBar />
        </Suspense>
        <Navbar />

        <main>
          <Hero />
          <Suspense fallback={null}>
            <Marquee />
            <Pricing />
            <Process />
            <Comparison />
            <Gallery />
            <ContactForm />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
          <FloatingWhatsApp />
        </Suspense>
      </div>
    </>
  )
}
