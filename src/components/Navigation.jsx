import { useEffect, useRef, useState } from 'react'
import { Box, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { pageUrl } from '../lib/urls.js'
import { profile } from '../data/profile.js'

const sections = [
  { id: 'home', label: 'About' }, { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' }, { id: 'research', label: 'Research' },
]

function getDark() {
  const saved = document.documentElement.dataset.theme
  return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
}

function ThemeToggle() {
  const [dark, setDark] = useState(getDark)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => setDark(getDark())
    const syncStorage = (event) => {
      if (event.key && event.key !== 'cw-theme') return
      if (['light', 'dark'].includes(event.newValue)) document.documentElement.dataset.theme = event.newValue
      else delete document.documentElement.dataset.theme
      sync()
    }
    media.addEventListener('change', sync)
    window.addEventListener('storage', syncStorage)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('storage', syncStorage)
    }
  }, [])
  function toggle() {
    const next = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('cw-theme', next) } catch {}
    setDark(!dark)
  }
  const label = 'Switch to ' + (dark ? 'light' : 'dark') + ' mode'
  return <button type="button" className="icon-button" aria-label={label} title={label} onClick={toggle}>
    {dark ? <Sun size={19}/> : <Moon size={19}/>}
  </button>
}

export default function Navigation({ active, route }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  useEffect(() => { setOpen(false) }, [route])
  useEffect(() => {
    if (!open) return
    function close(event) {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])
  return <header className="topbar">
    <div className="shell nav-row">
      <a href={pageUrl('home')} className="brand" onClick={() => setOpen(false)} aria-label={profile.name + ', home'}>
        <span className="brand-sign"><Box size={22} strokeWidth={1.65}/></span>
        <span>{profile.name}</span>
      </a>
      <nav id="site-nav" className={'primary-nav' + (open ? ' is-open' : '')} aria-label="Main navigation">
        {sections.map(({ id, label }) => <a key={id} href={pageUrl(id)} aria-current={active === id ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="mobile-contact" href={pageUrl('contact')} aria-current={active === 'contact' ? 'page' : undefined} onClick={() => setOpen(false)}>Contact</a>
      </nav>
      <div className="nav-tools flex items-center gap-2">
        <ThemeToggle/>
        <a className="contact-nav" href={pageUrl('contact')} aria-current={active === 'contact' ? 'page' : undefined}><Mail size={15}/> Contact</a>
        <button type="button" ref={toggle} className="mobile-toggle icon-button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="site-nav" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={23}/> : <Menu size={23}/>}
        </button>
      </div>
    </div>
  </header>
}
