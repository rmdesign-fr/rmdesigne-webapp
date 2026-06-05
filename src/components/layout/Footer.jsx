import { Link } from 'react-router-dom'
import { FaCog } from 'react-icons/fa'

const FOOTER_LINKS = [
  { label: 'ACCUEIL', to: '/' },
  { label: 'A PROPOS', to: '/#about' },
  { label: 'SERVICES', to: '/#services' },
  { label: 'AVIS', to: '/#avis' },
  { label: 'CONTACT', to: '/#contact' },
]

export default function Footer() {
  const handleNavClick = (to, e) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const id = to.slice(2)
      if (window.location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.href = to
      }
    }
  }

  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <FaCog className="text-white" />
              <span className="font-display text-xl tracking-wider text-white">R.M_Design</span>
            </div>
            {/* French Flag Lines */}
            <div className="flex gap-0.5 ml-6">
              <div className="h-0.5 flex-1 bg-blue-600 border border-gray-700" style={{minWidth: '25px'}} />
              <div className="h-0.5 flex-1 bg-white border border-gray-700" style={{minWidth: '25px'}} />
              <div className="h-0.5 flex-1 bg-red-600 border border-gray-700" style={{minWidth: '25px'}} />
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-2">Copyright © 2026 All rights reserved</p>
        </div>
        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to.startsWith('/#') ? '/' : link.to}
              onClick={(e) => handleNavClick(link.to, e)}
              className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
