import { useState, useEffect } from 'react'
import { HiTrash, HiMail, HiPhone, HiCalendar } from 'react-icons/hi'
import api from '../../services/api'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function ContactManager() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/contact')
      setMessages(data)
    } catch (err) {
      console.error(err)
      alert('Erreur lors du chargement des messages')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce message ?')) return

    try {
      await api.delete(`/api/contact/${id}`)
      fetchMessages()
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Messages de Contact</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Aucun message
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border rounded-lg p-6 hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{msg.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <HiMail className="text-gray-400" />
                      <a href={`mailto:${msg.email}`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
                        {msg.email}
                      </a>
                    </div>
                    {msg.phone && (
                      <div className="flex items-center gap-1">
                        <HiPhone className="text-gray-400" />
                        <a href={`tel:${msg.phone}`} className="hover:text-blue-600" onClick={(e) => e.stopPropagation()}>
                          {msg.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <HiCalendar />
                    {format(new Date(msg.createdAt), 'dd MMM yyyy', { locale: fr })}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(msg.id)
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 line-clamp-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{selectedMessage.name}</h3>
                <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <HiMail className="text-gray-400" />
                    <a href={`mailto:${selectedMessage.email}`} className="hover:text-blue-600">
                      {selectedMessage.email}
                    </a>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2">
                      <HiPhone className="text-gray-400" />
                      <a href={`tel:${selectedMessage.phone}`} className="hover:text-blue-600">
                        {selectedMessage.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <HiCalendar className="text-gray-400" />
                    {format(new Date(selectedMessage.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Message:</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <div className="flex gap-2 mt-6 justify-end">
              <button
                onClick={() => {
                  handleDelete(selectedMessage.id)
                  setSelectedMessage(null)
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <HiTrash />
                Supprimer
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
