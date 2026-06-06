import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiLocationMarker, HiPhone, HiMail, HiClock } from 'react-icons/hi'
import api from '../../services/api'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/api/contact', form)
      setSent(true)
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    {
      icon: HiLocationMarker,
      label: '14 Rue Robert Giraudineau, 94300 Vincennes, France',
      href: 'https://maps.app.goo.gl/tAUjmnxhVkXf29Yy5',
    },
    { icon: HiPhone, label: '+33 7 67 94 29 08', href: 'tel:+33767942908' },
    { icon: HiMail, label: 'r.mdesignofficiel@gmail.com', href: 'mailto:r.mdesignofficiel@gmail.com' },
    { icon: HiClock, label: 'Lundi au Vendredi - de 8h00 à 19h00' },
  ]

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl tracking-wider text-gray-900">CONTACT</h2>
          <div className="w-16 h-1 bg-rm-light-blue mx-auto mt-3" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Left: Info */}
          <div className="space-y-6 flex flex-col justify-center">
            {contactInfo.map((item, i) => (
              <div key={i} className="flex items-center gap-4 justify-center md:justify-start">
                <item.icon className="text-rm-light-blue text-xl flex-shrink-0" />
                {item.href ? (
                  <a href={item.href} className="text-rm-light-blue hover:underline">{item.label}</a>
                ) : (
                  <span className="text-gray-700">{item.label}</span>
                )}
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rm-light-blue transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rm-light-blue transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rm-light-blue transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={4}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-rm-light-blue transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-rm-blue hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-sm tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sent ? '✓ MESSAGE ENVOYÉ' : sending ? 'ENVOI...' : 'CONTACT US'}
            </button>
          </form>
        </motion.div>

        {/* Google Map Preview */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-md bg-white">
          <div className="p-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rm-light-blue text-white">
              <HiLocationMarker className="h-10 w-10" />
            </div>
            <p className="text-sm uppercase tracking-wider text-rm-light-blue mb-3">Localisation</p>
            <h3 className="font-display text-2xl md:text-3xl tracking-wide mb-3 text-gray-900">
              Ouvrir dans Google Maps
            </h3>
            <a
              href="https://maps.app.goo.gl/tAUjmnxhVkXf29Yy5"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center rounded-full bg-rm-blue px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-colors"
            >
              Ouvrir dans Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
