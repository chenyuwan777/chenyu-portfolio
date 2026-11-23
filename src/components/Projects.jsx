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
  const filters = ['All', ...new Set(projects.map(project => project.group))]
  const visible = selected === 'All' ? projects : projects.filter(project => project.group === selected)
  return <section id="projects" tabIndex="-1" className="section projects-section">
    <div className="shell">
      <div className="section-head">
        <h2>Selected projects</h2>
        <div className="filters" role="group" aria-label="Filter projects">
          {filters.map(group => <button type="button" key={group} aria-pressed={selected === group} onClick={() => setSelected(group)}>{group}</button>)}
        </div>
      </div>
      <p role="status" className="sr-only">{visible.length} projects shown</p>
      <div className="project-grid grid sm:grid-cols-2">
        {visible.map(project => <article className="project-card" key={project.id}>
            <div className="card-art"><ProjectImage project={project}/></div>
            <div className="card-copy">
              <div className="card-meta"><span>{project.field}</span>{project.placeholder && <span className="placeholder-tag">Project placeholder</span>}</div>
              <h3><a className="card-link" href={projectUrl(project.id)}>{project.title}</a></h3>
              <p>{project.summary}</p>
              <span className="project-read" aria-hidden="true"><BookOpen size={15}/> Project details</span>
            </div>
        </article>)}
      </div>
    </div>
  </section>
}
