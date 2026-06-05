import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaCog } from 'react-icons/fa'
import useCart from '../../hooks/useCart'
import { FiShoppingBag } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'Accueil', to: '/' },
  { label: 'A Propos', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Avis', to: '/#avis' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Boutique', to: '/boutique' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { count, toggleCart } = useCart()

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const handleNavClick = (to) => {
    if (to.startsWith('/#')) {
      const id = to.slice(2)
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = to
      }
    }
  }

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 bg-rm-blue shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex flex-col group">
              <div className="flex items-center gap-2">
                <FaCog className="text-white text-2xl group-hover:rotate-180 transition-transform duration-700" />
                <span className="font-display text-2xl md:text-3xl tracking-wider text-white">
                  R.M_Design
                </span>
              </div>
              {/* French Flag Lines */}
              <div className="flex gap-0.5 mt-1.5 ml-8">
                <div className="h-1 flex-1 bg-blue-600 border border-gray-800" style={{minWidth: '30px'}} />
                <div className="h-1 flex-1 bg-white border border-gray-800" style={{minWidth: '30px'}} />
                <div className="h-1 flex-1 bg-red-600 border border-gray-800" style={{minWidth: '30px'}} />
              </div>
              <p className="text-xs text-white/70 mt-1 ml-8">Préparation automobile • Restauration • Performance</p>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to.startsWith('/#') ? '/' : link.to}
                  onClick={() => handleNavClick(link.to)}
                  className="text-sm font-medium tracking-wide text-white/90 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                </Link>
              ))}

              {/* Cart Icon */}
              <button onClick={toggleCart} className="relative p-2 text-white hover:text-white/80 transition-colors">
                <FiShoppingBag className="text-xl" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>

              {/* Devis CTA */}
              <Link
                to="/devis"
                className="border border-white text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-white hover:text-rm-blue transition-all"
              >
                Devis
              </Link>
            </div>

            {/* Mobile Menu + Cart */}
            <div className="flex items-center gap-4 lg:hidden">
              <button onClick={toggleCart} className="relative p-2 text-white">
                <FiShoppingBag className="text-xl" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
                {mobileOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-rm-blue">
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to.startsWith('/#') ? '/' : link.to}
                    onClick={() => { handleNavClick(link.to); setMobileOpen(false) }}
                    className="font-display text-3xl tracking-widest text-white hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/devis"
                  className="mt-4 border-2 border-white text-white px-8 py-3 rounded-lg font-display text-2xl tracking-wider hover:bg-white hover:text-rm-blue transition-all"
                >
                  Devis
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
