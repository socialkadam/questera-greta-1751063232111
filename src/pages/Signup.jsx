import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaApple } from 'react-icons/fa';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-wizardoo-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-wizardoo-green-800">Join Wizardoo</h2>
            <p className="mt-2 text-wizardoo-neutral-600">
              Start your transformation journey today
            </p>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center px-4 py-3 border border-wizardoo-neutral-300 rounded-lg text-wizardoo-neutral-700 hover:bg-wizardoo-neutral-50 transition-colors">
              <FaGoogle className="mr-3 text-red-500" />
              Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-wizardoo-neutral-300 rounded-lg text-wizardoo-neutral-700 hover:bg-wizardoo-neutral-50 transition-colors">
              <FaApple className="mr-3 text-black" />
              Sign up with Apple
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-wizardoo-neutral-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-wizardoo-neutral-500">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-wizardoo-neutral-700 font-medium mb-2">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wizardoo-neutral-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-wizardoo-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wizardoo-gold-400 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-wizardoo-neutral-700 font-medium mb-2">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wizardoo-neutral-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-wizardoo-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wizardoo-gold-400 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-wizardoo-neutral-700 font-medium mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wizardoo-neutral-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-wizardoo-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wizardoo-gold-400 focus:border-transparent transition-all"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-wizardoo-neutral-700 font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wizardoo-neutral-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-wizardoo-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wizardoo-gold-400 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-wizardoo-gold-400 focus:ring-wizardoo-gold-400 border-wizardoo-neutral-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-wizardoo-neutral-700">
                I agree to the{' '}
                <a href="#" className="text-wizardoo-green-700 hover:text-wizardoo-green-800">
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-wizardoo-green-700 hover:text-wizardoo-green-800">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full wizardoo-button"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-wizardoo-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-wizardoo-green-700 hover:text-wizardoo-green-800">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;