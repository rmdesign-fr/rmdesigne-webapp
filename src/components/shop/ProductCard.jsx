import { motion } from 'framer-motion'
import Button from '../ui/Button'
import useCartStore from '../../store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem)
  const outOfStock = product.stock <= 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl overflow-hidden border border-white/10 hover:border-rm-pink/30 transition-all bg-rm-dark group"
    >
      <div className="aspect-square overflow-hidden relative">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/400?text=Produit'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-rm-pink/90 text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
            {product.category}
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Rupture de stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg tracking-wide mb-1">{product.name}</h3>
        <p className="text-rm-pink font-mono font-bold text-lg mb-3">
          {product.price?.toFixed(2)} €
        </p>
        <Button
          variant="outline"
          fullWidth
          disabled={outOfStock}
          onClick={() => addItem(product)}
        >
          {outOfStock ? 'Indisponible' : 'Ajouter au panier'}
        </Button>
      </div>
    </motion.div>
  )
}
