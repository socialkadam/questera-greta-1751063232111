import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { authHelpers } from '../lib/supabase'
import { FaUser, FaLock, FaGoogle, FaApple, FaCheckCircle } from 'react-icons/fa'
import ScrollToTop from '../components/ScrollToTop'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Get redirect path from location state
  const from = location.state?.from?.pathname || '/'

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSocialLogin = (provider) => {
    // For now, show a coming soon message
    alert(`${provider} login coming soon! Please use email login for now.`)
  }

  const validateForm = () => {
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

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      console.log('🔄 Starting login process...')
      
      const { data, error: signInError } = await authHelpers.signIn(
        formData.email,
        formData.password
      )

      if (signInError) {
        throw signInError
      }

      if (!data.user) {
        throw new Error('Login failed')
      }

      console.log('✅ Login successful')

      // Get user profile
      const { data: profile, error: profileError } = await authHelpers.getCurrentProfile()
      
      if (profileError) {
        console.warn('Could not fetch profile:', profileError)
      }

      // Show success
      setSuccess(true)

      // Login with profile data
      login({
        id: data.user.id,
        email: data.user.email,
        ...profile
      })

      // Redirect after short delay
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 1500)

    } catch (err) {
      console.error('❌ Login failed:', err)
      
      // Handle specific errors
      if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.')
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link before signing in.')
      } else if (err.message?.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a moment and try again.')
      } else {
        setError(err.message || 'Failed to sign in. Please try again.')
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
              Welcome Back!
            </h2>
            
            <p className="text-gray-600 kadam-body mb-6">
              You've been signed in successfully. Redirecting you now...
            </p>

            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kadam-deep-green mx-auto"></div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kadam-off-white flex items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full space-y-8"
      >
        <div className="kadam-card-elevated p-12">
          <div className="text-center mb-12">
            <h2 className="kadam-heading text-3xl mb-4">Welcome Back</h2>
            <p className="kadam-body text-gray-600 text-lg">
              Sign in to continue your transformation journey
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 kadam-body-medium"
            >
              <FaGoogle className="mr-3 text-red-500 text-xl" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('Apple')}
              className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 kadam-body-medium"
            >
              <FaApple className="mr-3 text-black text-xl" />
              Continue with Apple
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-kadam-off-white text-gray-500 kadam-body">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-gray-700 kadam-body-medium text-lg mb-3">Email Address</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  required
                  className="kadam-input pl-14 text-lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium text-lg mb-3">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  required
                  className="kadam-input pl-14 text-lg"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-kadam-gold focus:ring-kadam-gold border-gray-300 rounded"
                  disabled={loading}
                />
                <label htmlFor="remember-me" className="ml-3 block kadam-body text-gray-700">
                  Remember me
                </label>
              </div>

              <div>
                <a href="#" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full kadam-button text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 kadam-body">
              Don't have an account?{' '}
              <Link to="/signup" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                Sign up here
              </Link>
            </p>
            <p className="text-gray-600 kadam-body mt-2">
              Want to become a wizard?{' '}
              <Link to="/signup-wizard" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                Apply as Wizard
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      <ScrollToTop />
    </div>
  )
}

export default Login