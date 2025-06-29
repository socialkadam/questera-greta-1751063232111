import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import UserRoleSelector from './UserRoleSelector'

function Navbar() {
  const { isAuthenticated, logout, user, hasPermission } = useAuth()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751085144022-WIZARDOO%20%28GRETA%20LOGO%29.png" 
                alt="Wizardoo Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span 
                className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-kadam-deep-green ml-2"
                style={{ display: 'none' }}
              >
                WIZARDOO
              </span>
            </Link>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            <Link
              to="/about"
              className={`font-medium transition-all duration-300 text-base xl:text-lg ${
                isActive('/about')
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1'
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              About
            </Link>
            <Link
              to="/wizards"
              className={`font-medium transition-all duration-300 text-base xl:text-lg ${
                isActive('/wizards')
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1'
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Our Wizards
            </Link>
            <Link
              to="/blog"
              className={`font-medium transition-all duration-300 text-base xl:text-lg ${
                isActive('/blog')
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1'
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className={`font-medium transition-all duration-300 text-base xl:text-lg ${
                isActive('/contact')
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1'
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side - Auth & User Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Role Selector */}
                  <UserRoleSelector />
                  
                  {/* Dashboard Link - Role-based */}
                  {hasPermission('canAccessDashboard') && (
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-kadam-deep-green transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  {/* Profile Link */}
                  <Link
                    to="/profile"
                    className="flex items-center text-gray-600 hover:text-kadam-deep-green transition-colors font-medium"
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="border-2 border-kadam-deep-green text-kadam-deep-green hover:bg-kadam-deep-green hover:text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 text-sm lg:text-base"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-kadam-deep-green hover:text-kadam-medium-green font-semibold transition-colors text-sm lg:text-base"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-2 px-4 lg:py-3 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-medium border-2 border-kadam-deep-green text-sm lg:text-base"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-kadam-deep-green transition-colors p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Mobile Menu Slide-out */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:hidden ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751085144022-WIZARDOO%20%28GRETA%20LOGO%29.png" 
                alt="Wizardoo Logo" 
                className="h-8 w-auto mr-3"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span 
                className="font-display font-bold text-lg text-kadam-deep-green"
                style={{ display: 'none' }}
              >
                WIZARDOO
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="text-gray-600 hover:text-kadam-deep-green transition-colors p-2"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="py-6">
            <div className="space-y-1">
              <Link
                to="/about"
                className={`block px-6 py-3 text-lg font-medium transition-colors ${
                  isActive('/about')
                    ? 'text-kadam-deep-green bg-kadam-light-green border-r-4 border-kadam-gold'
                    : 'text-gray-600 hover:text-kadam-deep-green hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                About
              </Link>
              
              <Link
                to="/wizards"
                className={`block px-6 py-3 text-lg font-medium transition-colors ${
                  isActive('/wizards')
                    ? 'text-kadam-deep-green bg-kadam-light-green border-r-4 border-kadam-gold'
                    : 'text-gray-600 hover:text-kadam-deep-green hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Our Wizards
              </Link>
              
              <Link
                to="/blog"
                className={`block px-6 py-3 text-lg font-medium transition-colors ${
                  isActive('/blog')
                    ? 'text-kadam-deep-green bg-kadam-light-green border-r-4 border-kadam-gold'
                    : 'text-gray-600 hover:text-kadam-deep-green hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
              
              <Link
                to="/contact"
                className={`block px-6 py-3 text-lg font-medium transition-colors ${
                  isActive('/contact')
                    ? 'text-kadam-deep-green bg-kadam-light-green border-r-4 border-kadam-gold'
                    : 'text-gray-600 hover:text-kadam-deep-green hover:bg-gray-50'
                }`}
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

              {/* Auth Section for Mobile */}
              {isAuthenticated ? (
                <>
                  {/* Role Selector in Mobile */}
                  <div className="px-6 py-3">
                    <UserRoleSelector />
                  </div>
                  
                  {hasPermission('canAccessDashboard') && (
                    <Link
                      to="/dashboard"
                      className={`block px-6 py-3 text-lg font-medium transition-colors ${
                        isActive('/dashboard')
                          ? 'text-kadam-deep-green bg-kadam-light-green border-r-4 border-kadam-gold'
                          : 'text-gray-600 hover:text-kadam-deep-green hover:bg-gray-50'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <Link
                    to="/profile"
                    className={`flex items-center px-6 py-3 text-lg font-medium transition-colors ${
                      isActive('/profile')
                        ? 'text-kadam-deep-green bg-kadam-light-green border-r-4 border-kadam-gold'
                        : 'text-gray-600 hover:text-kadam-deep-green hover:bg-gray-50'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <FaUser className="mr-3" />
                    Profile
                  </Link>
                  
                  <button
                    onClick={() => {
                      logout()
                      closeMobileMenu()
                    }}
                    className="w-full text-left px-6 py-3 text-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="px-6 py-3 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center border-2 border-kadam-deep-green text-kadam-deep-green hover:bg-kadam-deep-green hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar