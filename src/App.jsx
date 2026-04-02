import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import DevisPage from './pages/DevisPage'
import ShopPage from './pages/ShopPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import CrmLoginPage from './pages/CrmLoginPage'
import CrmDashboardPage from './pages/CrmDashboardPage'

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="devis" element={<DevisPage />} />
          <Route path="boutique" element={<ShopPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<CheckoutSuccessPage />} />
        </Route>
        <Route path="/admin/login" element={<CrmLoginPage />} />
        <Route path="/admin/*" element={<CrmDashboardPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
