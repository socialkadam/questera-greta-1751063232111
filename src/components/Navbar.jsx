import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUtensils } from 'react-icons/fa';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaUtensils className="text-orange-500 text-2xl" />
              <span className="font-bold text-xl text-gray-800">Foodie's Delight</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-500">Home</Link>
            <Link to="/recipes" className="text-gray-600 hover:text-orange-500">Recipes</Link>
            <Link to="/categories" className="text-gray-600 hover:text-orange-500">Categories</Link>
            <Link to="/about" className="text-gray-600 hover:text-orange-500">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-orange-500">Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-orange-500">Profile</Link>
                <button
                  onClick={logout}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
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