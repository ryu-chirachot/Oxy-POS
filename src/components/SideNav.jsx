import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Item = ({ to, label }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`block px-4 py-3 rounded-xl border ${active ? 'border-red-500 bg-red-50 text-red-600 font-semibold shadow-sm' : 'border-transparent hover:border-slate-300 hover:bg-slate-50'}`}>
      {label}
    </Link>
  )
}

export default function SideNav() {
  return (
    <aside className="hidden md:flex flex-col gap-2 w-56 p-4 border-r border-slate-200 bg-white/50 backdrop-blur-sm sticky top-[73px] h-[calc(100vh-73px)]">
      <Item to="/" label="📊 Dashboard" />
      <Item to="/order" label="🛒 New Order" />
      <Item to="/stock" label="📦 Manage Stock" />
      <Item to="/sales" label="💰 Sales Summary" />
      <Item to="/reservations" label="🍽️ Table Reservations" />
      <Item to="/settings" label="⚙️ Settings" />
    </aside>
  )
}