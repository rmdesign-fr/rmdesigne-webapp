import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function DevisCallout() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 max-w-md"
        >
          <h2 className="font-display text-3xl md:text-4xl tracking-wide mb-2 text-gray-900">
            Demander un devis
          </h2>
          <div className="line-accent" />
          <p className="text-rm-muted mt-4">
            Parlez-nous de votre projet, on s'occupe du reste.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
