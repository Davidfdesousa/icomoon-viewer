import React, { useState } from 'react'
import selection from './assets/icomoon/selection.json'

interface Glyph {
  properties: { name: string }
}

export default function App() {
  const glyphs = (selection as any).icons as Glyph[]
  const [filter, setFilter] = useState('')

  const filtered = glyphs.filter(g =>
    g.properties.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Ícones IcoMoon</h1>
      <input
        type="text"
        placeholder="Filtrar por nome…"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{
          width: '100%',
          padding: 8,
          margin: '16px 0',
          fontSize: 16,
          boxSizing: 'border-box'
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
          gap: 12
        }}
      >
        {filtered.map(g => (
          <div
            key={g.properties.name}
            style={{
              textAlign: 'center',
              padding: 8,
              border: '1px solid #ddd',
              borderRadius: 4
            }}
          >
            <i
              className={`icon icomoon icon-${g.properties.name}`}
              style={{ fontSize: 24 }}
            />
            <div style={{ fontSize: 12, marginTop: 4 }}>
              {g.properties.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
