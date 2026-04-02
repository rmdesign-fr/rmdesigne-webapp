import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const SERVICES = [
  {
    title: 'Préparation moteur',
    desc: 'Optimisation moteur pour améliorer puissance, couple et agrément, en toute fiabilité.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600',
  },
  {
    title: 'Sablage / Microbillage',
    desc: 'Nettoyage et restauration de pièces mécaniques pour une base saine, précise et durable.',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600',
  },
  {
    title: 'Peinture automobile',
    desc: 'Peinture complète ou partielle avec préparation soignée et finition professionnelle.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600',
  },
  {
    title: 'Vente auto',
    desc: 'Vente de véhicules restaurés.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600',
  },
  {
    title: 'Restauration',
    desc: 'Restauration complète des véhicules.',
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600',
  },
  {
    title: 'Goodies',
    desc: 'Peinture complète ou partielle avec préparation soignée et finition professionnelle.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600',
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
