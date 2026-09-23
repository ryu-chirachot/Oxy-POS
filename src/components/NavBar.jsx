import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import logo from '../assets/logo.jpg'
import { usePOSStore } from '../store'

export default function NavBar() {
  const navigate = useNavigate()
  const { user, logout } = usePOSStore()
  const time = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

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

      <div className="flex items-center gap-4">
        <div className="text-slate-600 text-sm hidden lg:block">{time}</div>

        {user ? (
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-base shadow-sm">
                {user.avatar || '👤'}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                <div className="text-[10px] text-amber-600 font-medium">{user.roleTitle || user.role}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 hover:border-red-200 transition"
              title="ออกจากระบบ"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn-gold text-xs py-1.5 px-3.5 flex items-center gap-1.5"
          >
            <User size={14} />
            <span>เข้าสู่ระบบ</span>
          </Link>
        )}
      </div>
    </div>
  )
}