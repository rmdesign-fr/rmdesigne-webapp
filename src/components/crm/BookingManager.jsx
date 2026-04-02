import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllBookings, updateBookingStatus, deleteBooking } from '../../services/bookingService'
import { HiCheck, HiX, HiTrash, HiEye } from 'react-icons/hi'
import { useState } from 'react'
import Modal from '../ui/Modal'

export default function BookingManager() {
  const queryClient = useQueryClient()
  const [detail, setDetail] = useState(null)

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: getAllBookings,
  })

  const statusMut = useMutation({
    mutationFn: ({ id, status }) => updateBookingStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })

  const deleteMut = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bookings'] }),
  })

  return (
    <div>
      <h1 className="font-display text-3xl tracking-wider mb-6">Gestion des réservations</h1>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-rm-muted text-left">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Heure</th>
                <th className="p-4 font-medium">Nom</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((b) => (
                <tr key={b._id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 font-mono">{new Date(b.date).toLocaleDateString('fr-FR')}</td>
                  <td className="p-4 font-mono">{b.time}</td>
                  <td className="p-4">{b.name}</td>
                  <td className="p-4">{b.service}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      b.status === 'confirmed' ? 'bg-rm-success/20 text-rm-success'
                      : b.status === 'cancelled' ? 'bg-rm-danger/20 text-rm-danger'
                      : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {b.status === 'confirmed' ? 'Confirmé' : b.status === 'cancelled' ? 'Annulé' : 'En attente'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => setDetail(b)} className="text-rm-light-blue hover:text-white transition-colors" title="Voir détails">
                        <HiEye />
                      </button>
                      {b.status === 'pending' && (
                        <button onClick={() => statusMut.mutate({ id: b._id, status: 'confirmed' })} className="text-rm-success hover:text-green-400 transition-colors" title="Confirmer">
                          <HiCheck />
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button onClick={() => statusMut.mutate({ id: b._id, status: 'cancelled' })} className="text-yellow-500 hover:text-yellow-400 transition-colors" title="Annuler">
                          <HiX />
                        </button>
                      )}
                      <button onClick={() => deleteMut.mutate(b._id)} className="text-rm-danger hover:text-red-400 transition-colors" title="Supprimer">
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && <p className="text-rm-muted text-center py-8">Chargement...</p>}
          {!isLoading && (!bookings || bookings.length === 0) && (
            <p className="text-rm-muted text-center py-8">Aucune réservation</p>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title="Détails de la réservation">
        {detail && (
          <div className="space-y-3 text-sm">
            <p><strong className="text-rm-muted">Nom:</strong> {detail.name}</p>
            <p><strong className="text-rm-muted">Email:</strong> {detail.email}</p>
            <p><strong className="text-rm-muted">Téléphone:</strong> {detail.phone || 'N/A'}</p>
            <p><strong className="text-rm-muted">Service:</strong> {detail.service}</p>
            <p><strong className="text-rm-muted">Date:</strong> {new Date(detail.date).toLocaleDateString('fr-FR')} à {detail.time}</p>
            <p><strong className="text-rm-muted">Description:</strong> {detail.description || 'Aucune'}</p>
            <p><strong className="text-rm-muted">Statut:</strong> {detail.status}</p>
          </div>
        )}
      </Modal>
    </div>
  )
}
