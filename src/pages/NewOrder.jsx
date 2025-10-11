import React, { useMemo, useState } from 'react'
import { usePOSStore } from '../store'
import OrderItemCard from '../components/OrderItemCard'

export default function NewOrder() {
  const { items, filter, setFilter, cart, addToCart, removeFromCart, changeQty, confirmPayment } = usePOSStore()
  const [showPay, setShowPay] = useState(false)
  const [method, setMethod] = useState('cash')

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))]
  const filtered = useMemo(() => filter === 'All' ? items : items.filter(i => i.category === filter), [items, filter])
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0)

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">🛒 New Order</h2>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`btn whitespace-nowrap ${filter === c ? 'border-amber-500 text-amber-600 bg-amber-50 font-semibold' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(item => (
            <OrderItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-96">
        <div className="card p-5 sticky top-[90px]">
          <div className="font-bold text-lg mb-3 text-slate-800">🧾 Current Order</div>
          <div className="space-y-2 max-h-[50vh] overflow-auto pr-1">
            {cart.length === 0 && (
              <div className="text-slate-400 text-sm text-center py-8 bg-slate-50 rounded-xl">
                No items yet. Start adding products! 🛍️
              </div>
            )}
            {cart.map(c => (
              <div key={c.id} className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div className="flex-1">
                  <div className="font-medium text-slate-800">{c.name}</div>
                  <div className="text-xs text-amber-600 font-semibold">฿{c.price.toLocaleString()} × {c.qty}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => changeQty(c.id, c.qty - 1)} 
                    className="btn px-2 py-1 text-sm"
                    disabled={c.qty <= 1}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={c.qty} 
                    onChange={e => changeQty(c.id, parseInt(e.target.value)||1)} 
                    className="input w-14 text-center py-1 text-sm"
                  />
                  <button 
                    onClick={() => changeQty(c.id, c.qty + 1)} 
                    className="btn px-2 py-1 text-sm"
                  >
                    +
                  </button>
                  <button onClick={() => removeFromCart(c.id)} className="btn px-2 py-1 text-sm text-red-600 hover:bg-red-50">
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {cart.length > 0 && (
            <div className="mt-4 pt-4 border-t-2 border-slate-300">
              <div className="flex items-center justify-between mb-4">
                <div className="text-slate-600 font-medium">Total</div>
                <div className="text-amber-600 text-2xl font-bold">฿{total.toLocaleString()}</div>
              </div>
              <button 
                onClick={() => setShowPay(true)} 
                className="btn-primary w-full text-lg py-3"
              >
                💳 Confirm Payment
              </button>
            </div>
          )}
        </div>
      </div>

      {showPay && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card p-6 w-full max-w-md shadow-2xl">
            <div className="font-bold text-xl mb-4 text-slate-800">💳 Payment Method</div>
            <div className="mb-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Amount</span>
                <span className="text-2xl font-bold text-amber-600">฿{total.toLocaleString()}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { id: 'cash', label: 'Cash', icon: '💵' },
                { id: 'qr', label: 'QR Code', icon: '📱' },
                { id: 'card', label: 'Card', icon: '💳' }
              ].map(m => (
                <button 
                  key={m.id} 
                  onClick={() => setMethod(m.id)} 
                  className={`btn flex-col py-4 ${method === m.id ? 'border-red-500 bg-red-50 text-red-600 font-semibold shadow-md' : ''}`}
                >
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="text-xs">{m.label}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="btn flex-1" onClick={() => setShowPay(false)}>Cancel</button>
              <button 
                className="btn-gold flex-1" 
                onClick={() => { 
                  confirmPayment(method)
                  setShowPay(false)
                  alert(`✅ Payment successful!\nMethod: ${method}\nTotal: ฿${total.toLocaleString()}`)
                }}
              >
                ✓ Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}