import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Spotlight from '../components/ui/Spotlight'

export default function Home() {
  const location = useLocation()

  // A nav link clicked from another route (e.g. /projects) lands here with
  // a hash already in the URL — the browser only auto-scrolls to a fragment
  // on the initial document load, not after an SPA route change, so this
  // does it manually once the sections below exist to scroll to.
  useEffect(() => {
    if (!location.hash) return
    document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [location.hash])

  return (
    <div className="relative">
      <Spotlight />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
