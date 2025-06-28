import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {FaUserTie, FaBrain, FaHeart, FaLightbulb, FaStar, FaArrowRight} from 'react-icons/fa';
import {FaWandMagicSparkles} from 'react-icons/fa6';

const iconMap = {
  FaUserTie,
  FaBrain,
  FaHeart,
  FaLightbulb
};

function WizardRecommendation({recommendation, onClose}) {
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

  // Create the specialized wizard link with filters
  const getSpecializedWizardLink = () => {
    const baseUrl = '/wizards';
    const params = new URLSearchParams({
      type: recommendation.wizard_type,
      specialization: recommendation.goal_area,
      recommended: 'true'
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -30}}
      className="bg-white rounded-3xl shadow-large border-2 border-kadam-gold p-8 max-w-3xl mx-auto relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-kadam-gold to-kadam-soft-gold rounded-full mb-6 shadow-glow">
          <FaWandMagicSparkles className="text-4xl text-kadam-deep-green" />
        </div>
        <h3 className="kadam-heading text-3xl mb-3 bg-gradient-to-r from-kadam-deep-green to-kadam-medium-green bg-clip-text text-transparent">
          Perfect Match Found!
        </h3>
        <p className="text-gray-600 kadam-body text-lg">AI-powered recommendation based on your input</p>
      </div>

      {/* Main Recommendation */}
      <div className="bg-gradient-to-br from-kadam-light-green to-white rounded-3xl p-8 mb-8 border border-kadam-gold/20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-4 bg-white px-8 py-4 rounded-2xl shadow-soft border border-kadam-gold/30">
            <IconComponent className="text-3xl text-kadam-deep-green" />
            <div className="text-left">
              <h4 className="kadam-heading text-2xl text-kadam-deep-green">
                {displayGoalArea} {recommendation.wizard.name}
              </h4>
              <p className="text-gray-600 kadam-body">Your suggested wizard type</p>
            </div>
          </div>
        </div>

        {/* Personalized Explanation */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-kadam-gold/20">
          <div className="flex items-start space-x-3">
            <div className="bg-kadam-gold/20 p-2 rounded-lg shrink-0">
              <FaWandMagicSparkles className="text-kadam-deep-green text-lg" />
            </div>
            <div>
              <h5 className="kadam-subheading text-lg mb-2 text-kadam-deep-green">Why This Match?</h5>
              <p className="kadam-body text-gray-700 leading-relaxed">
                {recommendation.personalized_explanation || recommendation.short_reason}
              </p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-kadam-gold/20">
            <h6 className="kadam-subheading text-sm mb-2 text-gray-500">Specialization</h6>
            <span className="kadam-body-medium text-kadam-deep-green">
              {displayGoalArea}
            </span>
          </div>
          <div className="bg-white rounded-xl p-4 border border-kadam-gold/20">
            <h6 className="kadam-subheading text-sm mb-2 text-gray-500">Urgency Level</h6>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(recommendation.urgency)}`}>
              {recommendation.urgency}
            </span>
          </div>
        </div>

        {/* Confidence Score */}
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Link
          to={getSpecializedWizardLink()}
          className="flex-1 bg-gradient-to-r from-kadam-deep-green to-kadam-medium-green hover:from-kadam-medium-green hover:to-kadam-deep-green text-kadam-off-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large text-center flex items-center justify-center"
        >
          <span>Meet Your {recommendation.wizard.name}</span>
          <FaArrowRight className="ml-2" />
        </Link>
        <button
          onClick={onClose}
          className="flex-1 kadam-button-outline text-center"
        >
          Continue Browsing
        </button>
      </div>

      {/* Available Count */}
      <div className="text-center">
        <span className="bg-gradient-to-r from-kadam-gold to-kadam-soft-gold text-kadam-deep-green px-6 py-3 rounded-2xl kadam-body-medium font-semibold shadow-soft">
          {recommendation.wizard.count} Expert {recommendation.wizard.name}s Available
        </span>
      </div>
    </motion.div>
  );
}

export default WizardRecommendation;