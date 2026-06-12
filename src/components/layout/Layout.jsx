import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

// Match a pathname against a list of route prefixes
const matches = (pathname, routes) =>
  routes.some((p) => pathname === p || pathname.startsWith(p + '/'))

// Routes with NO navbar (have their own chrome / sidebar)
const NO_NAVBAR = ['/csr-dashboard']
// Routes with NO footer (full-screen pages)
const NO_FOOTER = ['/csr-dashboard', '/waste-map']

export default function Layout() {
  const { pathname } = useLocation()
  const showNavbar = !matches(pathname, NO_NAVBAR)
  const showFooter = !matches(pathname, NO_FOOTER)

  return (
    <div className="font-poppins text-gray-900 overflow-x-hidden">
      {showNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </div>
  )
}