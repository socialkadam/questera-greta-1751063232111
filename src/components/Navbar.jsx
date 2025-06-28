import {Link,useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {FaUser} from 'react-icons/fa';

function Navbar() {
  const {isAuthenticated,logout}=useAuth();
  const location=useLocation();
  const isActive=(path)=> location.pathname===path;

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side Navigation */}
          <div className="flex items-center space-x-12">
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
              to="/wizards" 
              className={`font-medium transition-all duration-300 text-lg ${
                isActive('/wizards') 
                  ? 'text-kadam-deep-green border-b-3 border-kadam-gold pb-1' 
                  : 'text-gray-600 hover:text-kadam-deep-green'
              }`}
            >
              Our Wizards
            </Link>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="flex items-center">
              <img 
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751085144022-WIZARDOO%20%28GRETA%20LOGO%29.png" 
                alt="Wizardoo Logo" 
                className="h-12 w-auto" 
                onError={(e)=> {
                  e.target.style.display='none';
                  e.target.nextSibling.style.display='block';
                }} 
              />
              <span 
                className="font-display font-bold text-2xl text-kadam-deep-green" 
                style={{display: 'none'}}
              >
                WIZARDOO
              </span>
            </Link>
          </div>

          {/* Right Side Navigation */}
          <div className="flex items-center space-x-12">
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
                  className="border-2 border-kadam-deep-green text-kadam-deep-green hover:bg-kadam-deep-green hover:text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-soft hover:shadow-medium border-2 border-kadam-deep-green"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-kadam-deep-green transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;