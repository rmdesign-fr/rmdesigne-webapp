import { useState } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import api from '../../services/api'
import useCartStore from '../../store/cartStore'

const inputCls =
  'w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors'

export default function CheckoutForm({ onSuccess }) {
  const { items, clearCart } = useCartStore()

  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    line1: '',
    city: '',
    postalCode: '',
    country: 'FR',
  })
  const [error, setError] = useState('')

  const isFormValid =
    form.customerName.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.customerEmail) &&
    form.line1.trim().length >= 2 &&
    form.city.trim().length >= 2 &&
    form.postalCode.trim().length >= 2

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  /** Called by PayPal SDK to create an order on our backend */
  const createOrder = async () => {
    if (!isFormValid) throw new Error('Formulaire incomplet')
    setError('')
    const { data } = await api.post('/api/paypal/create-order', {
      items: items.map((i) => ({ productId: i.id, qty: i.qty })),
    })
    return data.id
  }

  /** Called after buyer approves on PayPal */
  const onApprove = async (paypalData) => {
    try {
      setError('')
      await api.post('/api/paypal/capture-order', {
        paypalOrderId: paypalData.orderID,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        shippingAddress: {
          line1: form.line1,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
        },
        items: items.map((i) => ({ productId: i.id, qty: i.qty })),
      })
      clearCart()
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la capture du paiement')
    }
  }

  const onError = (err) => {
    console.error('PayPal error', err)
    setError('Une erreur PayPal est survenue. Veuillez réessayer.')
  }

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Nom complet *"
        value={form.customerName}
        onChange={set('customerName')}
        className={inputCls}
      />
      <input
        type="email"
        placeholder="Email *"
        value={form.customerEmail}
        onChange={set('customerEmail')}
        className={inputCls}
      />
      <input
        type="text"
        placeholder="Adresse de livraison *"
        value={form.line1}
        onChange={set('line1')}
        className={inputCls}
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Ville *"
          value={form.city}
          onChange={set('city')}
          className={inputCls}
        />
        <input
          type="text"
          placeholder="Code postal *"
          value={form.postalCode}
          onChange={set('postalCode')}
          className={inputCls}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className={!isFormValid ? 'opacity-40 pointer-events-none select-none' : ''}>
        <PayPalButtons
          style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </div>

      {!isFormValid && (
        <p className="text-rm-muted text-xs text-center">
          Remplissez tous les champs pour activer le bouton PayPal.
        </p>
      )}
    </div>
  )
}
