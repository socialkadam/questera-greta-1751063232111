import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaApple, FaCheckCircle } from 'react-icons/fa'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import { authHelpers } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import ScrollToTop from '../components/ScrollToTop'

function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState([])
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const addDebugInfo = (message) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugInfo(prev => [...prev, `[${timestamp}] ${message}`])
    console.log(`[DEBUG] ${message}`)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSocialSignup = (provider) => {
    // For now, show a coming soon message
    alert(`${provider} signup coming soon! Please use email signup for now.`)
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setSuccess(false)
    setDebugInfo([])

    try {
      addDebugInfo('🚀 Starting seeker signup process...')

      // Sign up the user
      addDebugInfo('📧 Creating user account with email: ' + formData.email)
      const { data, error: signupError } = await authHelpers.signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.full_name,
          role: 'seeker'
        }
      )

      if (signupError) {
        addDebugInfo('❌ Signup error: ' + signupError.message)
        throw signupError
      }

      if (!data.user) {
        throw new Error('Failed to create account. Please try again.')
      }

      addDebugInfo('✅ Seeker signup successful! User ID: ' + data.user.id)

      // Show success message
      setSuccess(true)

      // Auto-login the user if account was created
      if (data.user) {
        login({
          id: data.user.id,
          email: data.user.email,
          full_name: formData.full_name,
          role: 'seeker',
          isVerified: data.user.email_confirmed_at ? true : false
        })

        addDebugInfo('🎉 Auto-login successful!')

        // Redirect after short delay to show success
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 2000)
      }

    } catch (err) {
      addDebugInfo('❌ Signup failed: ' + err.message)
      console.error('❌ Signup failed:', err)
      
      // Handle specific Supabase errors
      if (err.message?.includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else if (err.message?.includes('Invalid email')) {
        setError('Please enter a valid email address.')
      } else if (err.message?.includes('Password')) {
        setError('Password must be at least 6 characters long.')
      } else {
        setError(err.message || 'Failed to create account. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-kadam-off-white flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="kadam-card-elevated p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
            >
              <FaCheckCircle className="text-4xl text-green-600" />
            </motion.div>
            <h2 className="kadam-heading text-3xl mb-4 text-kadam-deep-green">
              Welcome to Wizardoo!
            </h2>
            <p className="text-gray-600 kadam-body mb-6">
              Your account has been created successfully. You're being redirected to start your transformation journey!
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kadam-deep-green mx-auto"></div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kadam-off-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="kadam-card-elevated p-8 md:p-10">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751289647670-WIZARDOO%20%28GRETA%20LOGO%29%20%281%29.png"
                alt="Wizardoo Logo"
                className="h-12 w-auto mx-auto"
              />
            </div>
            <h2 className="kadam-heading text-3xl text-kadam-deep-green">Join Wizardoo</h2>
            <p className="mt-2 text-gray-600 kadam-body">
              Start your transformation journey today
            </p>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup('Google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors kadam-body-medium"
            >
              <FaGoogle className="mr-3 text-red-500" />
              Sign up with Google
            </button>
            <button
              onClick={() => handleSocialSignup('Apple')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors kadam-body-medium"
            >
              <FaApple className="mr-3 text-black" />
              Sign up with Apple
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-kadam-off-white text-gray-500 kadam-body">Or sign up with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 kadam-body-medium mb-2">Full Name *</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  className="kadam-input pl-10"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-2">Email Address *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  className="kadam-input pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-2">Password *</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  className="kadam-input pl-10"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-2">Confirm Password *</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  className="kadam-input pl-10"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Debug Information */}
            {debugInfo.length > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-2">Debug Information:</h4>
                <div className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                  {debugInfo.map((info, index) => (
                    <div key={index}>{info}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl kadam-body"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-kadam-gold focus:ring-kadam-gold border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 kadam-body">
                I agree to the{' '}
                <a href="#" className="text-kadam-deep-green hover:text-kadam-medium-green kadam-body-medium">
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-kadam-deep-green hover:text-kadam-medium-green kadam-body-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full kadam-button disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 kadam-body">
              Already have an account?{' '}
              <Link
                to="/login"
                className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Wizard Signup CTA */}
          <div className="mt-8 p-4 bg-kadam-light-green rounded-xl border border-kadam-gold/30">
            <div className="text-center">
              <FaWandMagicSparkles className="text-2xl text-kadam-deep-green mx-auto mb-2" />
              <h3 className="kadam-subheading text-lg mb-2 text-kadam-deep-green">
                Want to become a Wizard?
              </h3>
              <p className="text-gray-600 text-sm mb-3 kadam-body">
                Share your expertise and help others transform their lives
              </p>
              <Link
                to="/signup-wizard"
                className="inline-block bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green font-semibold py-2 px-4 rounded-lg transition-all duration-300 kadam-body-medium"
              >
                Apply as Wizard
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <ScrollToTop />
    </div>
  )
}

export default Signup