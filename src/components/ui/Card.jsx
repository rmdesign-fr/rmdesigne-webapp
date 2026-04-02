export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`
        glass-card p-6 rounded-xl
        ${hover ? 'hover:border-rm-pink/40 hover:shadow-lg hover:shadow-rm-pink/10 hover:-translate-y-1 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
