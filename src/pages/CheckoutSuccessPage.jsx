import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiCheckCircle } from 'react-icons/hi'
import Button from '../components/ui/Button'

export default function CheckoutSuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-rm-dark pt-20"
    >
      <div className="glass-card p-12 text-center max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          <HiCheckCircle className="text-rm-success text-7xl mx-auto mb-4" />
        </motion.div>
        <h1 className="font-display text-4xl mb-3">Merci pour votre commande !</h1>
        <p className="text-rm-muted mb-6">
          Votre paiement a été accepté. Vous recevrez un email de confirmation avec les détails de votre commande.
        </p>
        <Link to="/boutique">
          <Button variant="outline">Retour à la boutique</Button>
        </Link>
      </div>
    </motion.div>
  )
}
