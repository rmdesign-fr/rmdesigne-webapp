import { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Button from '../ui/Button'
import api from '../../services/api'
import useCartStore from '../../store/cartStore'

const cardStyle = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: '"DM Sans", sans-serif',
      fontSize: '16px',
      '::placeholder': { color: '#a0a0b8' },
    },
    invalid: { color: '#ef4444' },
  },
}

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const { items, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    line1: '',
    city: '',
    postalCode: '',
    country: 'FR',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      const { data } = await api.post('/api/stripe/create-payment-intent', {
        items: items.map(i => ({ productId: i._id, qty: i.qty })),
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        shippingAddress: {
          line1: form.line1,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
      })

      const { error: stripeError } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: form.customerName,
            email: form.customerEmail,
          },
        },
      })

      if (stripeError) {
        setError(stripeError.message)
      } else {
        clearCart()
        onSuccess()
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nom complet *"
        value={form.customerName}
        onChange={e => setForm({ ...form, customerName: e.target.value })}
        required
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
      />
      <input
        type="email"
        placeholder="Email *"
        value={form.customerEmail}
        onChange={e => setForm({ ...form, customerEmail: e.target.value })}
        required
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
      />
      <input
        type="text"
        placeholder="Adresse de livraison *"
        value={form.line1}
        onChange={e => setForm({ ...form, line1: e.target.value })}
        required
        className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Ville *"
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
          required
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
        />
        <input
          type="text"
          placeholder="Code postal *"
          value={form.postalCode}
          onChange={e => setForm({ ...form, postalCode: e.target.value })}
          required
          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
        />
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-4">
        <CardElement options={cardStyle} />
      </div>

      {error && <p className="text-rm-danger text-sm">{error}</p>}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={!stripe || loading}
        className="py-4 text-lg"
      >
        {loading ? 'Traitement...' : `Payer ${total.toFixed(2)} €`}
      </Button>
    </form>
  )
}
