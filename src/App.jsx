import { useLayoutEffect } from 'react'
import { profile } from './data/profile.js'
import { projects } from './data/projects.js'
import { legacyUrl } from './lib/urls.js'
import Home, { ContactPage, ExperiencePage, ResearchPage } from './components/Home.jsx'
import Navigation from './components/Navigation.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import Projects from './components/Projects.jsx'

const pageComponents = { home: Home, experience: ExperiencePage, projects: Projects, research: ResearchPage, contact: ContactPage }

export default function App() {
  const { page, projectId } = document.documentElement.dataset
  const Page = pageComponents[page] || Home
  const detail = page === 'project'
  const project = detail ? projects.find(entry => entry.id === projectId) : null

  useLayoutEffect(() => {
    function followFragment() {
      const { hash, search } = window.location
      if (page === 'home' && hash) {
        const target = legacyUrl(hash)
        if (target) {
          const destination = new URL(target, window.location.href)
          destination.search = search
          window.location.replace(destination.href)
          return
        }
      }
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    }
    followFragment()
    window.addEventListener('hashchange', followFragment)
    return () => window.removeEventListener('hashchange', followFragment)
  }, [page])

  return <>
    <a className="skip-link" href="#main-content" onClick={event => {
      event.preventDefault()
      const main = document.getElementById('main-content')
      main?.focus({ preventScroll: true })
      main?.scrollIntoView({ block: 'start' })
    }}>Skip to content</a>
    <Navigation active={detail ? 'projects' : page} route={page}/>
    {detail ? <ProjectDetail project={project}/> : <Page/>}
    <footer className="footer"><div className="shell footer-row"><span>{profile.name}</span><span>{profile.universityShort} <i aria-hidden="true">/</i> {profile.major}</span></div></footer>
  </>
}
