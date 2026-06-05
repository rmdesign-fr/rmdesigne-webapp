import { useState, useEffect } from 'react'
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi'
import api from '../../services/api'

const SERVICES = [
  { slug: 'preparation-moteur', label: 'Préparation Moteur' },
  { slug: 'sablage-microbillage', label: 'Sablage / Microbillage' },
  { slug: 'peinture-automobile', label: 'Peinture Automobile' },
  { slug: 'vente-auto', label: 'Vente Auto' },
  { slug: 'restauration', label: 'Restauration' },
]

export default function ServiceGalleryManager() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].slug)
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    fetchGallery()
  }, [selectedService])

  const fetchGallery = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/api/services/${selectedService}/gallery`)
      setGallery(data)
    } catch (err) {
      console.error(err)
      alert('Erreur lors du chargement de la galerie')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)
    formData.append('order', gallery.length.toString())

    try {
      await api.post(`/api/services/${selectedService}/gallery`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      fetchGallery()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de l\'upload')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleUpdate = async (id, title) => {
    try {
      await api.put(`/api/services/gallery/${id}`, { title })
      setEditingItem(null)
      fetchGallery()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette image ?')) return

    try {
      await api.delete(`/api/services/gallery/${id}`)
      fetchGallery()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Galeries Services</h2>
        <div className="flex items-center gap-4">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.label}
              </option>
            ))}
          </select>
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <HiPlus />
            Ajouter une image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : gallery.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Aucune image dans cette galerie
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title || 'Gallery image'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-2 bg-white rounded-full hover:bg-gray-200 transition"
                >
                  <HiPencil className="text-gray-700" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  <HiTrash />
                </button>
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm p-2 truncate">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingItem(null)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Modifier l'image</h3>
            <input
              type="text"
              value={editingItem.title || ''}
              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
              placeholder="Titre (optionnel)"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => handleUpdate(editingItem.id, editingItem.title)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
