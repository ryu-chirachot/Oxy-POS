import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'

const Tab = ({ to, label }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`px-3 py-2 rounded-xl border ${active ? 'border-amber-500 text-amber-600 bg-amber-50' : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'}`}>
      {label}
    </Link>
  )
}

export default function NavBar() {
  const time = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <Link to="/" className="hover:opacity-80 transition">
          <img src={logo} alt="OXYFINE Logo" className="w-10 h-10 object-contain rounded-lg cursor-pointer" />
        </Link>
        <Link to="/" className="text-amber-600 text-2xl font-bold hover:text-amber-700 transition">
          OXYFINE Meat & More
        </Link>
        <div className="text-slate-500 text-sm hidden md:block"> • POS by Yotmanut</div>
      </div>
      <div className="text-slate-600 text-sm hidden md:block">{time}</div>
    </div>
  )
}