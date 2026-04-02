import { useQuery } from '@tanstack/react-query'
import { HiCalendar, HiShoppingCart, HiCube, HiStar } from 'react-icons/hi'
import StatsCard from './StatsCard'
import { getAllBookings } from '../../services/bookingService'
import { getProducts } from '../../services/productService'
import { getAllReviews } from '../../services/reviewService'
import api from '../../services/api'

export default function Dashboard() {
  const { data: bookings } = useQuery({ queryKey: ['admin-bookings'], queryFn: getAllBookings })
  const { data: products } = useQuery({ queryKey: ['admin-products'], queryFn: () => getProducts() })
  const { data: reviews } = useQuery({ queryKey: ['admin-reviews'], queryFn: getAllReviews })
  const { data: orders } = useQuery({ queryKey: ['admin-orders'], queryFn: () => api.get('/api/orders').then(r => r.data) })

  const now = new Date()
  const thisMonthBookings = bookings?.filter(b => {
    const d = new Date(b.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })?.length || 0

  const totalRevenue = orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0
  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wider mb-8">Tableau de bord</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={HiCalendar} label="Réservations ce mois" value={thisMonthBookings} color="text-rm-light-blue" />
        <StatsCard icon={HiShoppingCart} label="Commandes totales" value={`${orders?.length || 0} (${totalRevenue.toFixed(0)}€)`} color="text-rm-success" />
        <StatsCard icon={HiCube} label="Produits actifs" value={products?.length || 0} color="text-rm-pink" />
        <StatsCard icon={HiStar} label="Note moyenne" value={`${avgRating}/5`} color="text-yellow-400" />
      </div>

      {/* Recent Bookings */}
      <div className="glass-card p-6 rounded-xl mb-6">
        <h2 className="font-display text-xl tracking-wide mb-4">Dernières réservations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-rm-muted text-left">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Heure</th>
                <th className="pb-3 font-medium">Nom</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.slice(0, 5).map((b) => (
                <tr key={b._id} className="border-b border-white/5">
                  <td className="py-3 font-mono">{new Date(b.date).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3 font-mono">{b.time}</td>
                  <td className="py-3">{b.name}</td>
                  <td className="py-3">{b.service}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      b.status === 'confirmed' ? 'bg-rm-success/20 text-rm-success'
                      : b.status === 'cancelled' ? 'bg-rm-danger/20 text-rm-danger'
                      : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!bookings || bookings.length === 0) && (
            <p className="text-rm-muted text-center py-6">Aucune réservation</p>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-card p-6 rounded-xl">
        <h2 className="font-display text-xl tracking-wide mb-4">Dernières commandes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-rm-muted text-left">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders?.slice(0, 5).map((o) => (
                <tr key={o._id} className="border-b border-white/5">
                  <td className="py-3 font-mono">{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="py-3">{o.customerName}</td>
                  <td className="py-3 font-mono text-rm-pink">{o.total?.toFixed(2)} €</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      o.status === 'paid' ? 'bg-rm-success/20 text-rm-success'
                      : o.status === 'shipped' ? 'bg-rm-light-blue/20 text-rm-light-blue'
                      : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!orders || orders.length === 0) && (
            <p className="text-rm-muted text-center py-6">Aucune commande</p>
          )}
        </div>
      </div>
    </div>
  )
}
