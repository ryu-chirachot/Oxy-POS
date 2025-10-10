import React, { useMemo, useState } from 'react'
import { usePOSStore } from '../store'

export default function ManageStock() {
  const { items, updateStock, addProduct } = usePOSStore()
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const filtered = useMemo(() => {
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  return (
    <div className="p-4">
      <div className="card p-4">
        <div className="flex items-center gap-2">
          <input className="input flex-1" placeholder="Search product or category..." value={query} onChange={e => setQuery(e.target.value)} />
          <button className="btn-gold" onClick={() => setShowAdd(true)}>Add Product</button>
        </div>
        <div className="overflow-auto mt-3">
          <table className="w-full text-sm">
            <thead className="text-neutral-400">
              <tr>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Quantity</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => {
                const status = i.stock === 0 ? 'Out of Stock' : i.stock <= 5 ? 'Low' : 'In Stock'
                const color = i.stock === 0 ? 'text-red-400' : i.stock <= 5 ? 'text-yellow-300' : 'text-green-400'
                return (
                  <tr key={i.id} className="border-t border-neutral-800">
                    <td className="p-2">{i.name}</td>
                    <td className="p-2">{i.category}</td>
                    <td className="p-2 text-right">
                      <input className="input w-24 text-right" type="number" value={i.stock} onChange={e => updateStock(i.id, e.target.value)} />
                    </td>
                    <td className={`p-2 ${color}`}>{status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddProductModal onClose={() => setShowAdd(false)} onAdd={addProduct} />
      )}
    </div>
  )
}

function AddProductModal({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Beef')
  const [stock, setStock] = useState(0)

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card p-4 w-full max-w-md">
        <div className="font-semibold mb-3">Add Product</div>
        <div className="space-y-2">
          <input className="input w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <input className="input w-full" placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
          <select className="input w-full" value={category} onChange={e => setCategory(e.target.value)}>
            <option>Beef</option>
            <option>Pork</option>
            <option>Drink</option>
            <option>Dessert</option>
          </select>
          <input className="input w-full" placeholder="Stock" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value)||0)} />
        </div>
        <div className="mt-4 flex gap-2 justify-end">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn-gold" onClick={() => { onAdd({ name, price: parseFloat(price)||0, category, stock, img: '🧾' }); onClose() }}>Add</button>
        </div>
      </div>
    </div>
  )
}
