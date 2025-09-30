import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

interface Props {
  children: React.ReactNode
}

const RedirectIfAuth = (props: Props): JSX.Element => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/tasks" replace />
  }

  return <>{props.children}</>
}

export default RedirectIfAuth
