import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCheckCircle, FaClock, FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

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
      
      // Mock enrollment check - always show not enrolled for demo
      setEnrollmentStatus('not_enrolled');
      setCheckoutUrl(`https://wizardoo.thrivecart.com/academy-${archetype}`);
      
      if (onEnrollmentChange) {
        onEnrollmentChange(false);
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