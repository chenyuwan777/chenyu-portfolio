import { useState } from 'react'
import { Box, Layers3, Scan, ScanLine } from 'lucide-react'
import { resourceUrl } from '../lib/urls.js'
import { modelFigure } from '../data/profile.js'

export default function ModelFigure() {
  const [mode, setMode] = useState('surface')
  const current = modelFigure.views[mode]
  return <figure className="model-figure">
    <div className="model-canvas">
      <img src={resourceUrl(current.file)} alt={current.alt} width="1320" height="940" fetchPriority="high"/>
      <div className="model-label"><ScanLine size={15}/> {modelFigure.label}</div>
      <div className="model-corner" aria-hidden="true">+</div>
      <div className="model-bottom">
        <div className="model-title">{modelFigure.title}</div>
        <div className="model-switch" role="group" aria-label="Model representation">
          {Object.entries(modelFigure.views).map(([key, view]) => <button type="button" key={key}
            aria-pressed={mode === key} onClick={() => setMode(key)}>
            {key === 'surface' ? <Layers3 size={14}/> : <Scan size={14}/>} {view.label}
          </button>)}
        </div>
      </div>
    </div>
    <figcaption><Box size={14}/> {modelFigure.caption}</figcaption>
  </figure>
}
