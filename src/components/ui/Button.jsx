import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-rm-blue hover:bg-blue-800 text-white',
  secondary: 'bg-rm-light-blue hover:bg-blue-600 text-white',
  outline: 'border border-rm-blue text-rm-blue hover:bg-rm-blue hover:text-white',
  danger: 'bg-rm-danger hover:bg-red-600 text-white',
  ghost: 'text-rm-muted hover:text-gray-900 hover:bg-gray-100',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${variants[variant] || variants.primary}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
