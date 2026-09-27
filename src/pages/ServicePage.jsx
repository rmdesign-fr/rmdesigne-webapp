import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import api from '../services/api'

const SERVICE_DATA = {
  'preparation-moteur': {
    title: 'Préparation Moteur',
    description: 'Optimisation et amélioration des performances moteur pour votre véhicule. Notre expertise en préparation moteur garantit puissance, fiabilité et performance.',
    hero: '/assets/preparation-moteur.jpg',
  },
  'sablage-microbillage': {
    title: 'Sablage / Microbillage',
    description: 'Techniques professionnelles de sablage et microbillage pour un décapage parfait de vos pièces automobiles. Restauration et préparation de surface de haute qualité.',
    hero: '/assets/atelier-rm.jpg',
  },
  'peinture-automobile': {
    title: 'Peinture Automobile',
    description: 'Services de peinture automobile haut de gamme. Du covering à la peinture complète, nous redonnons vie à votre véhicule avec un rendu professionnel.',
    hero: '/assets/peinture-automobile.jpg',
  },
  'vente-auto': {
    title: 'Vente Auto',
    description: 'Découvrez notre sélection de véhicules d\'occasion restaurés et préparés avec soin. Qualité et transparence garanties.',
    hero: '/assets/hero-car.jpg',
  },
  'restauration': {
    title: 'Restauration',
    description: 'Restauration complète de véhicules de collection et modernes. Nous redonnons vie à votre véhicule avec passion et expertise.',
    hero: '/assets/restauration.jpg',
  },
}

export default function ServicePage() {
  const { slug } = useParams()
  const service = SERVICE_DATA[slug]
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await api.get(`/api/services/${slug}/gallery`)
        setGallery(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to fetch gallery:', err)
        setGallery([])
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [slug])

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
          <Link to="/" className="text-rm-blue hover:underline">Retour à l'accueil</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.hero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wider">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            {service.description}
          </p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-center text-gray-900 mb-12 tracking-wider">
            NOS RÉALISATIONS
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rm-blue" />
            </div>
          ) : Array.isArray(gallery) && gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || service.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white font-semibold text-lg">{item.title}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Aucune réalisation disponible pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rm-blue">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6 tracking-wider">
            INTÉRESSÉ PAR CE SERVICE ?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Contactez-nous pour un devis personnalisé et découvrez comment nous pouvons transformer votre véhicule.
          </p>
          <Link
            to="/devis"
            className="inline-flex items-center gap-2 bg-white text-rm-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            DEMANDER UN DEVIS
            <HiArrowRight className="text-xl" />
          </Link>
        </div>
      </section>
    </div>
  )
}
