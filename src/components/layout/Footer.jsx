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
  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FaCog className="text-white" />
            <span className="font-display text-xl tracking-wider text-white">R.M_Design</span>
          </div>
          <p className="text-gray-400 text-sm">Copyright © 2026 All rights reserved</p>
        </div>
        <div className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to.startsWith('/#') ? '/' : link.to}
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
