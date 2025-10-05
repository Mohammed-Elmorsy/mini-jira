import type { User } from '../types'
import api from './axios'

export interface AuthResponse {
  access_token: string
  user: User
}

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/login', {
    email,
    password,
  })
  return data
}

export const register = async (
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/auth/register', {
    email,
    password,
    name,
  })
  return data
}
