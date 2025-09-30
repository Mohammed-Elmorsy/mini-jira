import type { JSX } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import Button from './ui/Button'

const Navbar = (): JSX.Element => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const baseLink =
    'font-medium px-4 py-2 rounded-md transition-colors duration-150 shadow-sm'
  const activeLink = 'bg-indigo-700 text-white'
  const inactiveLink = 'hover:bg-indigo-500 text-indigo-100'

  // Avatar fallback (first letter of email or name)
  const avatarLetter =
    user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Left links */}
      <div className="flex items-center space-x-4">
        {user && (
          <>
            {/* Avatar + Name as NavLink */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-1 rounded-full transition ${
                  isActive
                    ? 'bg-indigo-700'
                    : 'bg-indigo-500 hover:bg-indigo-400'
                }`
              }
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-400 text-white font-bold">
                {avatarLetter}
              </div>
              <span className="text-sm font-medium truncate max-w-[120px]">
                {user.name || user.email}
              </span>
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Tasks
            </NavLink>
          </>
        )}
      </div>

      {/* Right links */}
      <div className="flex items-center space-x-3">
        {user ? (
          <div>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : inactiveLink}`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
