import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaLock, FaEnvelope, FaArrowRight, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import { authHelpers, wizardHelpers, supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import ScrollToTop from '../components/ScrollToTop'

const WIZARD_TYPES = [
  { value: 'coach', label: 'Coach', description: 'Help others achieve specific goals and improve performance', icon: '🎯' },
  { value: 'consultant', label: 'Consultant', description: 'Provide strategic insights and expert problem-solving', icon: '🧠' },
  { value: 'counselor', label: 'Counselor', description: 'Offer emotional support and healing-focused guidance', icon: '❤️' },
  { value: 'mentor', label: 'Mentor', description: 'Share wisdom and guide personal/professional development', icon: '💡' }
]

const SPECIALIZATIONS = {
  coach: ['career', 'fitness', 'productivity', 'life', 'wellness', 'leadership'],
  consultant: ['business', 'strategy', 'marketing', 'operations', 'finance', 'startup'],
  counselor: ['stress', 'relationships', 'mental_health', 'trauma', 'grief', 'anxiety'],
  mentor: ['entrepreneurship', 'personal_growth', 'career', 'leadership']
}

function SignupWizard() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState([])

  // 🔥 SIMPLIFIED FORM DATA
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2: Wizard Type
    wizard_type: '',
    specialization: '',
    // Step 3: Professional Details
    title: '',
    experience_years: '',
    hourly_rate: '',
    bio: '',
    why_wizard: '',
    certifications: '',
    education: '',
    languages: 'English',
    session_types: ['video']
  })

  const addDebugInfo = (message) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugInfo(prev => [...prev, `[${timestamp}] ${message}`])
    console.log(`[DEBUG] ${message}`)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value] 
        : prev[field].filter(item => item !== value)
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.full_name.trim()) { setError('Full name is required'); return false }
        if (!formData.email.trim()) { setError('Email is required'); return false }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError('Please enter a valid email address'); return false }
        if (!formData.password) { setError('Password is required'); return false }
        if (formData.password.length < 6) { setError('Password must be at least 6 characters long'); return false }
        if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return false }
        break
      case 2:
        if (!formData.wizard_type) { setError('Please select your wizard type'); return false }
        if (!formData.specialization) { setError('Please select your specialization'); return false }
        break
      case 3:
        if (!formData.title.trim()) { setError('Professional title is required'); return false }
        if (!formData.experience_years || formData.experience_years < 1) { setError('Years of experience is required (minimum 1)'); return false }
        if (!formData.bio.trim()) { setError('Professional bio is required'); return false }
        if (!formData.why_wizard.trim()) { setError('Please explain why you became a wizard'); return false }
        break
    }
    return true
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
      setError('')
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
    setError('')
  }

  // 🔥 BULLETPROOF SUBMIT WITH EXTRA SAFETY
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(3)) return

    setLoading(true)
    setError('')
    setDebugInfo([])

    try {
      addDebugInfo('🔥 Starting BULLETPROOF wizard signup...')

      // Step 1: Create user account
      addDebugInfo('📧 Creating user account with email: ' + formData.email)
      const { data: authData, error: authError } = await authHelpers.signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.full_name,
          role: 'wizard'
        }
      )

      if (authError) {
        addDebugInfo('❌ Auth error: ' + authError.message)
        throw authError
      }

      if (!authData.user) {
        throw new Error('Failed to create account')
      }

      addDebugInfo('✅ User created successfully: ' + authData.user.id)

      // Step 2: Wait for trigger to create profile (extra safety)
      addDebugInfo('⏳ Waiting for profile creation...')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds

      // Step 3: Verify profile exists before creating wizard profile
      addDebugInfo('🔍 Verifying profile exists...')
      const { data: profile, error: profileError } = await authHelpers.getCurrentProfile()
      
      if (profileError || !profile) {
        addDebugInfo('❌ Profile verification failed, creating manually...')
        
        // Fallback: Create profile manually if trigger failed
        const { error: manualProfileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.full_name,
            email: formData.email,
            role: 'wizard'
          })

        if (manualProfileError) {
          addDebugInfo('❌ Manual profile creation failed: ' + manualProfileError.message)
          throw new Error('Failed to create user profile: ' + manualProfileError.message)
        }
        
        addDebugInfo('✅ Profile created manually')
      } else {
        addDebugInfo('✅ Profile verified successfully')
      }

      // Step 4: Create wizard profile
      addDebugInfo('🧙‍♂️ Creating wizard profile...')
      const wizardData = {
        wizard_type: formData.wizard_type,
        specialization: formData.specialization,
        title: formData.title,
        experience_years: parseInt(formData.experience_years),
        hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
        bio_detailed: formData.bio,
        why_wizard: formData.why_wizard,
        certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()) : [],
        education: formData.education || null,
        languages: formData.languages.split(',').map(l => l.trim()),
        session_types: formData.session_types
      }

      const { data: wizardResult, error: wizardError } = await wizardHelpers.createWizardProfile(
        wizardData,
        authData.user.id
      )

      if (wizardError) {
        addDebugInfo('❌ Wizard profile creation failed: ' + wizardError.message)
        throw wizardError
      }

      addDebugInfo('✅ Wizard profile created successfully!')

      // Success!
      setSuccess(true)
      login({
        id: authData.user.id,
        email: authData.user.email,
        full_name: formData.full_name,
        role: 'wizard',
        wizard_type: formData.wizard_type,
        status: 'pending'
      })

      // Redirect after success
      setTimeout(() => {
        navigate('/wizard-pending-approval')
      }, 2000)

    } catch (err) {
      addDebugInfo('❌ Signup failed: ' + err.message)
      console.error('❌ Signup failed:', err)
      
      if (err.message?.includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        setError(err.message || 'Something went wrong. Please try again.')
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
              className="inline-flex items-center justify-center w-20 h-20 bg-kadam-gold rounded-full mb-6"
            >
              <FaWandMagicSparkles className="text-4xl text-kadam-deep-green" />
            </motion.div>
            <h2 className="kadam-heading text-3xl mb-4 text-kadam-deep-green">🎉 Success!</h2>
            <p className="text-gray-600 kadam-body mb-6">
              Your wizard application has been submitted successfully!
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-kadam-deep-green mx-auto"></div>
          </div>
        </motion.div>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="kadam-heading text-3xl mb-4">Create Your Account</h2>
              <p className="text-gray-600 kadam-body">Let's start with your basic information</p>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Full Name *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-kadam-gold transition-all"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Email Address *</label>
              <input
                type="email"
                required
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-kadam-gold transition-all"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Password *</label>
              <input
                type="password"
                required
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-kadam-gold transition-all"
                placeholder="Create a password (min 6 characters)"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Confirm Password *</label>
              <input
                type="password"
                required
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-kadam-gold transition-all"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-8">
              <h2 className="kadam-heading text-3xl mb-4">Choose Your Wizard Type</h2>
              <p className="text-gray-600 kadam-body">What type of guidance do you want to provide?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WIZARD_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('wizard_type', type.value)}
                  className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
                    formData.wizard_type === type.value
                      ? 'border-kadam-gold bg-kadam-light-green'
                      : 'border-gray-200 hover:border-kadam-gold'
                  }`}
                >
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="kadam-subheading text-lg mb-2">{type.label}</h3>
                  <p className="text-gray-600 text-sm">{type.description}</p>
                </button>
              ))}
            </div>

            {formData.wizard_type && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <label className="block text-gray-700 kadam-body-medium mb-4">Choose Your Specialization *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SPECIALIZATIONS[formData.wizard_type]?.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => handleInputChange('specialization', spec)}
                      className={`p-3 border-2 rounded-xl transition-all duration-300 ${
                        formData.specialization === spec
                          ? 'border-kadam-gold bg-kadam-gold text-kadam-deep-green'
                          : 'border-gray-200 hover:border-kadam-gold'
                      }`}
                    >
                      {spec.charAt(0).toUpperCase() + spec.slice(1).replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="kadam-heading text-3xl mb-4">Professional Details</h2>
              <p className="text-gray-600 kadam-body">Tell us about your expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 kadam-body-medium mb-3">Professional Title *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kadam-gold transition-all"
                  placeholder="e.g., Senior Career Coach"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 kadam-body-medium mb-3">Years of Experience *</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kadam-gold transition-all"
                  placeholder="e.g., 5"
                  value={formData.experience_years}
                  onChange={(e) => handleInputChange('experience_years', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 kadam-body-medium mb-3">Hourly Rate (USD)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kadam-gold transition-all"
                  placeholder="e.g., 150.00"
                  value={formData.hourly_rate}
                  onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 kadam-body-medium mb-3">Languages</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kadam-gold transition-all"
                  placeholder="English, Spanish, French"
                  value={formData.languages}
                  onChange={(e) => handleInputChange('languages', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Professional Bio *</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kadam-gold transition-all resize-none"
                placeholder="Describe your background and expertise..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Why Did You Become a Wizard? *</label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kadam-gold transition-all resize-none"
                placeholder="Share your motivation for helping others..."
                value={formData.why_wizard}
                onChange={(e) => handleInputChange('why_wizard', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium mb-3">Session Types You Offer</label>
              <div className="flex gap-4">
                {['video', 'phone', 'chat'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.session_types.includes(type)}
                      onChange={(e) => handleArrayChange('session_types', type, e.target.checked)}
                      className="mr-2 h-4 w-4 text-kadam-gold focus:ring-kadam-gold border-gray-300 rounded"
                    />
                    <span className="capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-kadam-off-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="kadam-card-elevated p-8">
            {/* Logo and Progress */}
            <div className="text-center mb-8">
              <img
                src="https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1751289647670-WIZARDOO%20%28GRETA%20LOGO%29%20%281%29.png"
                alt="Wizardoo Logo"
                className="h-12 w-auto mx-auto mb-6"
              />
              
              <div className="flex items-center justify-center mb-4">
                <span className="kadam-body-medium text-kadam-deep-green">
                  Step {currentStep} of 3
                </span>
                <span className="text-gray-500 ml-4">
                  {Math.round((currentStep / 3) * 100)}% Complete
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                <div 
                  className="bg-kadam-gold h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {renderStep()}

              {/* Debug Information */}
              {debugInfo.length > 0 && (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
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
                    className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center kadam-button-outline px-6 py-3"
                    >
                      <FaArrowLeft className="mr-2" />
                      Previous
                    </button>
                  )}
                </div>

                <div>
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center kadam-button px-6 py-3"
                    >
                      Next
                      <FaArrowRight className="ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center kadam-button disabled:opacity-50 px-6 py-3"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <FaWandMagicSparkles className="mr-2" />
                          Become a Wizard
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-600">
              <Link to="/login" className="hover:text-kadam-deep-green">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <ScrollToTop />
    </div>
  )
}

export default SignupWizard