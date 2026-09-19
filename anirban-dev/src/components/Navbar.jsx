import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'

const links = [
  ['Work', '#work'],
  ['Journey', '#journey'],
  ['Certifications', '#certifications'],
  ['Stack', '#stack'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => localStorage.getItem('ak-theme') || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('ak-theme', theme)
  }, [theme])

  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <a className="brand" href="#top" aria-label="Back to top">
          <img src="/anirban-karmakar-logo.png" alt="Anirban Karmakar" />
        </a>

        <nav className="desktop-nav">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <div className="nav-actions">
          <a className="icon-button cv-button" href="/Anirban_Karmakar_Resume.pdf" download>
            <Download size={16} /> <span>CV</span>
          </a>
          <button
            className="icon-button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-button mobile-menu-button" onClick={() => setOpen(v => !v)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
