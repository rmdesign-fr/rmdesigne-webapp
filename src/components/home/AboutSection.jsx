import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1621993202323-f5c258ec8e28?w=800"
                alt="Atelier R.M_Design"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-2 text-gray-900">
              Un atelier dédié à la passion automobile
            </h2>
            <div className="line-accent" />
            <p className="text-rm-muted leading-relaxed mt-6 text-base">
              R.M_Design est un atelier de garagiste spécialisé dans la préparation automobile, 
              la restauration et les finitions haut de gamme. Du sablage/microbillage à la peinture, 
              en passant par l'optimisation moteur, chaque intervention est réalisée avec précision 
              pour gagner en performance, fiabilité et esthétique. Nous accompagnons aussi bien les 
              véhicules sportifs que les modèles anciens, avec une approche sur mesure et un souci du 
              détail constant. Notre objectif : transformer chaque véhicule en une pièce unique, prête 
              à rouler et à se démarquer, sur route comme en exposition.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
