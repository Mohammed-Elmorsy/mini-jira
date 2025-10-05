import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type JSX,
} from 'react'
import { login as loginApi, register as registerApi } from '../api/auth'
import { useProfile } from '../hooks/useProfile'
import type { User } from '../types'

interface AuthContextType {
  user: User | undefined
  token: string | null
  loading: boolean
  initialized: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

interface Props {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: Props): JSX.Element => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )
  const [initialized, setInitialized] = useState(false)

  const { profile: user, isLoading, refetchUser, clearProfile } = useProfile()

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          await refetchUser()
        } catch {
          setToken(null)
          clearProfile()
        }
      }
      setInitialized(true)
    }
    init()
  }, [token])

  const login = async (email: string, password: string) => {
    const { access_token, user } = await loginApi(email, password)
    setToken(access_token)
    if (user) await refetchUser()
  }

  const register = async (email: string, password: string, name?: string) => {
    const { access_token, user } = await registerApi(email, password, name)
    setToken(access_token)
    if (user) await refetchUser()
  }

  const refreshUser = async () => {
    await refetchUser()
  }

  const logout = () => {
    setToken(null)
    clearProfile()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading: isLoading,
        initialized,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export default AuthProvider
