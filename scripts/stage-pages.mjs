import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, resolve, sep } from 'node:path'

const git = (args, options = {}) => execFileSync('git', args, options)
const root = git(['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim()
process.chdir(root)
const inputs = ['src', 'public', 'scripts', 'index.html', 'vite.config.js', 'package.json', 'package-lock.json', '.nvmrc', '.gitignore']
if (process.argv.includes('--if-changed') && git(['diff', '--cached', '--name-only', '--', ...inputs]).length === 0) process.exit(0)
if (!existsSync('node_modules/vite/bin/vite.js')) throw new Error('Run npm ci before building the Pages snapshot.')

const snapshot = mkdtempSync(join(tmpdir(), 'chenyu-pages-'))
try {
  // Compile the staged sources so a partially staged edit cannot leak into the public site.
  const staged = git(['ls-files', '-z', '--', ...inputs])
  const prefix = snapshot.split(sep).join('/') + '/'
  git(['checkout-index', '-z', '--stdin', '--prefix=' + prefix], { input: staged })
  symlinkSync(resolve('node_modules'), join(snapshot, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir')
  for (const args of [['scripts/check-content.mjs'], ['node_modules/vite/bin/vite.js', 'build']]) {
    execFileSync(process.execPath, args, { cwd: snapshot, stdio: 'inherit' })
  }

  const output = join(snapshot, 'dist')
  const built = readdirSync(output, { recursive: true, withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => relative(output, join(entry.parentPath, entry.name)).split(sep).join('/'))
  const published = new Set(built.map(file => 'docs/' + file))
  const previous = git(['ls-files', '-z', '--', 'docs'], { encoding: 'utf8' }).split('\0').filter(Boolean)
  const obsolete = previous.filter(file => !published.has(file))
  mkdirSync('docs', { recursive: true })
  cpSync(output, 'docs', { recursive: true })
  for (const file of obsolete) rmSync(file, { force: true })
  git(['add', '-A', '--', ...published, ...obsolete])
  console.log('Staged ' + published.size + ' GitHub Pages files.')
} finally {
  rmSync(snapshot, { recursive: true, force: true })
}
