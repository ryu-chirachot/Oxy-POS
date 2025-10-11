import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideNav from './components/SideNav'
import Dashboard from './pages/Dashboard'
import NewOrder from './pages/NewOrder'
import ManageStock from './pages/ManageStock'
import SalesSummary from './pages/SalesSummary'
import Settings from './pages/Settings'
import AdminReservations from './pages/AdminReservations'

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="flex">
        <SideNav />
        <main className="flex-1 p-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/order" element={<NewOrder />} />
            <Route path="/stock" element={<ManageStock />} />
            <Route path="/sales" element={<SalesSummary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reservations" element={<AdminReservations />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}