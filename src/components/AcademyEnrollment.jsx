import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCheckCircle, FaClock, FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { thriveCartHelpers } from '../lib/thriveCartApi';

function AcademyEnrollment({ archetype, onEnrollmentChange }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [progress, setProgress] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState('');

  useEffect(() => {
    if (user && archetype) {
      checkEnrollmentStatus();
    }
  }, [user, archetype]);

  const checkEnrollmentStatus = async () => {
    try {
      setLoading(true);
      
      // Check if user has active enrollment
      const hasEnrollment = await thriveCartHelpers.hasActiveEnrollment(user.id, archetype);
      
      if (hasEnrollment) {
        // Get detailed progress
        const productId = `tc_academy_${archetype}`;
        const progressData = await thriveCartHelpers.getUserProgress(user.id, productId);
        setProgress(progressData);
        setEnrollmentStatus('enrolled');
      } else {
        // Generate checkout URL for enrollment
        const url = await thriveCartHelpers.getAcademyCheckoutUrl(user, archetype);
        setCheckoutUrl(url);
        setEnrollmentStatus('not_enrolled');
      }
      
      if (onEnrollmentChange) {
        onEnrollmentChange(hasEnrollment);
      }
      
    } catch (error) {
      console.error('Error checking enrollment status:', error);
      setEnrollmentStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollClick = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kadam-deep-green mx-auto"></div>
        <p className="mt-4 text-gray-600">Checking enrollment status...</p>
      </div>
    );
  }

  if (enrollmentStatus === 'error') {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Academy</h3>
        <p className="text-red-600">Please refresh the page or contact support.</p>
      </div>
    );
  }

  if (enrollmentStatus === 'enrolled' && progress) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-kadam-light-green to-white rounded-2xl p-8 shadow-soft border-2 border-kadam-gold"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-kadam-gold rounded-full mb-4">
            <FaGraduationCap className="text-2xl text-kadam-deep-green" />
          </div>
          <h3 className="kadam-heading text-2xl mb-2 text-kadam-deep-green">
            Academy Enrollment Active
          </h3>
          <p className="text-gray-600 kadam-body">
            {archetype.charAt(0).toUpperCase() + archetype.slice(1)} Certification Program
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="kadam-body-medium text-kadam-deep-green">
              Course Progress
            </span>
            <span className="text-2xl font-bold text-kadam-deep-green">
              {progress.completionPercentage}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <motion.div
              className="bg-gradient-to-r from-kadam-gold to-kadam-soft-gold h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          {/* Status Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FaClock className="text-kadam-deep-green mr-2" />
                <span className="kadam-body-medium">Status</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                progress.enrollment.status === 'completed' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {progress.enrollment.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FaCheckCircle className="text-kadam-deep-green mr-2" />
                <span className="kadam-body-medium">Lessons</span>
              </div>
              <span className="text-lg font-bold text-kadam-deep-green">
                {progress.progress?.filter(p => p.completed).length || 0}
              </span>
              <span className="text-gray-600">
                /{progress.progress?.length || 0}
              </span>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <FaCertificate className="text-kadam-deep-green mr-2" />
                <span className="kadam-body-medium">Certificate</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                progress.certificateUrl 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {progress.certificateUrl ? 'Issued' : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {progress.accessUrl && (
            <button
              onClick={() => window.open(progress.accessUrl, '_blank')}
              className="kadam-button inline-flex items-center justify-center"
            >
              <FaExternalLinkAlt className="mr-2" />
              Continue Learning
            </button>
          )}
          
          {progress.certificateUrl && (
            <button
              onClick={() => window.open(progress.certificateUrl, '_blank')}
              className="kadam-button-outline inline-flex items-center justify-center"
            >
              <FaCertificate className="mr-2" />
              View Certificate
            </button>
          )}
        </div>

        {/* Last Accessed */}
        {progress.enrollment.last_accessed && (
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              Last accessed: {new Date(progress.enrollment.last_accessed).toLocaleDateString()}
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // Not enrolled - show enrollment option
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-soft border-2 border-gray-200 text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
        <FaGraduationCap className="text-2xl text-yellow-600" />
      </div>
      
      <h3 className="kadam-heading text-2xl mb-4 text-kadam-deep-green">
        Enroll in Wizardoo Academy
      </h3>
      
      <p className="text-gray-600 kadam-body mb-6 max-w-md mx-auto">
        Complete our comprehensive {archetype} certification program to become an approved wizard.
      </p>

      {/* Course Features */}
      <div className="bg-kadam-light-green p-6 rounded-xl mb-8">
        <h4 className="kadam-subheading text-lg mb-4 text-kadam-deep-green">
          What You'll Learn
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          <div className="flex items-start">
            <FaCheckCircle className="text-kadam-gold mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-700">Professional {archetype} methodologies</span>
          </div>
          <div className="flex items-start">
            <FaCheckCircle className="text-kadam-gold mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-700">Client management best practices</span>
          </div>
          <div className="flex items-start">
            <FaCheckCircle className="text-kadam-gold mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-700">Ethics and professional standards</span>
          </div>
          <div className="flex items-start">
            <FaCheckCircle className="text-kadam-gold mr-2 mt-1 flex-shrink-0" />
            <span className="text-sm text-gray-700">Wizardoo platform mastery</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleEnrollClick}
        disabled={!checkoutUrl}
        className="kadam-button text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaGraduationCap className="mr-3" />
        Enroll Now - Start Your Journey
      </button>

      <p className="text-gray-500 text-sm mt-4">
        Secure checkout powered by ThriveCart
      </p>
    </motion.div>
  );
}

export default AcademyEnrollment;