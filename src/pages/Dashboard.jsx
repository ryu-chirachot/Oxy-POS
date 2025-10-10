import React from 'react'
import { usePOSStore } from '../store'

const Stat = ({ label, value }) => (
  <div className="card p-4">
    <div className="text-neutral-400 text-sm">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
)

export default function Dashboard() {
  const { ordersToday, revenueToday, items } = usePOSStore()
  const low = items.filter(i => i.stock <= 5).length
  return (
    <div className="p-4 grid gap-4 md:grid-cols-3">
      <Stat label="Orders Today" value={ordersToday} />
      <Stat label="Revenue Today" value={`฿${revenueToday.toLocaleString()}`} />
      <Stat label="Low Stock Alerts" value={low} />
      <div className="card p-4 md:col-span-3">
        <div className="font-semibold mb-2">Quick Actions</div>
        <div className="flex flex-wrap gap-2">
          <a href="#/order" className="btn-primary">New Order</a>
          <a href="#/stock" className="btn-gold">Manage Stock</a>
        </div>
      </div>
    </div>
  )
}
