import { BookOpen, Code2, Download, Link2, FileText, FolderOpen, Github, GraduationCap, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/profile.js'
import { resourceUrl } from '../lib/urls.js'

const profiles = [
  { key: 'github', label: 'GitHub', Icon: Github },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'scholar', label: 'Google Scholar', Icon: GraduationCap },
]

export function Profiles({ compact = false }) {
  const available = compact ? profiles.filter(({ key }) => profile.social[key]) : profiles
  return <ul className="profiles" aria-label="Professional profiles">
    {compact && <li><a href={'mailto:'+profile.email}><Mail size={17}/> Email</a></li>}
    {available.map(({ key, label, Icon }) => <li key={key}>
      {profile.social[key]
        ? <a href={profile.social[key]}><Icon size={17}/> {label}</a>
        : <span className="pending-link"><Icon size={17}/> {label} <small>Link pending</small></span>}
    </li>)}
  </ul>
}

export function CvLink({ className = 'button button-light' }) {
  return <a className={className} href={resourceUrl(profile.cv)} download><Download size={17}/> Download CV</a>
}

export function ResourceLinks({ resources = {}, pending = false }) {
  const entries = [
    { label: 'Paper', url: resources.paper, Icon: BookOpen },
    { label: 'PDF', url: resources.pdf, Icon: FileText },
    { label: resources.codeLabel || 'Code', url: resources.code, Icon: Code2 },
    { label: 'Project page', url: resources.project, Icon: FolderOpen },
    ...(resources.extras || []).map(item => ({ ...item, Icon: Link2 })),
  ].filter(item => item.url)
  return <div className="resource-block">
    {entries.length > 0 && <ul className="resources flex flex-wrap gap-3">{entries.map(({label,url,Icon}) =>
      <li key={label}><a className="resource-link" href={resourceUrl(url)}><Icon size={16}/>{label}</a></li>)}</ul>}
    {pending && (!resources.code || !resources.paper) && <p className="quiet-note">
      {(!resources.code && !resources.paper) ? 'Public code and paper links have not been added.' : (!resources.code ? 'Public code link pending.' : 'Paper link pending.')}
    </p>}
  </div>
}
