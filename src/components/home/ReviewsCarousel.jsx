import { useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import StarRating from '../ui/StarRating'

const REVIEWS = [
  {
    name: 'Sophie R.',
    service: 'peinture complète',
    text: 'Peinture refaite sur mon véhicule : teinte parfaite, rendu brillant, et délais respectés. Super accompagnement du début à la fin.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    name: 'Thomas M.',
    service: 'préparation moteur',
    text: "Résultats au-delà de mes attentes. Mon moteur tourne comme jamais. Équipe passionnée et pro.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    name: 'Lucas D.',
    service: 'sablage complet',
    text: 'Travail impeccable sur mes pièces rouillées. Microbillage parfait, comme neuves. Je recommande.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
  },
]

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const next = useCallback(() => setCurrent(c => (c + 1) % REVIEWS.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + REVIEWS.length) % REVIEWS.length), [])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [paused, next])

  const review = REVIEWS[current]

  return (
    <section id="avis" className="py-20 md:py-28 bg-rm-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider text-gray-900">AVIS</h2>
          <div className="w-16 h-1 bg-rm-light-blue mx-auto mt-3" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative glass-card overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="aspect-square md:aspect-auto overflow-hidden">
              <motion.img
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <p className="text-rm-muted text-xs tracking-widest uppercase mb-3 font-mono">
                  CLIENT{review.name.endsWith('R.') ? 'E' : ''} POUR UNE {review.service.toUpperCase()}
                </p>
                <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-4 text-gray-900">
                  {review.name}
                </h3>
                <p className="text-rm-muted leading-relaxed text-lg mb-6">
                  {review.text}
                </p>
                <StarRating rating={review.rating} />
              </motion.div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            <HiChevronLeft className="text-xl" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            <HiChevronRight className="text-xl" />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? 'bg-gray-800 scale-125' : 'bg-gray-400 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
