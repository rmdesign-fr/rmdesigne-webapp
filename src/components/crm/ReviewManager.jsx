import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllReviews, createReview, approveReview, deleteReview } from '../../services/reviewService'
import { HiCheck, HiX, HiTrash, HiPlus } from 'react-icons/hi'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import StarRating from '../ui/StarRating'

export default function ReviewManager() {
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ name: '', service: '', text: '', rating: 5 })

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: getAllReviews,
  })

  const approveMut = useMutation({
    mutationFn: ({ id, approved }) => approveReview(id, approved),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reviews'] }),
  })

  const deleteMut = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reviews'] }),
  })

  const createMut = useMutation({
    mutationFn: (data) => createReview({ ...data, approved: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] })
      setModalOpen(false)
      setForm({ name: '', service: '', text: '', rating: 5 })
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wider">Gestion des avis</h1>
        <Button onClick={() => setModalOpen(true)}>
          <HiPlus className="inline mr-2" /> Ajouter un avis
        </Button>
      </div>

      <div className="space-y-4">
        {reviews?.map((r) => (
          <div key={r._id} className="glass-card p-5 rounded-xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold">{r.name}</span>
                  <span className="text-rm-muted text-xs font-mono">{r.service}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.approved ? 'bg-rm-success/20 text-rm-success' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {r.approved ? 'Approuvé' : 'En attente'}
                  </span>
                </div>
                <p className="text-rm-muted text-sm mb-2">"{r.text}"</p>
                <StarRating rating={r.rating} size="text-sm" />
              </div>
              <div className="flex gap-2 ml-4">
                {!r.approved && (
                  <button onClick={() => approveMut.mutate({ id: r._id, approved: true })} className="text-rm-success hover:text-green-400 transition-colors" title="Approuver">
                    <HiCheck className="text-lg" />
                  </button>
                )}
                {r.approved && (
                  <button onClick={() => approveMut.mutate({ id: r._id, approved: false })} className="text-yellow-500 hover:text-yellow-400 transition-colors" title="Retirer">
                    <HiX className="text-lg" />
                  </button>
                )}
                <button onClick={() => deleteMut.mutate(r._id)} className="text-rm-danger hover:text-red-400 transition-colors" title="Supprimer">
                  <HiTrash className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {isLoading && <p className="text-rm-muted text-center py-8">Chargement...</p>}
        {!isLoading && (!reviews || reviews.length === 0) && (
          <p className="text-rm-muted text-center py-8">Aucun avis</p>
        )}
      </div>

      {/* Add Review Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Ajouter un avis">
        <form onSubmit={(e) => { e.preventDefault(); createMut.mutate(form) }} className="space-y-4">
          <input
            type="text" placeholder="Nom du client" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />
          <input
            type="text" placeholder="Service (ex: peinture complète)" value={form.service}
            onChange={e => setForm({ ...form, service: e.target.value })} required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />
          <textarea
            placeholder="Texte de l'avis" rows={3} value={form.text}
            onChange={e => setForm({ ...form, text: e.target.value })} required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors resize-none"
          />
          <div>
            <label className="text-sm text-rm-muted mb-2 block">Note</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n} type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className={`w-10 h-10 rounded-lg border ${form.rating >= n ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-white/20 text-rm-muted'} font-bold transition-colors`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" fullWidth disabled={createMut.isPending}>
            Ajouter l'avis
          </Button>
        </form>
      </Modal>
    </div>
  )
}
