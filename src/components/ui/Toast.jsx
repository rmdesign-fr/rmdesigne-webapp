import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiCheckCircle, HiExclamationCircle, HiX } from 'react-icons/hi'

export default function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icon = type === 'success' 
    ? <HiCheckCircle className="text-rm-success text-xl" /> 
    : <HiExclamationCircle className="text-rm-danger text-xl" />

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 z-[100] glass-card bg-rm-dark2 px-5 py-4 rounded-xl flex items-center gap-3 shadow-xl"
    >
      {icon}
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="text-rm-muted hover:text-white ml-2">
        <HiX />
      </button>
    </motion.div>
  )
}
