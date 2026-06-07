import { motion } from "framer-motion";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutForm from "../components/shop/CheckoutForm";
import useCartStore from "../store/cartStore";
import Cart from "../components/shop/Cart";
import { useNavigate } from "react-router-dom";

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "sb";

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const total = getTotal();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rm-dark pt-20">
        <div className="text-center">
          <h2 className="font-display text-3xl mb-2 text-white">Panier vide</h2>
          <p className="text-gray-400">
            Ajoutez des articles depuis la boutique.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{ clientId: PAYPAL_CLIENT_ID, currency: "EUR", locale: "fr_FR" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 pb-16 bg-rm-dark"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl tracking-wider mb-8 text-center text-white">
            PAIEMENT
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="glass-card p-6">
              <h2 className="font-display text-xl mb-6">Vos informations</h2>
              <CheckoutForm onSuccess={() => navigate("/checkout/success")} />
            </div>

            {/* Order Summary */}
            <div className="glass-card p-6">
              <h2 className="font-display text-xl mb-6">Récapitulatif</h2>
              <Cart />
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between font-bold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="font-mono text-rm-pink">
                  {total.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
}
