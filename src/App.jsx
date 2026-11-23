import { useEffect, useLayoutEffect, useState } from 'react'
import { profile } from './data/profile.js'
import { projects } from './data/projects.js'
import Home from './components/Home.jsx'
import Navigation, { sections } from './components/Navigation.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'

const currentHash = () => window.location.hash.slice(1)
const homeSections = [...sections.map(section => section.id), 'contact']

export default function App() {
  const [route, setRoute] = useState(currentHash)
  const [active, setActive] = useState('about')
  const detail = route.startsWith('project/')
  const project = detail ? projects.find(entry => entry.id === route.slice('project/'.length)) : null

  useEffect(() => {
    function update() { setRoute(currentHash()) }
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  useLayoutEffect(() => {
    document.title = detail ? (project?.title || 'Project not found')+' | '+profile.name : profile.seoTitle
    if (!route) return
    const frame = requestAnimationFrame(() => {
      if (detail) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.getElementById('main-content')?.focus({ preventScroll: true })
      } else {
        const target = document.getElementById(homeSections.includes(route) ? route : 'about')
        target?.focus({ preventScroll: true })
        target?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [route, detail, project])

  useEffect(() => {
    if (detail) return
    let scheduled = 0
    function update() {
      scheduled = 0
      let current = 'about'
      for (const id of homeSections) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 125) current = id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'contact'
      setActive(current)
    }
    function schedule() { if (!scheduled) scheduled = requestAnimationFrame(update) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(scheduled)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [detail])

  return <>
    <a className="skip-link" href="#main-content" onClick={event => {
      event.preventDefault()
      const main = document.getElementById('main-content')
      main?.focus({ preventScroll: true })
      main?.scrollIntoView({ block: 'start' })
    }}>Skip to content</a>
    <Navigation active={detail ? 'projects' : active} route={route}/>
    {detail ? <ProjectDetail project={project}/> : <Home/>}
    <footer className="footer"><div className="shell footer-row"><span>{profile.name}</span><span>{profile.universityShort} <i aria-hidden="true">/</i> {profile.major}</span></div></footer>
  </>
}
