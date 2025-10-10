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
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1">
        <div className="flex gap-2 mb-3">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`btn ${filter === c ? 'border-oxy-gold text-oxy-gold' : ''}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map(item => (
            <OrderItemCard key={item.id} item={item} onAdd={addToCart} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-96">
        <div className="card p-4 sticky top-[80px]">
          <div className="font-semibold mb-2">Current Order</div>
          <div className="space-y-2 max-h-[50vh] overflow-auto pr-1">
            {cart.length === 0 && <div className="text-neutral-500 text-sm">No items yet.</div>}
            {cart.map(c => (
              <div key={c.id} className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                <div className="flex-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-neutral-500">฿{c.price.toLocaleString()}</div>
                </div>
                <input type="number" min="1" value={c.qty} onChange={e => changeQty(c.id, parseInt(e.target.value)||1)} className="input w-16 text-center" />
                <button onClick={() => removeFromCart(c.id)} className="btn">Remove</button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-neutral-400">Total</div>
            <div className="text-oxy-gold text-xl font-semibold">฿{total.toLocaleString()}</div>
          </div>
          <button disabled={cart.length===0} onClick={() => setShowPay(true)} className="btn-primary w-full mt-3 disabled:opacity-50">Confirm Payment</button>
        </div>
      </div>

      {showPay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card p-4 w-full max-w-md">
            <div className="font-semibold mb-3">Payment</div>
            <div className="flex gap-2">
              {['cash','qr','card'].map(m => (
                <button key={m} onClick={() => setMethod(m)} className={`btn flex-1 capitalize ${method===m ? 'border-oxy-red text-oxy-red' : ''}`}>{m}</button>
              ))}
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button className="btn" onClick={() => setShowPay(false)}>Cancel</button>
              <button className="btn-gold" onClick={() => { confirmPayment(method); setShowPay(false) }}>Pay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
