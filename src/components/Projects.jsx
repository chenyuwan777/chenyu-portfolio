import { useState } from 'react'
import { BookOpen, Image as ImageIcon } from 'lucide-react'
import { projects } from '../data/projects.js'
import { projectUrl, resourceUrl } from '../lib/urls.js'

export function ProjectImage({ project }) {
  return project.thumbnail
    ? <img src={resourceUrl(project.thumbnail)} alt={project.imageAlt || project.title} loading="lazy" width="1080" height="580"/>
    : <div className="media-placeholder"><ImageIcon size={25}/> Project image pending</div>
}

export default function Projects() {
  const [selected, setSelected] = useState('All')
  const groups = [...new Set(projects.map(project => project.group))]
  const visible = selected === 'All' ? projects : projects.filter(project => project.group === selected)
  return <main id="main-content" tabIndex="-1" className="interior-page projects-section">
    <div className="shell">
      <header className="page-heading">
        <h1>Selected AI projects</h1>
        {groups.length > 1 && <div className="filters" role="group" aria-label="Filter projects">
          {['All', ...groups].map(group => <button type="button" key={group} aria-pressed={selected === group} onClick={() => setSelected(group)}>{group}</button>)}
        </div>}
      </header>
      <p role="status" className="sr-only">{visible.length} projects shown</p>
      <div className="project-grid grid sm:grid-cols-2">
        {visible.map(project => <article className="project-card" key={project.id}>
            <div className="card-art"><ProjectImage project={project}/></div>
            <div className="card-copy">
              <div className="card-meta"><span>{project.field}</span>{project.placeholder && <span className="placeholder-tag">Project placeholder</span>}</div>
              <h2><a className="card-link" href={projectUrl(project.id)}>{project.title}</a></h2>
              <p>{project.summary}</p>
              <span className="project-read" aria-hidden="true"><BookOpen size={15}/> Project details</span>
            </div>
        </article>)}
      </div>
    </div>
  </main>
}
