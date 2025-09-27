import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p>Loading...</p> // You can replace with a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
