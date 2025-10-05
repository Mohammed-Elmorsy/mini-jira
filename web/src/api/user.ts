import type { User } from '../types'
import api from './axios'

export const getProfile = async (): Promise<User> => {
  const { data } = await api.get('/users/profile')
  return data
}

export const updateUser = async (id: number, updates: { name?: string }) => {
  const { data } = await api.patch(`/users/${id}`, updates)
  return data
}
