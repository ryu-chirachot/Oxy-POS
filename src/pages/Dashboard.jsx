import React from 'react'
import { usePOSStore } from '../store'

const Stat = ({ label, value, icon, color }) => (
  <div className="card p-6 hover:scale-[1.02] transition">
    <div className="flex items-center justify-between mb-3">
      <div className="text-slate-600 text-sm font-medium">{label}</div>
      <div className={`text-3xl ${color}`}>{icon}</div>
    </div>
    <div className="text-3xl font-bold text-slate-800">{value}</div>
  </div>
)

export default function Dashboard() {
  const { ordersToday, revenueToday, items } = usePOSStore()
  const low = items.filter(i => i.stock <= 5).length
  const totalProducts = items.length
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">📊 Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's your business overview today.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Stat label="Orders Today" value={ordersToday} icon="🛍️" color="text-blue-500" />
        <Stat label="Revenue Today" value={`฿${revenueToday.toLocaleString()}`} icon="💰" color="text-green-500" />
        <Stat label="Low Stock Alerts" value={low} icon="⚠️" color="text-amber-500" />
        <Stat label="Total Products" value={totalProducts} icon="📦" color="text-purple-500" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <div className="font-semibold text-lg mb-4 text-slate-800">⚡ Quick Actions</div>
          <div className="flex flex-wrap gap-3">
            <a href="/order" className="btn-primary flex items-center gap-2">
              🛒 New Order
            </a>
            <a href="/stock" className="btn-gold flex items-center gap-2">
              📦 Manage Stock
            </a>
            <a href="/sales" className="btn flex items-center gap-2">
              💰 View Sales
            </a>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="font-semibold text-lg mb-4 text-slate-800">📊 Today's Summary</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-600">Total Orders</span>
              <span className="font-semibold text-slate-800">{ordersToday}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-600">Total Revenue</span>
              <span className="font-semibold text-green-600">฿{revenueToday.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-600">Avg. Order Value</span>
              <span className="font-semibold text-slate-800">
                ฿{ordersToday > 0 ? Math.round(revenueToday / ordersToday).toLocaleString() : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Items Need Restock</span>
              <span className={`font-semibold ${low > 0 ? 'text-red-600' : 'text-green-600'}`}>{low}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}