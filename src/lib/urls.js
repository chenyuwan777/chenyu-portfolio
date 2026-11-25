import { sections, projectPath } from './pages.js'

// Every generated page knows the relative path back to this repository's site root.
const siteRoot = () => document.documentElement.dataset.root || './'

export function pageUrl(page) {
  return siteRoot() + sections[page].path
}

export function projectUrl(id) {
  return siteRoot() + projectPath(id)
}

export function legacyUrl(hash) {
  const key = hash.slice(1)
  if (key === 'about') return pageUrl('home')
  if (key === 'publications') return pageUrl('research') + '#publications'
  if (Object.hasOwn(sections, key)) return pageUrl(key)
  if (key.startsWith('project/')) {
    const id = key.slice('project/'.length)
    return /^[a-z0-9-]+$/.test(id) ? projectUrl(id) : undefined
  }
}

// Public asset paths, professional links, and old internal links in editable data.
export function resourceUrl(path) {
  if (!path) return undefined
  if (path.startsWith('#')) return legacyUrl(path) || path
  if (/^(https?:\/\/|mailto:)/i.test(path)) return path
  return siteRoot() + path.replace(/^\/+/, '')
}
