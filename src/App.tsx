import React, { useState, useEffect } from 'react'
import selection from './assets/icomoon/selection.json'
import './App.css'

interface Glyph {
  properties: {
    name: string
    tags?: string[]
  }
}

export default function App() {
  const glyphs = (selection as any).icons as Glyph[]
  const [filter, setFilter] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const filtered = glyphs.filter(g => {
    const terms = [
      g.properties.name,
      ...(g.properties.tags ?? [])
    ].map(t => t.toLowerCase())
    return terms.some(t => t.includes(filter.toLowerCase()))
  })

  const handleCopy = (name: string) => {
    const snippet = `<i class="icon icomoon icon-${name}"></i>`
    navigator.clipboard.writeText(snippet).then(() => {
      setToastMessage(`Copiado: icon-${name}`)
    })
  }

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 2000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  return (
    <div className="app-container">
      <h1 className="app-header">Ícones IcoMoon</h1>
      <input
        className="app-input"
        type="text"
        placeholder="Filtrar por nome ou keyword…"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />

      <div className="icon-grid">
        {filtered.map(g => (
          <div
            key={g.properties.name}
            className="icon-card"
            onClick={() => handleCopy(g.properties.name)}
          >
            <i className={`icon icomoon icon-${g.properties.name}`} />
            <div className="icon-name">{g.properties.name}</div>
          </div>
        ))}
      </div>

      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  )
}