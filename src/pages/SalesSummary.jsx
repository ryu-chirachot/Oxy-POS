import React from 'react'
import { usePOSStore } from '../store'

export default function SalesSummary() {
  const { ordersToday, revenueToday, items } = usePOSStore()
  const top = [...items].sort((a,b)=>b.stock-a.stock)[0]
  return (
    <div className="p-4 grid gap-4 md:grid-cols-3">
      <div className="card p-4">
        <div className="text-neutral-400 text-sm">Orders Today</div>
        <div className="text-2xl font-semibold mt-1">{ordersToday}</div>
      </div>
      <div className="card p-4">
        <div className="text-neutral-400 text-sm">Revenue Today</div>
        <div className="text-2xl font-semibold mt-1">฿{revenueToday.toLocaleString()}</div>
      </div>
      <div className="card p-4">
        <div className="text-neutral-400 text-sm">Top In-Stock Item</div>
        <div className="text-2xl font-semibold mt-1">{top?.name || '-'}</div>
      </div>

      <div className="card p-6 md:col-span-3">
        <div className="font-semibold mb-2">Charts (Placeholder)</div>
        <div className="text-sm text-neutral-400">You can integrate chart libraries (e.g., Recharts) later.</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="h-48 bg-neutral-900 rounded-xl2 border border-neutral-800 flex items-center justify-center">Line Chart</div>
          <div className="h-48 bg-neutral-900 rounded-xl2 border border-neutral-800 flex items-center justify-center">Pie Chart</div>
          <div className="h-48 bg-neutral-900 rounded-xl2 border border-neutral-800 flex items-center justify-center">Bar Chart</div>
        </div>
      </div>
    </div>
  )
}
