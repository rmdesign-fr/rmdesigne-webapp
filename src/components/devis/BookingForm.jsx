import { useState } from 'react'
import Button from '../ui/Button'

const SERVICES = [
  'Préparation moteur',
  'Sablage / Microbillage',
  'Peinture automobile',
  'Restauration',
  'Autre',
]

export default function BookingForm({ selectedDate, selectedTime, onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    onSubmit(form)
  }

  const disabled = !selectedDate || !selectedTime

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Votre nom *"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rm-pink transition-colors"
      />
      <input
        type="email"
        placeholder="Email *"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rm-pink transition-colors"
      />
      <input
        type="tel"
        placeholder="Téléphone"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rm-pink transition-colors"
      />
      <select
        value={form.service}
        onChange={e => setForm({ ...form, service: e.target.value })}
        required
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rm-pink transition-colors"
      >
        <option value="" disabled>Service souhaité *</option>
        {SERVICES.map(s => (
          <option key={s} value={s} className="bg-[#1a1a1a]">{s}</option>
        ))}
      </select>
      <textarea
        placeholder="Description du projet"
        rows={3}
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rm-pink transition-colors resize-none"
      />
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={disabled || loading}
        className="!bg-rm-danger hover:!bg-red-600 uppercase font-bold tracking-wider py-4"
      >
        {loading ? 'ENVOI...' : 'CONFIRMER LE RENDEZ-VOUS'}
      </Button>
    </form>
  )
}
