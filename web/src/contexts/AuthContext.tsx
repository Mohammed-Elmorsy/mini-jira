import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import {
  login as loginApi,
  register as registerApi,
  getProfile,
} from '../api/auth'

interface User {
  id: number
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )
  const [loading, setLoading] = useState(true)

  // Load profile if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const data = await getProfile()
          setUser(data)
        } catch {
          logout()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [token])

  const login = async (email: string, password: string) => {
    setLoading(true)
    const { access_token } = await loginApi(email, password)
    setToken(access_token)
    localStorage.setItem('token', access_token)
    const profile = await getProfile()
    setUser(profile)
    setLoading(false)
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    const { access_token } = await registerApi(email, password)
    setToken(access_token)
    localStorage.setItem('token', access_token)
    const profile = await getProfile()
    setUser(profile)
    setLoading(false)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
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
