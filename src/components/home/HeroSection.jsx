import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url('/assets/hero-car.jpg')", backgroundPosition: 'center 75%' }}
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-end">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card p-8 md:p-12 max-w-md"
        >
          <h1 className="font-display text-5xl md:text-7xl tracking-wider mb-2 text-gray-900">
            R.M_Design
          </h1>
          <div className="w-16 h-1 bg-rm-light-blue mb-4" />
          <p className="text-rm-muted text-lg font-body">
            Préparation automobile • Restauration • Performance
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <HiChevronDown className="text-3xl text-white/80" />
      </motion.div>
    </section>
  )
}
