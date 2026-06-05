import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    title: 'Préparation moteur',
    desc: 'Optimisation moteur pour améliorer puissance, couple et agrément, en toute fiabilité.',
    image: '/assets/preparation-moteur.jpg',
    link: '/services/preparation-moteur',
  },
  {
    title: 'Sablage / Microbillage',
    desc: 'Nettoyage et restauration de pièces mécaniques pour une base saine, précise et durable.',
    image: '/assets/atelier-rm.jpg',
    link: '/services/sablage-microbillage',
  },
  {
    title: 'Peinture automobile',
    desc: 'Peinture complète ou partielle avec préparation soignée et finition professionnelle.',
    image: '/assets/peinture-automobile.jpg',
    link: '/services/peinture-automobile',
  },
  {
    title: 'Vente auto',
    desc: 'Vente de véhicules restaurés.',
    image: '/assets/hero-car.jpg',
    link: '/services/vente-auto',
  },
  {
    title: 'Restauration',
    desc: 'Restauration complète des véhicules.',
    image: '/assets/restauration.jpg',
    link: '/services/restauration',
  },
  {
    title: 'Goodies',
    desc: 'Peinture complète ou partielle avec préparation soignée et finition professionnelle.',
    image: '/assets/goodies.jpg',
    link: '/boutique',
  },
]

export default function ServicesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="services" className="py-20 md:py-28 bg-rm-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Wrapper = service.link ? Link : 'div'
            const wrapperProps = service.link ? { to: service.link } : {}

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Wrapper
                  {...wrapperProps}
                  className="block rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl tracking-wide mb-2 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-rm-muted text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </Wrapper>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
