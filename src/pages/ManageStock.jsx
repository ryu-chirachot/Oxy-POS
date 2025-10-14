import React, { useMemo, useState } from 'react'
import { usePOSStore } from '../store'

export default function ManageStock() {
  const { items, updateStock, addProduct } = usePOSStore()
  const [query, setQuery] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  
  const filtered = useMemo(() => {
    return items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()) || i.category.toLowerCase().includes(query.toLowerCase()))
  }, [items, query])

  // Calculate stats
  const lowStock = items.filter(i => i.stock > 0 && i.stock <= 5)
  const outOfStock = items.filter(i => i.stock === 0)
  const topStock = [...items].sort((a, b) => b.stock - a.stock)[0]

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">📦 Manage Stock</h2>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="card p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">⚠️</div>
            <div>
              <div className="text-slate-600 text-sm font-medium">Low Stock Alert</div>
              <div className="text-3xl font-bold text-amber-600">{lowStock.length}</div>
            </div>
          </div>
          <div className="text-xs text-slate-600 mt-2">Items need restock soon</div>
          {lowStock.length > 0 && (
            <div className="mt-3 space-y-2">
              {lowStock.slice(0, 2).map(item => (
                <div key={item.id} className="text-xs bg-white/50 rounded-lg p-2 flex justify-between items-center">
                  <span className="font-medium truncate">{item.name}</span>
                  <span className="text-amber-600 font-bold ml-2">{item.stock}</span>
                </div>
              ))}
              {lowStock.length > 2 && (
                <div className="text-xs text-amber-600 font-medium">+{lowStock.length - 2} more...</div>
              )}
            </div>
          )}
        </div>

        <div className="card p-5 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">❌</div>
            <div>
              <div className="text-slate-600 text-sm font-medium">Out of Stock</div>
              <div className="text-3xl font-bold text-red-600">{outOfStock.length}</div>
            </div>
          </div>
          <div className="text-xs text-slate-600 mt-2">Items currently unavailable</div>
          {outOfStock.length > 0 && (
            <div className="mt-3 space-y-2">
              {outOfStock.slice(0, 2).map(item => (
                <div key={item.id} className="text-xs bg-white/50 rounded-lg p-2">
                  <span className="font-medium truncate">{item.name}</span>
                </div>
              ))}
              {outOfStock.length > 2 && (
                <div className="text-xs text-red-600 font-medium">+{outOfStock.length - 2} more...</div>
              )}
            </div>
          )}
        </div>

        <div className="card p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">⭐</div>
            <div>
              <div className="text-slate-600 text-sm font-medium">Top Stock Item</div>
              <div className="text-2xl font-bold text-green-600">{topStock?.name || '-'}</div>
            </div>
          </div>
          <div className="text-xs text-slate-600 mt-2">Highest stock quantity</div>
          {topStock && (
            <div className="mt-3">
              <div className="bg-white/70 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{topStock.img}</div>
                  <div className="text-xs text-slate-600">{topStock.category}</div>
                </div>
                <div className="text-green-600 font-bold text-xl">{topStock.stock} units</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <input className="input flex-1" placeholder="🔍 Search product or category..." value={query} onChange={e => setQuery(e.target.value)} />
          <button className="btn-gold" onClick={() => setShowAdd(true)}>+ Add Product</button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-600 bg-slate-50">
              <tr>
                <th className="text-left p-3 font-semibold">Image</th>
                <th className="text-left p-3 font-semibold">Product</th>
                <th className="text-left p-3 font-semibold">Category</th>
                <th className="text-right p-3 font-semibold">Price</th>
                <th className="text-right p-3 font-semibold">Quantity</th>
                <th className="text-left p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => {
                const status = i.stock === 0 ? 'Out of Stock' : i.stock <= 5 ? 'Low' : 'In Stock'
                const color = i.stock === 0 ? 'text-red-600' : i.stock <= 5 ? 'text-amber-600' : 'text-green-600'
                const bgColor = i.stock === 0 ? 'bg-red-50' : i.stock <= 5 ? 'bg-amber-50' : 'bg-green-50'
                return (
                  <tr key={i.id} className="border-t border-slate-200 hover:bg-blue-50/50 transition">
                    <td className="p-3">
                      <div className="text-3xl">{i.img}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-800">{i.name}</td>
                    <td className="p-3 text-slate-600">{i.category}</td>
                    <td className="p-3 text-right text-amber-600 font-semibold">฿{i.price.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      <input className="input w-24 text-right" type="number" value={i.stock} onChange={e => updateStock(i.id, e.target.value)} />
                    </td>
                    <td className="p-3">
                      <span className={`${color} ${bgColor} px-3 py-1 rounded-full text-xs font-medium`}>
                        {status}
                      </span>
                    </td>
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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card p-6 w-full max-w-md shadow-2xl">
        <div className="font-bold text-xl mb-4 text-slate-800">✨ Add New Product</div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1 font-medium">Product Name</label>
            <input className="input w-full" placeholder="e.g. Wagyu A5 Striploin 200g" value={name} onChange={e => setName(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm text-slate-600 mb-1 font-medium">Price (฿)</label>
            <input className="input w-full" placeholder="0.00" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm text-slate-600 mb-1 font-medium">Category</label>
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
            <label className="block text-sm text-slate-600 mb-1 font-medium">Stock Quantity</label>
            <input className="input w-full" placeholder="0" type="number" value={stock} onChange={e => setStock(parseInt(e.target.value)||0)} />
          </div>
          
          <div>
            <label className="block text-sm text-slate-600 mb-1 font-medium">Image (Emoji)</label>
            <input className="input w-full text-2xl text-center" placeholder="🧾" maxLength="2" value={img} onChange={e => setImg(e.target.value)} />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {Object.values(emojiOptions).map((emoji, idx) => (
                <button 
                  key={idx}
                  type="button"
                  className="btn px-3 py-2 text-2xl hover:scale-110 hover:bg-blue-50 transition"
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