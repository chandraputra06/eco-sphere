import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScanWasteFab from './ScanWasteFab'

// Match a pathname against a list of route prefixes
const matches = (pathname, routes) =>
  routes.some((p) => pathname === p || pathname.startsWith(p + '/'))

const NO_NAVBAR = ['/csr-dashboard', '/dashboard', '/admin']
const NO_FOOTER = ['/csr-dashboard', '/waste-map', '/dashboard', '/admin']
const NO_FAB = ['/csr-dashboard', '/waste-map', '/report', '/dashboard', '/admin']

export default function Layout() {
  const { pathname } = useLocation()
  const showNavbar = !matches(pathname, NO_NAVBAR)
  const showFooter = !matches(pathname, NO_FOOTER)
  const showFab = !matches(pathname, NO_FAB)

  return (
    <div className="font-poppins text-gray-900 overflow-x-hidden">
      {showNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
      {showFab && <ScanWasteFab />}
    </div>
  )
}