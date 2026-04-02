import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaCog } from 'react-icons/fa'
import Button from '../components/ui/Button'
import useAuthStore from '../store/authStore'

export default function CrmLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(s => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-rm-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <FaCog className="text-rm-pink text-4xl mx-auto mb-3" />
          <h1 className="font-display text-3xl tracking-wider">R.M_Design</h1>
          <p className="text-rm-muted mt-1">Espace Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />

          {error && <p className="text-rm-danger text-sm text-center">{error}</p>}

          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
