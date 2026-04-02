import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card bg-rm-dark2 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="font-display text-2xl">{title}</h3>
                <button onClick={onClose} className="text-rm-muted hover:text-white transition-colors">
                  <HiX className="text-xl" />
                </button>
              </div>
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
