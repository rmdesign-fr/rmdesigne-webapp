import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from '../shop/CartDrawer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-rm-dark">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  )
}
