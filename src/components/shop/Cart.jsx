import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi'
import useCartStore from '../../store/cartStore'

export default function Cart() {
  const { items, updateQty, removeItem, getTotal } = useCartStore()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-rm-muted">Votre panier est vide</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item._id} className="flex items-center gap-4 py-3 border-b border-white/10">
          <img
            src={item.images?.[0] || 'https://via.placeholder.com/60'}
            alt={item.name}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-rm-pink font-mono text-sm">{item.price?.toFixed(2)} €</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQty(item._id, item.qty - 1)}
              className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <HiMinus className="text-xs" />
            </button>
            <span className="text-sm font-mono w-6 text-center">{item.qty}</span>
            <button
              onClick={() => updateQty(item._id, item.qty + 1)}
              className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <HiPlus className="text-xs" />
            </button>
          </div>
          <button
            onClick={() => removeItem(item._id)}
            className="text-rm-muted hover:text-rm-danger transition-colors"
          >
            <HiTrash />
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center pt-4 font-bold">
        <span>Sous-total</span>
        <span className="font-mono text-rm-pink">{total.toFixed(2)} €</span>
      </div>
    </div>
  )
}
