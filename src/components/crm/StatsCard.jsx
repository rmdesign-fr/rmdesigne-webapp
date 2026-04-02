export default function StatsCard({ icon: Icon, label, value, color = 'text-rm-pink' }) {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ${color}`}>
          <Icon className="text-2xl" />
        </div>
        <div>
          <p className="text-rm-muted text-sm">{label}</p>
          <p className="text-2xl font-bold font-mono">{value}</p>
        </div>
      </div>
    </div>
  )
}
