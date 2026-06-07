import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import Cart from "./Cart";
import Button from "../ui/Button";

export default function CartDrawer() {
  const { isOpen, closeCart, items, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-rm-dark2 border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="font-display text-2xl tracking-wide text-white">
                Panier
              </h3>
              <button
                onClick={closeCart}
                className="text-rm-muted hover:text-white transition-colors"
              >
                <HiX className="text-xl" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <Cart />
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <Link to="/checkout" onClick={closeCart}>
                  <Button variant="primary" fullWidth>
                    Procéder au paiement — {total.toFixed(2)} €
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
