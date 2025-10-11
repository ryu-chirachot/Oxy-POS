import React from 'react'
import { usePOSStore } from '../store'

export default function SalesSummary() {
  const { ordersToday, revenueToday, items } = usePOSStore()
  const top = [...items].sort((a,b)=>b.stock-a.stock)[0]
  const lowStock = items.filter(i => i.stock <= 5 && i.stock > 0)
  const outOfStock = items.filter(i => i.stock === 0)
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">💰 Sales Summary</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">🛍️</div>
            <div>
              <div className="text-slate-600 text-sm font-medium">Orders Today</div>
              <div className="text-3xl font-bold text-slate-800 mt-1">{ordersToday}</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">Total orders processed today</div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">💵</div>
            <div>
              <div className="text-slate-600 text-sm font-medium">Revenue Today</div>
              <div className="text-3xl font-bold text-green-600 mt-1">฿{revenueToday.toLocaleString()}</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">Total sales revenue</div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-4xl">⭐</div>
            <div>
              <div className="text-slate-600 text-sm font-medium">Top In-Stock Item</div>
              <div className="text-xl font-bold text-slate-800 mt-1">{top?.name || '-'}</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-2">{top ? `${top.stock} units available` : 'No data'}</div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">⚠️ Low Stock Items</h3>
          <div className="space-y-2">
            {lowStock.length === 0 ? (
              <div className="text-slate-400 text-sm text-center py-4 bg-slate-50 rounded-xl">
                All items well stocked! 🎉
              </div>
            ) : (
              lowStock.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{item.img}</div>
                    <div>
                      <div className="font-medium text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-amber-600 font-bold">{item.stock} left</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4 text-slate-800">❌ Out of Stock</h3>
          <div className="space-y-2">
            {outOfStock.length === 0 ? (
              <div className="text-slate-400 text-sm text-center py-4 bg-slate-50 rounded-xl">
                No items out of stock! ✅
              </div>
            ) : (
              outOfStock.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl opacity-50">{item.img}</div>
                    <div>
                      <div className="font-medium text-slate-800">{item.name}</div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-red-600 font-bold text-sm">Out</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="font-bold text-lg mb-4 text-slate-800">📊 Analytics Charts</div>
        <div className="text-sm text-slate-500 mb-4">You can integrate chart libraries (e.g., Recharts) for detailed analytics.</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <div className="font-semibold text-blue-700">Line Chart</div>
              <div className="text-xs text-blue-600 mt-1">Sales Trend</div>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <div className="font-semibold text-green-700">Pie Chart</div>
              <div className="text-xs text-green-600 mt-1">Category Distribution</div>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="font-semibold text-purple-700">Bar Chart</div>
              <div className="text-xs text-purple-600 mt-1">Top Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}