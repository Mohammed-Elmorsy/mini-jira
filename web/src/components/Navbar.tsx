import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Brand / Logo */}
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:text-indigo-200 transition-colors"
      >
        Mini Jira
      </Link>

      {/* Navigation links */}
      <div className="flex items-center space-x-3">
        {user ? (
          <>
            <Link
              to="/tasks"
              className="px-4 py-2 rounded-md hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-150 shadow-sm"
            >
              Tasks
            </Link>
            <button
              onClick={handleLogout}
              className="bg-pink-500 px-4 py-2 rounded-md shadow-sm hover:bg-pink-600 active:bg-pink-700 transition-colors duration-150"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-150 shadow-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md hover:bg-indigo-500 active:bg-indigo-700 transition-colors duration-150 shadow-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
