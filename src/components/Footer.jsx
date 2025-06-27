import { FaInstagram, FaLinkedin, FaYoutube, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-kadam-off-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
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
            </div>
            <p className="text-kadam-gold font-semibold text-xl mb-6 kadam-subheading">
              Your Personal Transformation Engine
            </p>
            <p className="text-gray-600 max-w-md kadam-body leading-relaxed">
              Connect with expert coaches, consultants, counselors, and mentors who will guide you towards clarity, purpose, and meaningful transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="kadam-subheading text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-kadam-deep-green transition-colors kadam-body-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-kadam-deep-green transition-colors kadam-body-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 hover:text-kadam-deep-green transition-colors kadam-body-medium"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 hover:text-kadam-deep-green transition-colors kadam-body-medium"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/become-wizard" 
                  className="text-gray-600 hover:text-kadam-deep-green transition-colors kadam-body-medium"
                >
                  Become a Wizard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="kadam-subheading text-xl mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-kadam-gold transition-colors p-3 rounded-xl hover:bg-gray-100"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-kadam-gold transition-colors p-3 rounded-xl hover:bg-gray-100"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-kadam-gold transition-colors p-3 rounded-xl hover:bg-gray-100"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 flex items-center justify-center kadam-body">
            Made with <FaHeart className="text-kadam-gold mx-2" /> by Wizardoo © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;