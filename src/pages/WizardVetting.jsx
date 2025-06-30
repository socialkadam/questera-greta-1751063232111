import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import WizardVettingQuiz from '../components/WizardVettingQuiz';
import ScrollToTop from '../components/ScrollToTop';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';

function WizardVetting() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [nextAttemptDate, setNextAttemptDate] = useState(null);
  const [lastAttempt, setLastAttempt] = useState(null);

  useEffect(() => {
    checkQuizEligibility();
  }, [user]);

  const checkQuizEligibility = async () => {
    if (!user) return;

    try {
      // Check for recent failed attempts
      const { data: attempts, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .eq('quiz_type', 'wizard_vetting')
        .order('completed_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking quiz attempts:', error);
        return;
      }

      if (attempts && attempts.length > 0) {
        const lastAttempt = attempts[0];
        setLastAttempt(lastAttempt);

        // Check if they need to wait 30 days
        if (lastAttempt.next_attempt_allowed_at) {
          const nextAttemptDate = new Date(lastAttempt.next_attempt_allowed_at);
          const now = new Date();
          
          if (now < nextAttemptDate) {
            setCanTakeQuiz(false);
            setNextAttemptDate(nextAttemptDate);
          }
        }
      }
    } catch (error) {
      console.error('Error checking quiz eligibility:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (result) => {
    // Handle different outcomes
    if (result.status === 'approved') {
      // Redirect to wizard dashboard or success page
      window.location.href = '/wizard-dashboard';
    } else if (result.status === 'academy') {
      // Redirect to academy enrollment
      window.location.href = '/academy';
    } else {
      // Show rejection message and set next attempt date
      setCanTakeQuiz(false);
      setNextAttemptDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-kadam-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kadam-deep-green"></div>
      </div>
    );
  }

  if (!canTakeQuiz && nextAttemptDate) {
    return (
      <div className="min-h-screen bg-kadam-off-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 shadow-soft"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
              <FaClock className="text-4xl text-yellow-600" />
            </div>
            
            <h1 className="kadam-heading text-3xl mb-6 text-kadam-deep-green">
              Quiz Retake Cooldown
            </h1>
            
            <p className="text-xl text-gray-600 kadam-body-medium mb-6">
              You need to wait 30 days before retaking the wizard vetting quiz.
            </p>
            
            <div className="bg-kadam-light-green p-6 rounded-xl mb-8">
              <p className="text-kadam-deep-green font-semibold mb-2">
                Next attempt available:
              </p>
              <p className="text-2xl font-bold text-kadam-deep-green">
                {nextAttemptDate.toLocaleDateString()}
              </p>
            </div>
            
            {lastAttempt && (
              <div className="text-left bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-kadam-deep-green mb-4">Your Last Attempt:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Score:</span>
                    <span className="font-semibold ml-2">{lastAttempt.score}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold ml-2">
                      {new Date(lastAttempt.completed_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <p className="text-gray-600 kadam-body mb-8">
              Use this time to gain more experience in your chosen archetype and study the materials we provide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/academy'}
                className="kadam-button text-lg px-8 py-4"
              >
                Study at Wizardoo Academy
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="kadam-button-outline text-lg px-8 py-4"
              >
                Return to Home
              </button>
            </div>
          </motion.div>
        </div>
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kadam-off-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="kadam-heading text-5xl mb-6 text-kadam-deep-green">
            Wizard Vetting Assessment
          </h1>
          <p className="text-2xl text-gray-600 kadam-body-medium max-w-4xl mx-auto mb-8">
            Complete this comprehensive assessment to demonstrate your expertise and join our certified wizard network
          </p>
          
          {/* Requirements */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-yellow-600 text-2xl mr-3" />
              <span className="kadam-subheading text-lg text-yellow-800">Assessment Requirements</span>
            </div>
            <div className="text-left space-y-2 kadam-body text-yellow-800">
              <p>• <strong>75% or higher:</strong> Immediate wizard certification</p>
              <p>• <strong>60-74%:</strong> Eligible for Wizardoo Academy training</p>
              <p>• <strong>Below 60%:</strong> 30-day waiting period before retake</p>
              <p>• <strong>25 questions</strong> covering your chosen archetype</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz Component */}
        <WizardVettingQuiz onComplete={handleQuizComplete} />
      </div>
      <ScrollToTop />
    </div>
  );
}

export default WizardVetting;