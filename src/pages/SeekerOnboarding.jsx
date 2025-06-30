import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import SeekerQuiz from '../components/SeekerQuiz';
import ScrollToTop from '../components/ScrollToTop';

function SeekerOnboarding() {
  const { user } = useAuth();
  const [hasExistingProfile, setHasExistingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [existingResult, setExistingResult] = useState(null);

  useEffect(() => {
    checkExistingProfile();
  }, [user]);

  const checkExistingProfile = async () => {
    if (!user) return;

    try {
      // Check localStorage for existing quiz result
      const savedResult = localStorage.getItem(`seeker_profile_${user.id}`);
      if (savedResult) {
        const parsed = JSON.parse(savedResult);
        setHasExistingProfile(true);
        setExistingResult(parsed);
      }
    } catch (error) {
      console.error('Error checking existing profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (result) => {
    // Save to localStorage
    localStorage.setItem(`seeker_profile_${user.id}`, JSON.stringify(result));
    setHasExistingProfile(true);
    setExistingResult(result);
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem(`seeker_profile_${user.id}`);
    setHasExistingProfile(false);
    setExistingResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-kadam-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kadam-deep-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kadam-off-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {!hasExistingProfile ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="kadam-heading text-5xl mb-6 text-kadam-deep-green">
                Discover Your Guidance Style
              </h1>
              <p className="text-2xl text-gray-600 kadam-body-medium max-w-3xl mx-auto">
                Take our personalized quiz to find the perfect wizard archetype for your transformation journey
              </p>
            </motion.div>

            {/* Quiz Component */}
            <SeekerQuiz onComplete={handleQuizComplete} />
          </>
        ) : (
          <>
            {/* Existing Profile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="kadam-heading text-4xl mb-6 text-kadam-deep-green">
                Welcome Back!
              </h1>
              <p className="text-xl text-gray-600 kadam-body-medium">
                You've already completed your archetype assessment. Your recommended type is{' '}
                <span className="text-kadam-deep-green font-bold capitalize">
                  {existingResult?.recommendedArchetype}
                </span>
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = `/wizards?type=${existingResult?.recommendedArchetype}&recommended=true`}
                  className="kadam-button text-lg px-8 py-4"
                >
                  Find Your {existingResult?.recommendedArchetype?.charAt(0).toUpperCase() + existingResult?.recommendedArchetype?.slice(1)}
                </button>
                <button
                  onClick={handleRetakeQuiz}
                  className="kadam-button-outline text-lg px-8 py-4"
                >
                  Retake Quiz
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}

export default SeekerOnboarding;