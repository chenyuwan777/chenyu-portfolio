import { useState } from 'react'
import { resourceUrl } from '../lib/urls.js'

export default function ModelFigure({ figure, href, priority = false }) {
  const [selected, setSelected] = useState(0)
  const current = figure.views[selected]
  const strip = figure.layout === 'strip'

  return <figure className="model-figure">
    {strip ? <div className="view-strip" role="group" aria-label={figure.controls}>
      {figure.views.map((view, index) =>
        <button type="button" key={view.file} aria-label={view.label} aria-pressed={selected === index}
          onClick={() => setSelected(index)}>
          <img src={resourceUrl(view.file)} alt={view.alt} width="360" height="480"
            fetchPriority={priority && index === 0 ? 'high' : 'auto'}/>
          <span>{view.label}</span>
        </button>
      )}
    </div> : <img className="single-view" src={resourceUrl(current.file)} alt={current.alt}
      width="1320" height="940" loading="lazy"/>}
    <figcaption className="figure-caption">
      <div className="figure-description">
        <strong>{href ? <a href={href}>{figure.title}</a> : figure.title}</strong>
        <p>{figure.caption}</p>
      </div>
      {strip ? <span className="sr-only" aria-live="polite">{current.alt}</span>
        : <div className="model-switch" role="group" aria-label={figure.controls}>
          {figure.views.map((view, index) =>
            <button type="button" key={view.file} aria-pressed={selected === index}
              onClick={() => setSelected(index)}>{view.label}</button>
          )}
        </div>}
    </figcaption>
  </figure>
}
