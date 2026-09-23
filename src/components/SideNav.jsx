import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { usePOSStore } from '../store'

const Item = ({ to, label }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={`block px-4 py-2.5 rounded-xl border transition ${active ? 'border-red-500 bg-red-50 text-red-600 font-semibold shadow-sm' : 'border-transparent hover:border-slate-300 hover:bg-slate-50 text-slate-700'}`}>
      {label}
    </Link>
  )
}

export default function SideNav() {
  const navigate = useNavigate()
  const { user, logout } = usePOSStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="hidden md:flex flex-col justify-between w-60 p-4 border-r border-slate-200 bg-white/60 backdrop-blur-sm sticky top-[73px] h-[calc(100vh-73px)]">
      <div className="flex flex-col gap-1.5 overflow-y-auto">
        <Item to="/" label="📊 Dashboard" />
        <Item to="/order" label="🛒 New Order" />
        <Item to="/stock" label="📦 Manage Stock" />
        <Item to="/ai-analytics" label="✨ Ai Analytics" />
        <Item to="/reservations" label="🍽️ Table Reservations" />
        <Item to="/receipt-history" label="🧾 Receipt History" />
        <Item to="/create-coupon" label="🎟️ Create Coupon" />
        <Item to="/settings" label="⚙️ Settings" />
      </div>

      {user && (
        <div className="pt-4 border-t border-slate-200 mt-2">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xl">{user.avatar || '👤'}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">{user.name}</div>
              <div className="text-[10px] text-amber-600 font-medium truncate">{user.roleTitle || user.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="ออกจากระบบ"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}