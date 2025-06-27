import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-kadam-off-white shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://wizardoo.com/logo.png" 
                alt="Wizardoo Logo" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span 
                className="font-display font-bold text-3xl text-kadam-deep-green"
                style={{ display: 'none' }}
              >
                WIZARDOO
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-12">
            <Link 
              to="/"
              className={`font-medium transition-all duration-300 text-lg ${
                isActive('/') 
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1' 
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/wizards"
              className={`font-medium transition-all duration-300 text-lg ${
                isActive('/wizards') 
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1' 
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Wizards
            </Link>
            <Link 
              to="/about"
              className={`font-medium transition-all duration-300 text-lg ${
                isActive('/about') 
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1' 
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              About
            </Link>
            <Link 
              to="/blog"
              className={`font-medium transition-all duration-300 text-lg ${
                isActive('/blog') 
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1' 
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact"
              className={`font-medium transition-all duration-300 text-lg ${
                isActive('/contact') 
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1' 
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                <Link 
                  to="/profile" 
                  className="flex items-center text-gray-600 hover:text-kadam-deep-green transition-colors"
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={logout}
                  className="kadam-button-outline text-sm py-3 px-6"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="kadam-button text-sm py-3 px-6"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;