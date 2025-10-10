import React, { useState } from 'react'

export default function Settings() {
  const [tab, setTab] = useState('Users')
  return (
    <div className="p-4">
      <div className="card p-4">
        <div className="flex gap-2 mb-3">
          {['Users','Printers','Menu Categories'].map(t => (
            <button key={t} className={`btn ${tab===t ? 'border-oxy-gold text-oxy-gold':''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl2 p-4 min-h-[200px]">
          <div className="text-neutral-400">Selected: <span className="text-oxy-gold">{tab}</span></div>
          <div className="mt-2 text-sm text-neutral-500">Add your forms and configurations here.</div>
        </div>
      </div>
    </div>
  )
}
