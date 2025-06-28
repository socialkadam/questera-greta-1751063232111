import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {FaUser, FaLock, FaEnvelope, FaArrowRight, FaArrowLeft} from 'react-icons/fa';
import {FaWandMagicSparkles} from 'react-icons/fa6';
import {authHelpers, wizardHelpers} from '../lib/supabase';
import ScrollToTop from '../components/ScrollToTop';

const WIZARD_TYPES = [
  {
    value: 'coach',
    label: 'Coach',
    description: 'Help others achieve specific goals and improve performance',
    icon: '🎯'
  },
  {
    value: 'consultant', 
    label: 'Consultant',
    description: 'Provide strategic insights and expert problem-solving',
    icon: '🧠'
  },
  {
    value: 'counselor',
    label: 'Counselor', 
    description: 'Offer emotional support and healing-focused guidance',
    icon: '❤️'
  },
  {
    value: 'mentor',
    label: 'Mentor',
    description: 'Share wisdom and guide personal/professional development',
    icon: '💡'
  }
];

const SPECIALIZATIONS = {
  coach: ['career', 'fitness', 'productivity', 'life', 'wellness', 'leadership'],
  consultant: ['business', 'strategy', 'marketing', 'operations', 'finance', 'startup'],
  counselor: ['stress', 'relationships', 'mental_health', 'trauma', 'grief', 'anxiety'],
  mentor: ['entrepreneurship', 'personal_growth', 'career', 'leadership']
};

function SignupWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form data
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
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    setError('');
  };

  const handleArrayChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.full_name || !formData.email || !formData.password) {
          setError('Please fill in all required fields');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return false;
        }
        break;
        
      case 2:
        if (!formData.wizard_type || !formData.specialization) {
          setError('Please select your wizard type and specialization');
          return false;
        }
        break;
        
      case 3:
        if (!formData.title || !formData.experience_years || !formData.bio || !formData.why_wizard) {
          setError('Please fill in all required fields');
          return false;
        }
        break;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setError('');

    try {
      // Step 1: Create user account
      const { data: authData, error: authError } = await authHelpers.signUp(
        formData.email,
        formData.password,
        {
          full_name: formData.full_name,
          role: 'wizard'
        }
      );

      if (authError) {
        throw new Error(authError.message);
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Step 2: Create wizard profile
      const wizardData = {
        id: authData.user.id,
        wizard_type: formData.wizard_type,
        specialization: formData.specialization,
        title: formData.title,
        experience_years: parseInt(formData.experience_years),
        hourly_rate: parseFloat(formData.hourly_rate) || null,
        bio_detailed: formData.bio,
        why_wizard: formData.why_wizard,
        certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()) : [],
        education: formData.education || null,
        languages: formData.languages.split(',').map(l => l.trim()),
        session_types: formData.session_types,
        status: 'pending' // Awaiting admin approval
      };

      const { error: wizardError } = await wizardHelpers.createWizardProfile(wizardData);

      if (wizardError) {
        throw new Error(wizardError.message);
      }

      // Success - redirect to pending approval page
      navigate('/wizard-pending-approval');

    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create wizard account');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="kadam-heading text-3xl mb-4">Create Your Account</h2>
              <p className="text-gray-600">Let's start with your basic information</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  className="kadam-input pl-10"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  className="kadam-input pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password *</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  className="kadam-input pl-10"
                  placeholder="Create a password (min 6 characters)"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password *</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  className="kadam-input pl-10"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="kadam-heading text-3xl mb-4">Choose Your Wizard Type</h2>
              <p className="text-gray-600">What type of guidance do you want to provide?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WIZARD_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleInputChange('wizard_type', type.value)}
                  className={`p-6 border-2 rounded-2xl text-left transition-all duration-300 ${
                    formData.wizard_type === type.value
                      ? 'border-kadam-gold bg-kadam-light-green'
                      : 'border-gray-200 hover:border-kadam-gold hover:bg-gray-50'
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
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="mt-8"
              >
                <label className="block text-gray-700 font-medium mb-4">
                  Choose Your Specialization *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SPECIALIZATIONS[formData.wizard_type]?.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => handleInputChange('specialization', spec)}
                      className={`p-3 border-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        formData.specialization === spec
                          ? 'border-kadam-gold bg-kadam-gold text-kadam-deep-green'
                          : 'border-gray-200 text-gray-700 hover:border-kadam-gold'
                      }`}
                    >
                      {spec.charAt(0).toUpperCase() + spec.slice(1).replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="kadam-heading text-3xl mb-4">Professional Details</h2>
              <p className="text-gray-600">Tell us about your expertise and experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Professional Title *</label>
                <input
                  type="text"
                  required
                  className="kadam-input"
                  placeholder="e.g., Senior Career Coach"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Years of Experience *</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="kadam-input"
                  placeholder="e.g., 5"
                  value={formData.experience_years}
                  onChange={(e) => handleInputChange('experience_years', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Hourly Rate (USD)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="kadam-input"
                placeholder="e.g., 150.00"
                value={formData.hourly_rate}
                onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
              />
              <p className="text-gray-500 text-sm mt-1">Leave blank if you prefer to discuss pricing with clients</p>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Professional Bio *</label>
              <textarea
                required
                rows={4}
                className="kadam-input resize-none"
                placeholder="Describe your background, expertise, and what makes you unique..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Why Did You Become a Wizard? *</label>
              <textarea
                required
                rows={3}
                className="kadam-input resize-none"
                placeholder="Share your motivation for helping others transform their lives..."
                value={formData.why_wizard}
                onChange={(e) => handleInputChange('why_wizard', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Certifications</label>
                <input
                  type="text"
                  className="kadam-input"
                  placeholder="e.g., ICF Certified, MBA, etc. (comma separated)"
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Education</label>
                <input
                  type="text"
                  className="kadam-input"
                  placeholder="e.g., MBA from Stanford University"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Languages</label>
              <input
                type="text"
                className="kadam-input"
                placeholder="e.g., English, Spanish, French (comma separated)"
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-4">Session Types You Offer</label>
              <div className="flex flex-wrap gap-4">
                {['video', 'phone', 'chat'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.session_types.includes(type)}
                      onChange={(e) => handleArrayChange('session_types', type, e.target.checked)}
                      className="mr-2 h-4 w-4 text-kadam-gold focus:ring-kadam-gold border-gray-300 rounded"
                    />
                    <span className="capitalize">{type} Call</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-kadam-off-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        className="max-w-2xl w-full"
      >
        <div className="kadam-card-elevated p-8 md:p-12">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-kadam-deep-green">
                Step {currentStep} of 3
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / 3) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-kadam-gold h-2 rounded-full transition-all duration-300"
                style={{width: `${(currentStep / 3) * 100}%`}}
              ></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center kadam-button-outline"
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
                    className="flex items-center kadam-button"
                  >
                    Next
                    <FaArrowRight className="ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center kadam-button disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Account...
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

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                Sign in here
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              Want to be a seeker instead?{' '}
              <Link to="/signup" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                Sign up as seeker
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      <ScrollToTop />
    </div>
  );
}

export default SignupWizard;