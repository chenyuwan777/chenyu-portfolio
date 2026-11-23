import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile } from './src/data/profile.js'

const pageTokens = {
  TITLE: profile.seoTitle,
  DESCRIPTION: profile.description,
  EMAIL: profile.email,
  CV: /^https?:\/\//i.test(profile.cv) ? profile.cv : '%BASE_URL%'+profile.cv.replace(/^\/+/, ''),
}
const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'profile-metadata',
      transformIndexHtml: {
        order: 'pre',
        handler: (html) => html.replace(/__PROFILE_(TITLE|DESCRIPTION|EMAIL|CV)__/g, (_, key) => escapeHtml(pageTokens[key])),
      },
    },
  ],
})
