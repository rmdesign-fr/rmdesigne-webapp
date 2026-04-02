import { useEffect } from 'react'
import useAuthStore from '../store/authStore'

export default function useAuth() {
  const store = useAuthStore()

  useEffect(() => {
    store.checkAuth()
  }, [])

  return {
    admin: store.admin,
    isAuthenticated: store.isAuthenticated,
    loading: store.loading,
    login: store.login,
    logout: store.logout,
  }
}
