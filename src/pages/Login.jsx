import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  KeyRound, 
  LogIn, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Delete, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { usePOSStore, DEMO_USERS } from '../store'
import logo from '../assets/logo.jpg'

export default function Login() {
  const navigate = useNavigate()
  const { user, login } = usePOSStore()

  // State
  const [loginMode, setLoginMode] = useState('pin') // 'pin' | 'password'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pin, setPin] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  // Handle Physical Keyboard for PIN pad when in PIN mode
  useEffect(() => {
    if (loginMode !== 'pin') return

    const handleKeyDown = (e) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        handlePinInput(e.key)
      } else if (e.key === 'Backspace') {
        handlePinDelete()
      } else if (e.key === 'Escape') {
        handlePinClear()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [loginMode, pin])

  // PIN Actions
  const handlePinInput = (digit) => {
    if (pin.length < 4) {
      const nextPin = pin + digit
      setPin(nextPin)
      setError('')
      if (nextPin.length === 4) {
        verifyPin(nextPin)
      }
    }
  }

  const handlePinDelete = () => {
    setPin((prev) => prev.slice(0, -1))
    setError('')
  }

  const handlePinClear = () => {
    setPin('')
    setError('')
  }

  // Verify PIN
  const verifyPin = (enteredPin) => {
    setLoading(true)
    setTimeout(() => {
      const matchedUser = DEMO_USERS.find((u) => u.pin === enteredPin)
      if (matchedUser) {
        setSuccessMsg(`ยินดีต้อนรับ ${matchedUser.name}`)
        setTimeout(() => {
          login(matchedUser)
          navigate('/')
        }, 500)
      } else {
        setError('รหัส PIN ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
        setPin('')
        setLoading(false)
      }
    }, 400)
  }

  // Handle Email/Password Login
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const matchedUser = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      )

      if (matchedUser) {
        setSuccessMsg(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ ${matchedUser.name}`)
        setTimeout(() => {
          login(matchedUser)
          navigate('/')
        }, 500)
      } else {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง (ลองตรวจสอบข้อมูลทดสอบด้านล่าง)')
        setLoading(false)
      }
    }, 500)
  }

  // Quick 1-Click Login for Demo Users
  const handleQuickLogin = (demoUser) => {
    setError('')
    setLoading(true)
    setSuccessMsg(`กำลังเข้าสู่ระบบในฐานะ ${demoUser.role}...`)
    setTimeout(() => {
      login(demoUser)
      navigate('/')
    }, 400)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-100">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 p-[2px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden p-2">
                <img
                  src={logo}
                  alt="OXYFINE Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-slate-950 ring-2 ring-emerald-500/20" title="System Online" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
            OXYFINE Meat & More
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            ระบบขายหน้าร้านและบริหารจัดการร้านอาหาร (POS)
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          {/* Mode Switch Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/70 rounded-2xl border border-slate-800/80 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginMode('pin')
                setError('')
              }}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                loginMode === 'pin'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound size={15} />
              <span>รหัส PIN ด่วน</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode('password')
                setError('')
              }}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                loginMode === 'password'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail size={15} />
              <span>อีเมล & รหัสผ่าน</span>
            </button>
          </div>

          {/* Feedback alerts */}
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-5 text-xs animate-shake">
              <AlertCircle size={16} className="shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl mb-5 text-xs">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* MODE 1: PIN Pad */}
          {loginMode === 'pin' && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-3">กดรหัส PIN 4 หลักเพื่อเข้าสู่ระบบ</p>
                {/* 4 Digit Visual Dots */}
                <div className="flex justify-center items-center gap-4 py-2">
                  {[0, 1, 2, 3].map((idx) => {
                    const isFilled = pin.length > idx
                    return (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                          isFilled
                            ? 'bg-amber-400 scale-125 shadow-lg shadow-amber-400/50'
                            : 'bg-slate-800 border border-slate-700'
                        }`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Numeric Keypad */}
              <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    disabled={loading || pin.length >= 4}
                    onClick={() => handlePinInput(digit)}
                    className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border border-slate-700/60 text-lg font-bold text-slate-100 hover:text-amber-400 transition-all shadow-sm focus:outline-none disabled:opacity-50"
                  >
                    {digit}
                  </button>
                ))}

                {/* Clear Button */}
                <button
                  type="button"
                  disabled={loading || pin.length === 0}
                  onClick={handlePinClear}
                  className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 active:scale-95 border border-slate-700/40 text-xs font-medium text-slate-400 hover:text-red-400 transition-all disabled:opacity-30"
                >
                  ล้าง (C)
                </button>

                {/* 0 Button */}
                <button
                  type="button"
                  disabled={loading || pin.length >= 4}
                  onClick={() => handlePinInput('0')}
                  className="h-14 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:scale-95 border border-slate-700/60 text-lg font-bold text-slate-100 hover:text-amber-400 transition-all shadow-sm disabled:opacity-50"
                >
                  0
                </button>

                {/* Backspace Button */}
                <button
                  type="button"
                  disabled={loading || pin.length === 0}
                  onClick={handlePinDelete}
                  className="h-14 rounded-2xl bg-slate-800/40 hover:bg-slate-800 active:scale-95 border border-slate-700/40 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-all disabled:opacity-30"
                  title="ลบตัวเลข"
                >
                  <Delete size={20} />
                </button>
              </div>
            </div>
          )}

          {/* MODE 2: Email & Password */}
          {loginMode === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  อีเมล (Email)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@oxyfine.com"
                    required
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-11 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-amber-500 focus:ring-amber-400"
                  />
                  <span>จดจำการเข้าสู่ระบบ</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('สำหรับระบบตัวอย่าง สามารถใช้รหัสผ่าน "password123" หรือคลิกปุ่มเข้าสู่ระบบด่วนด้านล่างได้ทันทีครับ')}
                  className="text-amber-400 hover:underline hover:text-amber-300"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-sm shadow-lg shadow-amber-500/20 active:scale-[0.99] transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>กำลังตรวจสอบ...</span>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>เข้าสู่ระบบ</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Accounts (One-Click) */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                บัญชีทดสอบด่วน (1-Click Login)
              </span>
              <span className="text-[10px] text-slate-500">แตะเพื่อเข้าใช้งาน</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  disabled={loading}
                  onClick={() => handleQuickLogin(demo)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/50 text-left transition group active:scale-[0.98]"
                >
                  <span className="text-2xl p-1 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                    {demo.avatar}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition truncate">
                      {demo.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {demo.roleTitle}
                    </div>
                    <div className="text-[10px] text-amber-500/80 mt-0.5 font-mono">
                      PIN: {demo.pin}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-xs text-slate-500 space-y-1">
          <p>© 2026 OXYFINE Meat & More POS • Version 1.0.0</p>
          <p className="text-[11px] text-slate-600">
            ระบบความปลอดภัยมาตรฐานสำหรับร้านอาหารและจุดชำระเงิน
          </p>
        </div>
      </div>
    </div>
  )
}
