import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useTheme } from '../hooks/useTheme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Note: deliberately not locking body scroll while the menu is open — it's a
  // short dropdown, not a full-screen takeover, and `overflow: hidden` on the
  // body races with the anchor-link scroll a nav click triggers, silently
  // dropping the scroll (the hash updates but the page never moves).

  function handleMobileNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isHome) return // cross-page: let the Link + Home's hash effect handle it
    e.preventDefault()
    setMenuOpen(false)
    // Wait for the menu's collapse animation (250ms) to finish before
    // scrolling: starting a smooth scroll while the menu height is still
    // animating shifts the page mid-flight and cancels the scroll entirely.
    window.setTimeout(() => {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
    }, 300)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-6xl items-center justify-between">
        {isHome ? (
          <a href="#top" className="font-display text-lg font-semibold tracking-tight text-fog">
            Ashrar<span className="text-gradient">.</span>
          </a>
        ) : (
          <Link to="/" className="font-display text-lg font-semibold tracking-tight text-fog">
            Ashrar<span className="text-gradient">.</span>
          </Link>
        )}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            isHome ? (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-mist transition-colors hover:text-fog">
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <Link to={`/${link.href}`} className="text-sm text-mist transition-colors hover:text-fog">
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mist transition-colors hover:border-violet hover:text-violet"
          >
            {theme === 'dark' ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {isHome ? (
            <a
              href="#contact"
              className="hidden rounded-full border border-line px-4 py-2 text-sm text-fog transition-colors hover:border-violet hover:text-violet md:inline-block"
            >
              Let&rsquo;s talk
            </a>
          ) : (
            <Link
              to="/#contact"
              className="hidden rounded-full border border-line px-4 py-2 text-sm text-fog transition-colors hover:border-violet hover:text-violet md:inline-block"
            >
              Let&rsquo;s talk
            </Link>
          )}

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fog md:hidden"
          >
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
          >
            {links.map((link) => (
              <li key={link.href} className="border-b border-line/60 last:border-none">
                <Link
                  to={isHome ? link.href : `/${link.href}`}
                  onClick={(e) => {
                    handleMobileNavClick(e, link.href)
                    if (!isHome) setMenuOpen(false)
                  }}
                  className="container-px mx-auto block py-4 text-base text-fog"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
