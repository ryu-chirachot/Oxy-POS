import React from 'react'
export default function OrderItemCard({ item, onAdd }) {
  return (
    <button onClick={() => onAdd(item)} className="card w-full text-left p-3 hover:scale-[1.01] transition">
      <div className="text-3xl">{item.img}</div>
      <div className="mt-2 font-semibold">{item.name}</div>
      <div className="text-neutral-400 text-sm">{item.category}</div>
      <div className="mt-1 text-oxy-gold font-semibold">฿{item.price.toLocaleString()}</div>
      <div className="text-xs text-neutral-500">Stock: {item.stock}</div>
    </button>
  )
}
