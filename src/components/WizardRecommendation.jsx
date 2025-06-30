import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserTie, FaBrain, FaHeart, FaLightbulb, FaStar, FaArrowRight, FaClock, FaMapMarkerAlt, FaDollarSign, FaVideo, FaPhone, FaComments } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import TransformationJourney from './TransformationJourney';
import { useState } from 'react';

const iconMap = {
  FaUserTie,
  FaBrain, 
  FaHeart,
  FaLightbulb
};

function WizardRecommendation({ recommendation, onClose, userInput }) {
  const [showJourney, setShowJourney] = useState(false);

  if (!recommendation) return null;

  const getWizardIcon = (iconName) => {
    return iconMap[iconName] || FaUserTie;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const IconComponent = getWizardIcon(recommendation.wizard.icon);

  // Capitalize goal area for display
  const displayGoalArea = recommendation.goal_area
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleStartJourney = () => {
    console.log("🚀 Starting Transformation Journey...");
    setShowJourney(true);
  };

  const handleCloseJourney = () => {
    console.log("❌ Closing Transformation Journey...");
    setShowJourney(false);
  };

  return (
    <>
      <div className="min-h-screen bg-kadam-light-green py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-3 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Recommendation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-large border-2 border-kadam-gold p-8 mb-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-kadam-gold to-kadam-soft-gold rounded-full mb-6 shadow-glow">
                <FaWandMagicSparkles className="text-4xl text-kadam-deep-green" />
              </div>
              <h2 className="kadam-heading text-3xl mb-3 bg-gradient-to-r from-kadam-deep-green to-kadam-medium-green bg-clip-text text-transparent">
                Perfect Match Found!
              </h2>
              <p className="text-gray-600 kadam-body text-lg">AI-powered recommendation based on your input</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Match Details */}
              <div>
                <div className="bg-gradient-to-br from-kadam-light-green to-white rounded-3xl p-6 border border-kadam-gold/20">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-4 bg-white px-6 py-4 rounded-2xl shadow-soft border border-kadam-gold/30">
                      <IconComponent className="text-3xl text-kadam-deep-green" />
                      <div className="text-left">
                        <h3 className="kadam-heading text-2xl text-kadam-deep-green">
                          {displayGoalArea} {recommendation.wizard.name}
                        </h3>
                        <p className="text-gray-600 kadam-body">Your suggested wizard type</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 mb-6 border border-kadam-gold/20">
                    <div className="flex items-start space-x-3">
                      <div className="bg-kadam-gold/20 p-2 rounded-lg shrink-0">
                        <FaWandMagicSparkles className="text-kadam-deep-green text-lg" />
                      </div>
                      <div>
                        <h4 className="kadam-subheading text-lg mb-2 text-kadam-deep-green">Why This Match?</h4>
                        <p className="kadam-body text-gray-700 leading-relaxed">
                          {recommendation.personalized_explanation || recommendation.short_reason}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 border border-kadam-gold/20">
                      <h5 className="kadam-subheading text-sm mb-2 text-gray-500">Specialization</h5>
                      <span className="kadam-body-medium text-kadam-deep-green">
                        {displayGoalArea}
                      </span>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-kadam-gold/20">
                      <h5 className="kadam-subheading text-sm mb-2 text-gray-500">Urgency Level</h5>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(recommendation.urgency)}`}>
                        {recommendation.urgency}
                      </span>
                    </div>
                  </div>

                  {recommendation.confidence && (
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-kadam-gold/30">
                        <FaStar className={`text-lg ${getConfidenceColor(recommendation.confidence)}`} />
                        <span className="kadam-body-medium">
                          <span className={getConfidenceColor(recommendation.confidence)}>
                            {recommendation.confidence}% match confidence
                          </span>
                          {recommendation.fallback && (
                            <span className="text-gray-500 text-sm ml-2">(keyword-based)</span>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - 5-Step Process Preview */}
              <div>
                <h3 className="kadam-heading text-2xl mb-6 text-kadam-deep-green">Your Transformation Journey</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Discover",
                      description: "AI matches you with the perfect wizard type",
                      icon: FaWandMagicSparkles,
                      completed: true
                    },
                    {
                      step: 2,
                      title: "Connect",
                      description: "Choose from top 3 recommended wizards",
                      icon: FaStar
                    },
                    {
                      step: 3,
                      title: "Schedule",
                      description: "Book your session at your convenience",
                      icon: FaClock
                    },
                    {
                      step: 4,
                      title: "Transform",
                      description: "Secure payment and confirmation",
                      icon: FaArrowRight
                    },
                    {
                      step: 5,
                      title: "Grow",
                      description: "Begin your transformation journey",
                      icon: FaWandMagicSparkles
                    }
                  ].map((item) => (
                    <div
                      key={item.step}
                      className={`flex items-start space-x-4 p-4 rounded-xl ${
                        item.completed ? 'bg-kadam-gold/20' : 'bg-white'
                      } shadow-soft`}
                    >
                      <div className={`rounded-full p-2 flex-shrink-0 ${
                        item.completed ? 'bg-kadam-gold' : 'bg-gray-200'
                      }`}>
                        {item.completed ? (
                          <FaWandMagicSparkles className="text-kadam-deep-green text-sm" />
                        ) : (
                          <span className="text-gray-600 font-bold text-sm">{item.step}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="kadam-subheading text-lg mb-1 text-kadam-deep-green">{item.title}</h4>
                        <p className="text-gray-600 kadam-body text-sm">{item.description}</p>
                        {item.completed && (
                          <span className="text-kadam-gold font-semibold text-xs">✓ Complete</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <div className="text-center mt-8">
              <button
                onClick={handleStartJourney}
                className="bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large text-lg inline-flex items-center"
              >
                <FaWandMagicSparkles className="mr-3" />
                Start Your Transformation Journey
                <FaArrowRight className="ml-3" />
              </button>
            </div>
          </motion.div>

          {/* Alternative Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-600 kadam-body mb-4">
              Want to explore more options?
            </p>
            <Link
              to={`/wizards?type=${recommendation.wizard_type}&specialization=${recommendation.goal_area}&recommended=true`}
              className="inline-flex items-center text-kadam-deep-green hover:text-kadam-medium-green font-semibold transition-colors kadam-body-medium"
            >
              Browse All {recommendation.wizard.name}s
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Transformation Journey Modal */}
      {showJourney && (
        <TransformationJourney
          recommendation={recommendation}
          userInput={userInput}
          onClose={handleCloseJourney}
        />
      )}
    </>
  );
}

export default WizardRecommendation;