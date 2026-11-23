import { BookOpen, PanelsTopLeft, Film } from 'lucide-react'
import { ProjectImage } from './Projects.jsx'
import { ResourceLinks } from './Resources.jsx'
import { resourceUrl } from '../lib/urls.js'

function ProjectMedia({ item }) {
  if (!item) return <p className="quiet-note"><Film size={16}/> Demonstration video pending.</p>
  return <figure className="project-media">
    {item.kind === 'video' && <video controls playsInline preload="none" poster={resourceUrl(item.poster)} aria-label={item.title}>
      <source src={resourceUrl(item.src)} type={item.type || 'video/mp4'}/>
      {item.captions && <track default kind="captions" src={resourceUrl(item.captions)} srcLang={item.lang || 'en'} label={item.language || 'English'}/>}
      <a href={resourceUrl(item.src)}>Download the demonstration video</a>
    </video>}
    {item.kind === 'embed' && <iframe loading="lazy" src={item.src} title={item.title} allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>}
    {item.kind === 'image' && <img src={resourceUrl(item.src)} alt={item.description || item.title} loading="lazy"/>}
    <figcaption><strong>{item.title}</strong>{item.description && <span>{item.description}</span>}</figcaption>
  </figure>
}
export default function ProjectDetail({ project }) {
  if (!project) return <main id="main-content" tabIndex="-1" className="shell missing-page">
    <h1>Project not found</h1><a className="button button-light" href="#projects">Browse projects</a>
  </main>
  return <main id="main-content" tabIndex="-1" className="detail-page">
    <div className="detail-top shell">
      <a className="back-link" href="#projects"><PanelsTopLeft size={17}/> All projects</a>
      <p className="eyebrow">{project.field}{project.placeholder ? ' / Project placeholder' : ''}</p>
      <h1>{project.title}</h1>
      <p className="detail-intro">{project.summary}</p>
      {project.technologies?.length > 0 && <ul className="tags" aria-label="Technologies used">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
    </div>
    <div className="detail-layout shell">
      <div className="detail-story">
        {project.placeholder && <aside className="placeholder-panel"><BookOpen size={21}/><div><strong>Project placeholder</strong><p>The illustration introduces the topic. Project methods, individual contributions, and measured results will appear here when available.</p></div></aside>}
        {project.problem && <section><h2>Problem & motivation</h2><p>{project.problem}</p></section>}
        {project.approach && <section><h2>Technical approach</h2><p>{project.approach}</p></section>}
        {project.contributions?.length > 0 && <section><h2>My contributions</h2><ul className="contributions">{project.contributions.map(item => <li key={item}>{item}</li>)}</ul></section>}
        {project.results?.length > 0 && <section><h2>Quantitative results</h2><dl className="results">{project.results.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>}
      </div>
      <aside className="detail-side" aria-label="Project media and resources">
        {project.media ? <ProjectMedia item={project.media}/> : <>
          <figure className="project-media"><ProjectImage project={project}/><figcaption>{project.imageAlt}</figcaption></figure>
          <ProjectMedia/>
        </>}
        <div className="detail-resources"><h2>Project links</h2><ResourceLinks resources={project.resources} pending/></div>
      </aside>
    </div>
  </main>
}
