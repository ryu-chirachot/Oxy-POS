import React from 'react'
import { usePOSStore } from '../store'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function SalesSummary() {
  const { ordersToday, revenueToday, items, salesHistory } = usePOSStore()
  const top = [...items].sort((a,b)=>b.stock-a.stock)[0]
  const lowStock = items.filter(i => i.stock <= 5 && i.stock > 0)
  const outOfStock = items.filter(i => i.stock === 0)
  
  // Prepare data for charts
  const salesTrendData = salesHistory || [
    { day: 'Mon', sales: 4200 },
    { day: 'Tue', sales: 5800 },
    { day: 'Wed', sales: 3900 },
    { day: 'Thu', sales: 6500 },
    { day: 'Fri', sales: 7200 },
    { day: 'Sat', sales: 9100 },
    { day: 'Sun', sales: 8400 },
  ]
  
  // Category distribution
  const categoryData = Array.from(
    items.reduce((acc, item) => {
      const cat = item.category
      if (!acc.has(cat)) {
        acc.set(cat, { name: cat, value: 0 })
      }
      acc.get(cat).value += item.stock * item.price
      return acc
    }, new Map()).values()
  )
  
  // Top products by stock value
  const topProductsData = [...items]
    .sort((a, b) => (b.stock * b.price) - (a.stock * a.price))
    .slice(0, 5)
    .map(item => ({
      name: item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name,
      value: item.stock * item.price
    }))
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  
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
          <div className="space-y-2 max-h-64 overflow-y-auto">
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
          <div className="space-y-2 max-h-64 overflow-y-auto">
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

      <div className="card p-6 mb-6">
        <div className="font-bold text-lg mb-4 text-slate-800">📈 Sales Trend (Last 7 Days)</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              formatter={(value) => `฿${value.toLocaleString()}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
              name="Sales (฿)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <div className="font-bold text-lg mb-4 text-slate-800">🥧 Category Distribution</div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `฿${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="card p-6">
          <div className="font-bold text-lg mb-4 text-slate-800">📊 Top 5 Products by Stock Value</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="name" type="category" width={150} stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value) => `฿${value.toLocaleString()}`}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} name="Value (฿)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}