import api from './axios'

export const updateUser = async (id: number, updates: { name?: string }) => {
  const { data } = await api.patch(`/users/${id}`, updates)
  return data
}
