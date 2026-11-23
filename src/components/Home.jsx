import { BookOpen, Mail, MapPin, Microscope, PanelsTopLeft, ScrollText } from 'lucide-react'
import { profile } from '../data/profile.js'
import { publications } from '../data/publications.js'
import { experience } from '../data/experience.js'
import { projects } from '../data/projects.js'
import { resourceUrl, projectUrl } from '../lib/urls.js'
import { CvLink, Profiles, ResourceLinks } from './Resources.jsx'
import ModelFigure from './ModelFigure.jsx'
import Projects from './Projects.jsx'

function Avatar() {
  return profile.portrait
    ? <img className="avatar" src={resourceUrl(profile.portrait)} alt={'Portrait of '+profile.name} width="42" height="42"/>
    : <span className="avatar avatar-initials" role="img" aria-label={'Profile photo placeholder for '+profile.name} title="Profile photo placeholder">{profile.initials}</span>
}

function About() {
  return <section id="about" className="hero-section" tabIndex="-1" aria-labelledby="hero-name">
    <div className="shell hero-grid">
      <div className="hero-copy">
        <div className="identity-line"><Avatar/><span>{profile.role}<i aria-hidden="true">/</i>{profile.universityShort}</span></div>
        <h1 id="hero-name">{profile.name}</h1>
        <p className="hero-lead">{profile.intro}</p>
        <p className="hero-body">{profile.about}</p>
        <div className="hero-actions flex flex-wrap gap-3">
          <a className="button button-primary" href="#projects"><PanelsTopLeft size={17}/> Explore projects</a>
          <CvLink/>
        </div>
        <Profiles compact/>
      </div>
      <ModelFigure/>
    </div>
  </section>
}

function Research() {
  const work = profile.research
  const project = projects.find(item => item.id === work.projectId)
  return <section id="research" className="section" tabIndex="-1">
    <div className="shell research-layout">
      <div>
        <h2>Research</h2>
        <div className="research-focus">
          <p className="eyebrow"><Microscope size={16}/> Current focus</p>
          <h3>{work.title}</h3>
          <p>{work.description}</p><p>{work.current}</p>
          {project && <a className="text-link" href={projectUrl(project.id)}><BookOpen size={16}/> {project.title} project page</a>}
        </div>
      </div>
      <aside className="interest-panel"><h3>Research interests</h3>
        <ul>{profile.interests.map(interest => <li key={interest}><span aria-hidden="true"/>{interest}</li>)}</ul>
      </aside>
    </div>
  </section>
}

function Publications() {
  return <section id="publications" className="section" tabIndex="-1">
    <div className="shell split-section">
      <h2>Publications</h2>
      {publications.length ? <ol className="publication-list">{publications.map(pub =>
        <li key={pub.id}><article>
          <div className="entry-meta">{[pub.year, pub.status].filter(Boolean).join(' / ')}</div>
          <h3>{pub.title}</h3>
          <p>{pub.authors?.join(', ')}</p>
          {pub.venue && <p><em>{pub.venue}</em></p>}
          <ResourceLinks resources={pub.resources}/>
        </article></li>)}</ol> : <div className="empty-publications"><ScrollText size={24}/><p>No publications listed yet.</p></div>}
    </div>
  </section>
}

function Experience() {
  return <section id="experience" className="section" tabIndex="-1">
    <div className="shell split-section">
      <div><h2>Experience</h2></div>
      <ol className="experience-list">{experience.map(item => <li key={item.organization+item.role}>
        <p className="entry-meta">{item.period}</p><h3>{item.role}</h3>
        <p className="organization">{item.organization}</p><p className="experience-description">{item.description}</p>
      </li>)}</ol>
    </div>
  </section>
}

function Contact() {
  return <section id="contact" className="section contact-section" tabIndex="-1">
    <div className="shell contact-layout">
      <div><p className="eyebrow"><MapPin size={15}/> {profile.location}</p><h2>Get in touch</h2>
        <p className="contact-copy">{profile.contact}</p>
        <a className="email-link" href={'mailto:'+profile.email}><Mail size={21}/>{profile.email}</a>
      </div>
      <div className="contact-resources"><CvLink/><Profiles/></div>
    </div>
  </section>
}

export default function Home() {
  return <main id="main-content" tabIndex="-1"><About/><Projects/><Research/><Publications/><Experience/><Contact/></main>
}
