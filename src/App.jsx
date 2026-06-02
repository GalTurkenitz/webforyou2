import { useState } from 'react'
import Loader from './components/Loader'
import CursorEffect from './components/CursorEffect'
import ProgressBar from './components/ProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Comparison from './components/Comparison'
import Gallery from './components/Gallery'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          {/* Film grain overlay — site-wide */}
          <div className="grain" aria-hidden="true" />

          <CursorEffect />
          <ProgressBar />
          <Navbar />

          <main>
            <Hero />
            <Marquee />
            <Pricing />
            <Process />
            <Comparison />
            <Gallery />
            <ContactForm />
          </main>

          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </>
  )
}
