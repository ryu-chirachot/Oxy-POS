import React from 'react'

export default function OrderItemCard({ item, onAdd }) {
  const isLowStock = item.stock <= 5
  const isOutOfStock = item.stock === 0
  
  return (
    <button 
      onClick={() => !isOutOfStock && onAdd(item)} 
      disabled={isOutOfStock}
      className={`card w-full text-left p-4 transition-all ${
        isOutOfStock 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]'
      }`}
    >
      <div className="text-4xl mb-2">{item.img}</div>
      <div className="mt-2 font-semibold text-slate-800">{item.name}</div>
      <div className="text-slate-500 text-xs mt-1">{item.category}</div>
      <div className="mt-2 text-amber-600 text-lg font-bold">฿{item.price.toLocaleString()}</div>
      <div className={`text-xs mt-1 font-medium ${
        isOutOfStock ? 'text-red-600' : isLowStock ? 'text-amber-600' : 'text-green-600'
      }`}>
        {isOutOfStock ? '❌ Out of Stock' : `📦 Stock: ${item.stock}`}
      </div>
    </button>
  )
}