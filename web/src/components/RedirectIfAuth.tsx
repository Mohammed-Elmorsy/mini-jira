import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export default function RedirectIfAuth({ children }: Props) {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/tasks" replace />
  }

  return <>{children}</>
}
