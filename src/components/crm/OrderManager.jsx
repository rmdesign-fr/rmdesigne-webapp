import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../services/api'
import { useState } from 'react'
import Modal from '../ui/Modal'
import { HiEye } from 'react-icons/hi'

export default function OrderManager() {
  const queryClient = useQueryClient()
  const [detail, setDetail] = useState(null)
  const [filter, setFilter] = useState('')

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => api.get('/api/orders').then(r => r.data),
  })

  const statusMut = useMutation({
    mutationFn: ({ id, status }) => api.put(`/api/orders/${id}/status`, { status }).then(r => r.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }),
  })

  const filtered = orders?.filter(o => !filter || o.status === filter) || []

  const statusLabels = {
    pending: 'En attente',
    paid: 'Payé',
    shipped: 'Expédié',
    delivered: 'Livré',
  }

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wider mb-6">Gestion des commandes</h1>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {['', 'pending', 'paid', 'shipped', 'delivered'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
              filter === s ? 'bg-rm-pink border-rm-pink text-white' : 'border-white/20 text-rm-muted hover:border-rm-pink/50'
            }`}
          >
            {s ? statusLabels[s] : 'Toutes'}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-rm-muted text-left">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Produits</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-mono">{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                  <td className="p-4">{o.customerName}</td>
                  <td className="p-4 text-rm-muted">{o.items?.length || 0} article(s)</td>
                  <td className="p-4 font-mono text-rm-pink">{o.total?.toFixed(2)} €</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      o.status === 'paid' ? 'bg-rm-success/20 text-rm-success'
                      : o.status === 'shipped' ? 'bg-rm-light-blue/20 text-rm-light-blue'
                      : o.status === 'delivered' ? 'bg-purple-500/20 text-purple-400'
                      : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => setDetail(o)} className="text-rm-light-blue hover:text-white transition-colors">
                        <HiEye />
                      </button>
                      {o.status === 'paid' && (
                        <button
                          onClick={() => statusMut.mutate({ id: o.id, status: 'shipped' })}
                          className="text-xs bg-rm-light-blue/20 text-rm-light-blue px-2 py-1 rounded hover:bg-rm-light-blue/30 transition-colors"
                        >
                          Expédier
                        </button>
                      )}
                      {o.status === 'shipped' && (
                        <button
                          onClick={() => statusMut.mutate({ id: o.id, status: 'delivered' })}
                          className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded hover:bg-purple-500/30 transition-colors"
                        >
                          Livré
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && <p className="text-rm-muted text-center py-8">Chargement...</p>}
          {!isLoading && filtered.length === 0 && (
            <p className="text-rm-muted text-center py-8">Aucune commande</p>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title="Détails de la commande">
        {detail && (
          <div className="space-y-4 text-sm">
            <p><strong className="text-rm-muted">Client:</strong> {detail.customerName}</p>
            <p><strong className="text-rm-muted">Email:</strong> {detail.customerEmail}</p>
            <p><strong className="text-rm-muted">Adresse:</strong> {detail.shippingAddress?.line1}, {detail.shippingAddress?.city} {detail.shippingAddress?.postalCode}</p>
            <div>
              <strong className="text-rm-muted">Articles:</strong>
              <ul className="mt-2 space-y-2">
                {detail.items?.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name} x{item.qty}</span>
                    <span className="font-mono text-rm-pink">{(item.price * item.qty).toFixed(2)} €</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between font-bold pt-3 border-t border-white/10">
              <span>Total</span>
              <span className="font-mono text-rm-pink">{detail.total?.toFixed(2)} €</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
