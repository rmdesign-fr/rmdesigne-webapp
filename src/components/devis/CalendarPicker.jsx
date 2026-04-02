import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import useCalendar from '../../hooks/useCalendar'
import { format } from 'date-fns'

export default function CalendarPicker({ onDateSelect, selectedDate }) {
  const { currentMonth, nextMonth, prevMonth, monthLabel, getDays } = useCalendar()
  const days = getDays()
  const dayHeaders = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

  const handleDateClick = (day) => {
    if (day.isPast || day.isWeekend || !day.isCurrentMonth) return
    onDateSelect(day.date)
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="text-white/60 hover:text-white p-2 transition-colors"
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <h3 className="font-display text-xl tracking-widest">{monthLabel}</h3>
        <button
          onClick={nextMonth}
          className="text-white/60 hover:text-white p-2 transition-colors"
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayHeaders.map((d) => (
          <div key={d} className="text-center text-rm-muted text-xs font-mono py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd')
          const isDisabled = day.isPast || day.isWeekend || !day.isCurrentMonth

          return (
            <button
              key={i}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all relative
                ${isDisabled
                  ? 'text-white/15 cursor-not-allowed'
                  : isSelected
                    ? 'bg-rm-pink text-white font-bold scale-105'
                    : 'text-white hover:bg-white/10 hover:border hover:border-white/20'
                }
              `}
            >
              {day.date.getDate()}
              {day.isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-rm-pink rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
