import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { profile, modelFigure } from '../src/data/profile.js'
import { projects } from '../src/data/projects.js'
import { publications } from '../src/data/publications.js'

const publicRoot = new URL('../public/', import.meta.url)
const errors = []
function checkPath(path, label) {
  if (!path || /^(https?:\/\/|mailto:|#)/i.test(path)) return
  const target = new URL(path.replace(/^\/+/, ''), publicRoot)
  if (target.protocol !== 'file:' || !target.href.startsWith(publicRoot.href) || !existsSync(fileURLToPath(target))) {
    errors.push(label+' refers to a missing public file: '+path)
  }
}
function checkResources(resources = {}, label) {
  for (const key of ['code','paper','pdf','project']) checkPath(resources[key], label+' '+key)
  for (const item of resources.extras || []) checkPath(item.url, label+' '+item.label)
}

checkPath(profile.cv, 'CV')
checkPath(profile.portrait, 'Portrait')
for (const view of Object.values(modelFigure.views)) checkPath(view.file, 'Model figure')
const seen = new Set()
for (const item of projects) {
  if (!/^[a-z0-9-]+$/.test(item.id) || seen.has(item.id)) errors.push('Invalid or duplicate project ID: '+item.id)
  seen.add(item.id)
  checkPath(item.thumbnail, item.id+' thumbnail')
  if (item.media) {
    for (const key of ['src', 'poster', 'captions']) checkPath(item.media[key], item.id+' '+key)
  }
  checkResources(item.resources, item.id)
}
if (!seen.has(profile.research.projectId)) errors.push('The current research entry refers to an unknown project ID.')
for (const paper of publications) checkResources(paper.resources, paper.title)
if (errors.length) throw new Error('\n'+errors.join('\n'))
console.log('Checked public files and project references for '+projects.length+' projects.')
