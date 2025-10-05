import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from './ui/LoadingScreen'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, token, initialized } = useAuth()

  if (!initialized) {
    return <LoadingScreen message="Checking session..." />
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
