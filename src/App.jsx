import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'
import Dashboard from './pages/Dashboard'
import NewOrder from './pages/NewOrder'
import ManageStock from './pages/ManageStock'
import SalesSummary from './pages/SalesSummary'
import Settings from './pages/Settings'
import AdminReservations from './pages/AdminReservations'
import AdminDashboard from './components/AdminDashboard'
import AIAnalytics from './components/AIAnalytics'
import AdminReceiptHistory from './pages/AdminReceiptHistory'
import AdminCouponCreate from './pages/AdminCouponCreate'
import Login from './pages/Login'
import { usePOSStore } from './store'

export default function App() {
  const user = usePOSStore((state) => state.user)

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected POS Layout & Routes */}
      <Route
        path="/*"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : (
            <div className="min-h-screen">
              <NavBar />
              <div className="flex">
                <SideNav />
                <main className="flex-1 p-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/order" element={<NewOrder />} />
                    <Route path="/stock" element={<ManageStock />} />
                    <Route path="/sales" element={<SalesSummary />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/reservations" element={<AdminReservations />} />
                    <Route path="/ai-analytics" element={<AIAnalytics />} />
                    <Route path="/receipt-history" element={<AdminReceiptHistory />} />
                    <Route path="/create-coupon" element={<AdminCouponCreate />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          )
        }
      />
    </Routes>
  )
}