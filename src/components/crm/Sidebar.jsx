import { NavLink, useNavigate } from 'react-router-dom'
import { FaCog } from 'react-icons/fa'
import { HiChartBar, HiCube, HiCalendar, HiStar, HiShoppingCart, HiLogout, HiPhotograph, HiMail } from 'react-icons/hi'
import useAuthStore from '../../store/authStore'

const NAV_ITEMS = [
  { icon: HiChartBar, label: 'Tableau de bord', to: '/admin' },
  { icon: HiCube, label: 'Produits', to: '/admin/products' },
  { icon: HiCalendar, label: 'Réservations', to: '/admin/bookings' },
  { icon: HiStar, label: 'Avis clients', to: '/admin/reviews' },
  { icon: HiShoppingCart, label: 'Commandes', to: '/admin/orders' },
  { icon: HiPhotograph, label: 'Galeries Services', to: '/admin/services' },
  { icon: HiMail, label: 'Messages Contact', to: '/admin/contacts' },
]

export default function Sidebar() {
  const logout = useAuthStore(s => s.logout)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-rm-dark2 border-r border-white/10 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FaCog className="text-rm-pink text-xl" />
          <span className="font-display text-xl tracking-wider">R.M_Design</span>
        </div>
        <p className="text-rm-muted text-xs mt-1">Administration</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-rm-pink/20 text-rm-pink'
                  : 'text-rm-muted hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon className="text-lg" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rm-muted hover:bg-white/5 hover:text-white transition-all w-full"
        >
          <HiLogout className="text-lg" />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
