import { ArrowUpRight, BookOpen, GraduationCap, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/profile.js'
import { publications } from '../data/publications.js'
import { experience } from '../data/experience.js'
import { projects } from '../data/projects.js'
import { pageUrl, resourceUrl, projectUrl } from '../lib/urls.js'
import { CvLink, Profiles, ResourceLinks } from './Resources.jsx'
import ModelFigure from './ModelFigure.jsx'

const focusProject = projects.find(project => project.id === profile.research.projectId)

function Avatar() {
  return profile.portrait
    ? <img className="avatar" src={resourceUrl(profile.portrait)} alt={'Portrait of '+profile.name} width="689" height="965"/>
    : <span className="avatar avatar-initials" aria-hidden="true">{profile.initials}</span>
}

function Education() {
  const education = profile.education
  return <section className="education-block" aria-labelledby="education-heading">
    <h2 id="education-heading"><GraduationCap size={22} aria-hidden="true"/> Education</h2>
    <h3>{profile.university}</h3>
    <p>{education.degree}</p>
    <p>{education.minor}</p>
    <p className="entry-meta">{education.period}</p>
    <dl className="education-facts"><div><dt>GPA</dt><dd>{education.gpa}</dd></div>
      <div><dt>Honors</dt><dd>{education.honors}</dd></div></dl>
  </section>
}

export default function Home() {
  return <main id="main-content" tabIndex="-1">
    <section className="hero-section" aria-labelledby="hero-name">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="hero-identity">
            <Avatar/>
            <div>
              <p className="identity-line">{profile.role}<i aria-hidden="true">/</i>{profile.universityShort}</p>
              <h1 id="hero-name">{profile.name}</h1>
            </div>
          </div>
          <p className="hero-lead">{profile.intro}</p><p className="hero-body">{profile.about}</p>
          <div className="hero-actions flex flex-wrap gap-3">
            <a className="button button-primary" href={pageUrl('projects')}>View projects <ArrowUpRight size={16}/></a><CvLink/>
          </div>
          <Profiles compact/>
        </div>
        {focusProject?.figure && <ModelFigure figure={focusProject.figure} href={projectUrl(focusProject.id)} priority/>}
      </div>
    </section>
    <div className="shell home-background">
      <Education/>
      <section className="home-research"><h2>Current research</h2><h3>{profile.research.title}</h3>
        <p>{profile.research.description}</p>
        <a className="text-link" href={pageUrl('research')}>Explore my research <ArrowUpRight size={15}/></a>
      </section>
    </div>
  </main>
}

export function ResearchPage() {
  const work = profile.research
  return <main id="main-content" tabIndex="-1" className="interior-page shell">
    <header className="page-heading"><h1>Research</h1></header>
    <div className="research-layout research-page-body">
      <article className="research-focus"><p className="eyebrow">Robot learning</p><h2>{work.title}</h2>
        <p>{work.description}</p><p>{work.current}</p>
        {focusProject && <a className="text-link" href={projectUrl(focusProject.id)}><BookOpen size={16}/> {focusProject.title} project page</a>}
      </article>
      <aside className="interest-panel"><h3>Research interests</h3>
        <ul>{profile.interests.map(interest => <li key={interest}><span aria-hidden="true"/>{interest}</li>)}</ul></aside>
    </div>
    {publications.length > 0 && <section id="publications" className="section split-section">
      <h2>Publications</h2><ol className="publication-list">{publications.map(pub => <li key={pub.id}><article>
        <div className="entry-meta">{[pub.year,pub.status].filter(Boolean).join(' / ')}</div><h3>{pub.title}</h3>
        <p>{pub.authors?.join(', ')}</p>{pub.venue && <p><em>{pub.venue}</em></p>}<ResourceLinks resources={pub.resources}/>
      </article></li>)}</ol>
    </section>}
  </main>
}

export function ExperiencePage() {
  return <main id="main-content" tabIndex="-1" className="interior-page shell">
    <header className="page-heading"><h1>Experience</h1><CvLink/></header>
    <div className="career-layout"><div>
      {['Research', 'Industry'].map(category => <section className="career-group" key={category}>
        <h2>{category}</h2>
        <ol className="experience-list">{experience.filter(item => item.category === category).map(item =>
          <li key={item.organization+item.role}><article>
            <p className="entry-meta">{item.period}{item.location && <><span aria-hidden="true">·</span>{item.location}</>}</p>
            <h3>{item.role}</h3><p className="organization">{item.organization}</p>
            {item.description && <p className="experience-description">{item.description}</p>}
            {item.highlights?.length > 0 && <ul className="contributions career-highlights">{item.highlights.map(point => <li key={point}>{point}</li>)}</ul>}
          </article></li>)}</ol>
      </section>)}
    </div><aside className="career-aside">
      <Education/>
      <section className="skill-list"><h2>Technical skills</h2><dl>{profile.skills.map(group =>
        <div key={group.label}><dt>{group.label}</dt><dd>{group.items.join(', ')}</dd></div>)}</dl></section>
    </aside></div>
  </main>
}

export function ContactPage() {
  return <main id="main-content" tabIndex="-1" className="interior-page shell">
    <header className="page-heading"><h1>Contact</h1></header>
    <div className="contact-layout contact-page-body">
      <section><p className="eyebrow"><MapPin size={15}/>{profile.location}</p><h2>Get in touch</h2>
        <p className="contact-copy">{profile.contact}</p>
        <a className="email-link" href={'mailto:'+profile.email}><Mail size={20}/>{profile.email}</a></section>
      <div className="contact-resources"><CvLink/><Profiles/></div>
    </div>
  </main>
}
