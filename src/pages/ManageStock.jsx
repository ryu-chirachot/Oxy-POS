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
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Category</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">Quantity</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => {
                const status = i.stock === 0 ? 'Out of Stock' : i.stock <= 5 ? 'Low' : 'In Stock'
                const color = i.stock === 0 ? 'text-red-400' : i.stock <= 5 ? 'text-yellow-300' : 'text-green-400'
                return (
                  <tr key={i.id} className="border-t border-neutral-800 hover:bg-neutral-900/50">
                    <td className="p-2">
                      <div className="text-3xl">{i.img}</div>
                    </td>
                    <td className="p-2 font-medium">{i.name}</td>
                    <td className="p-2">{i.category}</td>
                    <td className="p-2 text-right text-oxy-gold">฿{i.price.toLocaleString()}</td>
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
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [img, setImg] = useState('🧾')

  const categoryOptions = ['Beef', 'Pork', 'Chicken', 'Seafood', 'Drink', 'Dessert', 'Side Dish']
  const emojiOptions = {
    'Beef': '🥩',
    'Pork': '🥓',
    'Chicken': '🍗',
    'Seafood': '🦞',
    'Drink': '🍸',
    'Dessert': '🍰',
    'Side Dish': '🥗'
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card p-6 w-full max-w-md">
        <div className="font-semibold text-lg mb-4">Add New Product</div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Product Name</label>
            <input className="input w-full" placeholder="e.g. Wagyu A5 Striploin 200g" value={name} onChange={e => setName(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Price (฿)</label>
            <input className="input w-full" placeholder="0.00" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Category</label>
            <select 
              className="input w-full" 
              value={category} 
              onChange={e => {
                setCategory(e.target.value)
                setImg(emojiOptions[e.target.value] || '🧾')
              }}
            >
              <option value="" disabled>-- Select Category --</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Stock Quantity</label>
            <input className="input w-full" placeholder="0" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value)||0)} />
          </div>
          
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Image (Emoji)</label>
            <input className="input w-full text-2xl text-center" placeholder="🧾" maxLength="2" value={img} onChange={e => setImg(e.target.value)} />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {Object.values(emojiOptions).map((emoji, idx) => (
                <button 
                  key={idx}
                  type="button"
                  className="btn px-3 py-2 text-2xl hover:scale-110 transition"
                  onClick={() => setImg(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-2 justify-end">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button 
            className="btn-gold" 
            onClick={() => { 
              if (!name || !price || !category) {
                alert('Please fill all required fields')
                return
              }
              onAdd({ name, price: parseFloat(price)||0, category, stock, img })
              onClose()
            }}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}