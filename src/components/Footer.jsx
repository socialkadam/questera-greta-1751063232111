import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Foodie's Delight</h3>
            <p className="text-gray-300">Sharing the joy of cooking with food lovers everywhere.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/recipes" className="text-gray-300 hover:text-orange-500">Recipes</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-orange-500">Categories</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-orange-500">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-500">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaInstagram size={24} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-gray-800"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300 flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-2" /> by Foodie's Delight © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;