import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Item = ({ to, label }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`block px-4 py-2 rounded-xl2 border ${active ? 'border-oxy-red text-oxy-red' : 'border-transparent hover:border-neutral-700'}`}>
      {label}
    </Link>
  )
}

export default function SideNav() {
  return (
    <aside className="hidden md:flex flex-col gap-2 w-56 p-3 border-r border-neutral-800 bg-neutral-950 sticky top-[60px] h-[calc(100vh-60px)]">
      <Item to="/" label="Dashboard" />
      <Item to="/order" label="New Order" />
      <Item to="/stock" label="Manage Stock" />
      <Item to="/sales" label="Sales Summary" />
      <Item to="/settings" label="Settings" />
    </aside>
  )
}
