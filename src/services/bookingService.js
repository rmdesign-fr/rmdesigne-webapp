import api from './api'

const normalizeSlots = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.slots)) return payload.slots
  if (Array.isArray(payload?.data?.slots)) return payload.data.slots
  return []
}

export const getAvailableSlots = (date) =>
  api.get(`/api/bookings/available?date=${date}`).then((r) => {
    const payload = r.data && typeof r.data === 'object' ? r.data : {}
    return {
      ...payload,
      slots: normalizeSlots(r.data),
    }
  })

export const createBooking = (data) =>
  api.post('/api/bookings', data).then(r => r.data)

export const getAllBookings = () =>
  api.get('/api/bookings').then(r => r.data)

export const updateBookingStatus = (id, status) =>
  api.put(`/api/bookings/${id}/status`, { status }).then(r => r.data)

export const deleteBooking = (id) =>
  api.delete(`/api/bookings/${id}`).then(r => r.data)

export const blockSlot = (data) =>
  api.post('/api/bookings/block', data).then(r => r.data)
