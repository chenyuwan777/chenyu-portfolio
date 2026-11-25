import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.js'
import { projects } from './src/data/projects.js'
import { sections, projectPath } from './src/lib/pages.js'

const pages = [
  ...Object.entries(sections).map(([key, section]) => ({ key, ...section })),
  ...projects.map(project => ({ key: 'project', projectId: project.id, path: projectPath(project.id), title: project.title, description: project.summary })),
]
const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function renderPage(template, page, root) {
  const values = {
    PAGE: page.key,
    PROJECT_ID: page.projectId || '',
    ROOT: root,
    TITLE: page.title ? page.title + ' | ' + profile.name : profile.seoTitle,
    DESCRIPTION: page.description || profile.description,
  }
  return template.replace(/__PROFILE_(PAGE|PROJECT_ID|ROOT|TITLE|DESCRIPTION)__/g, (_, key) => escapeHtml(values[key]))
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'portfolio-pages',
      transformIndexHtml: {
        order: 'pre',
        handler(html, context) {
          const cv = /^https?:\/\//i.test(profile.cv) ? profile.cv : '%BASE_URL%' + profile.cv.replace(/^\/+/, '')
          const template = html.replaceAll('__PROFILE_EMAIL__', escapeHtml(profile.email)).replaceAll('__PROFILE_CV__', escapeHtml(cv))
          if (!context.server) return template
          const root = context.server.config.base
          const location = new URL(context.originalUrl || context.path, 'http://localhost')
          const path = location.pathname.slice(root.length).replace(/index\.html$/, '').replace(/\/?$/, '/')
          const page = pages.find(entry => entry.path === path) || pages[0]
          return renderPage(template, page, root)
        },
      },
      generateBundle: {
        order: 'post',
        handler(_options, bundle) {
          const index = bundle['index.html']
          const template = String(index.source)
          for (const page of pages) {
            const depth = page.path.split('/').filter(Boolean).length
            const root = '../'.repeat(depth) || './'
            const html = renderPage(template, page, root).replace(/(\b(?:href|src)=")\.\//g, '$1' + root)
            if (!page.path) index.source = html
            else this.emitFile({ type: 'asset', fileName: page.path + 'index.html', source: html })
          }
        },
      },
    },
  ],
})
