import type { JSX } from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = (): JSX.Element => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
