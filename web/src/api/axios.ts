import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor → attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor → catch expired/invalid tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message

    if (message === 'expired token' || message === 'invalid token') {
      localStorage.removeItem('token')

      toast.error('Session expired. Please log in again.')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  },
)

export default api
