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
    { icon: HiLocationMarker, label: 'Paris, Île-de-France, France' },
    { icon: HiPhone, label: '+33-999-7777-000', href: 'tel:+33999777000' },
    { icon: HiMail, label: 'mahcin.bidule@gmail.com', href: 'mailto:mahcin.bidule@gmail.com' },
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

        {/* Google Maps */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-md">
          <iframe
            title="R.M_Design Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687619!2d2.2646349!3d48.858370!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
