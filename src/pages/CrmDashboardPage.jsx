import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Sidebar from '../components/crm/Sidebar'
import Dashboard from '../components/crm/Dashboard'
import ProductManager from '../components/crm/ProductManager'
import BookingManager from '../components/crm/BookingManager'
import ReviewManager from '../components/crm/ReviewManager'
import OrderManager from '../components/crm/OrderManager'

export default function CrmDashboardPage() {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-rm-dark flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-rm-pink border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-rm-dark">
      <Sidebar />
      <main className="ml-64 p-8 pt-8">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="bookings" element={<BookingManager />} />
          <Route path="reviews" element={<ReviewManager />} />
          <Route path="orders" element={<OrderManager />} />
        </Routes>
      </main>
    </div>
  )
}
