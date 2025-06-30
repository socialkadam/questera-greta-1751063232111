import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#013D39' }} className="border-t border-gray-600">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751085144022-WIZARDOO%20%28GRETA%20LOGO%29.png"
                alt="Wizardoo Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span
                className="font-display font-bold text-3xl text-white"
                style={{ display: 'none' }}
              >
                WIZARDOO
              </span>
            </div>
            <p className="text-kadam-gold font-semibold text-xl mb-6 kadam-subheading">
              Your Personal Transformation Engine
            </p>
            <p className="text-white max-w-md kadam-body leading-relaxed">
              Connect with expert coaches, consultants, counselors, and mentors who will guide you towards clarity, purpose, and meaningful transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="kadam-subheading text-xl mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/wizards"
                  className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
                >
                  Find Wizards
                </Link>
              </li>
              <li>
                <Link
                  to="/become-wizard"
                  className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
                >
                  Become a Wizard
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="kadam-subheading text-xl mb-6 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-kadam-gold transition-colors p-3 rounded-xl hover:bg-gray-700"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-kadam-gold transition-colors p-3 rounded-xl hover:bg-gray-700"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-kadam-gold transition-colors p-3 rounded-xl hover:bg-gray-700"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black/20 border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-white kadam-body">
            © {new Date().getFullYear()} Wizardoo. All rights reserved.
          </div>
          <div className="flex items-center space-x-8">
            <Link
              to="/privacy"
              className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white hover:text-kadam-gold transition-colors kadam-body-medium"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer