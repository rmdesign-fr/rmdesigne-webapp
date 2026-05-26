import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function TimeSlotGrid({ selectedDate, slots, selectedTime, onTimeSelect, loading }) {
  const safeSlots = Array.isArray(slots) ? slots : []

  if (!selectedDate) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-rm-muted text-center">Sélectionnez une date pour voir les créneaux disponibles</p>
      </div>
    )
  }

  const dateLabel = format(selectedDate, 'dd MMMM yyyy', { locale: fr })

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      <h4 className="font-mono text-xs tracking-widest text-rm-muted uppercase mb-4">
        CRÉNEAU DISPONIBLE — {dateLabel}
      </h4>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-rm-pink border-t-transparent rounded-full animate-spin" />
        </div>
      ) : safeSlots.length === 0 ? (
        <p className="text-rm-muted text-center py-8">Aucun créneau disponible pour cette date</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {safeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onTimeSelect(slot)}
              className={`
                py-3 rounded-lg text-sm font-mono font-medium transition-all border
                ${selectedTime === slot
                  ? 'bg-rm-pink border-rm-pink text-white'
                  : 'border-white/20 text-white hover:border-rm-pink/60 hover:bg-rm-pink/10'
                }
              `}
            >
              {slot}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
