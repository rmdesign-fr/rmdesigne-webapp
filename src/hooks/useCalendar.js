import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from 'date-fns'
import { fr } from 'date-fns/locale'

export default function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const today = startOfDay(new Date())

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const monthLabel = format(currentMonth, 'MMMM yyyy', { locale: fr }).toUpperCase()

  const getDays = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days = []
    let day = startDate
    while (day <= endDate) {
      days.push({
        date: day,
        isCurrentMonth: isSameMonth(day, currentMonth),
        isToday: isSameDay(day, today),
        isPast: isBefore(day, today),
        isSelected: selectedDate && isSameDay(day, selectedDate),
        isWeekend: day.getDay() === 0 || day.getDay() === 6,
      })
      day = addDays(day, 1)
    }
    return days
  }

  return {
    currentMonth,
    selectedDate,
    setSelectedDate,
    nextMonth,
    prevMonth,
    monthLabel,
    getDays,
    today,
  }
}
