// Resource links may use fully qualified URLs or paths relative to public/.
export function resourceUrl(path) {
  if (!path) return undefined
  if (/^(https?:\/\/|mailto:|#)/i.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

export function projectUrl(id) {
  return '#project/' + encodeURIComponent(id)
}
