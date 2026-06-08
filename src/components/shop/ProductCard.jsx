import { motion } from "framer-motion";
import Button from "../ui/Button";
import useCartStore from "../../store/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const outOfStock =
    !product.surCommande && !product.displayOnly && product.stock <= 0;

  const handleAdd = () => {
    addItem(product);
    openCart();
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-xl overflow-hidden border border-gray-200 hover:border-rm-pink/50 transition-all group shadow-sm"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden relative bg-gray-100">
        <img
          src={
            product.images?.[0] ||
            "https://via.placeholder.com/400?text=Produit"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-rm-pink text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
            {product.category}
          </span>
        )}
        {product.surCommande && (
          <span className="absolute top-3 right-3 bg-rm-blue text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
            Sur commande
          </span>
        )}
        {outOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              Rupture de stock
            </span>
          </div>
        )}
      </div>

      {/* Content — white background for readability */}
      <div className="p-4 bg-white">
        <h3 className="font-display text-lg tracking-wide mb-1 text-gray-900 leading-tight">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price — hidden in vitrine mode */}
        {!product.displayOnly && (
          <p className="text-rm-pink font-mono font-bold text-lg mb-3">
            {product.price?.toFixed(2)} €
          </p>
        )}

        {product.displayOnly ? (
          <div className="text-center py-3 border-t border-gray-100 mt-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
              Collection R.M_Design
            </span>
          </div>
        ) : outOfStock ? (
          <Button variant="outline" fullWidth disabled>
            Rupture de stock
          </Button>
        ) : (
          <Button variant="primary" fullWidth onClick={handleAdd}>
            Ajouter au panier
          </Button>
        )}
      </div>
    </motion.div>
  );
}
