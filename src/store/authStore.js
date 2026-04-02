import { create } from 'zustand'
import api from '../services/api'

const useAuthStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  loading: true,

  login: async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password })
    set({ admin: res.data.admin, isAuthenticated: true })
    return res.data
  },

  logout: async () => {
    await api.post('/api/auth/logout')
    set({ admin: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    try {
      const res = await api.get('/api/auth/me')
      set({ admin: res.data.admin, isAuthenticated: true, loading: false })
    } catch {
      set({ admin: null, isAuthenticated: false, loading: false })
    }
  },
}))

export default useAuthStore
