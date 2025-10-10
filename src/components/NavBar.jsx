import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Tab = ({ to, label }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`px-3 py-2 rounded-xl2 border ${active ? 'border-oxy-gold text-oxy-gold' : 'border-neutral-800 hover:border-oxy-gold/40'}`}>
      {label}
    </Link>
  )
}

export default function NavBar() {
  const time = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="text-oxy-gold text-xl font-semibold">OXYFINE Meat & More</div>
        <div className="text-neutral-400 text-sm hidden md:block"> • POS by Yotmanut</div>
      </div>
    </div>
  )
}
