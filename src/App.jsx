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

      {/* Always in DOM so browser finds LCP element immediately */}
      <div style={{
        opacity: loaded ? 1 : 0,
        pointerEvents: loaded ? 'auto' : 'none',
      }}>
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
