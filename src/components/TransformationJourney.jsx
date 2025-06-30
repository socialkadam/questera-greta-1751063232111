import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaArrowLeft, FaStar, FaMapMarkerAlt, FaDollarSign, FaVideo, FaPhone, FaComments, FaCalendarAlt, FaCreditCard, FaGem } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';

function TransformationJourney({ recommendation, onClose, userInput }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWizard, setSelectedWizard] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 1, name: "Discover & Select", description: "Find & choose your wizard", icon: FaWandMagicSparkles },
    { id: 2, name: "Schedule & Pay", description: "Book & pay for your session", icon: FaCalendarAlt },
    { id: 3, name: "Transform & Grow", description: "Celebration & confirmation", icon: FaGem }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleWizardSelect = (wizard) => {
    setSelectedWizard(wizard);
    nextStep();
  };

  const handleBookingConfirm = (bookingDetails) => {
    setBookingData(bookingDetails);
    nextStep();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <DiscoverSelectStep 
          recommendation={recommendation} 
          userInput={userInput} 
          onWizardSelect={handleWizardSelect} 
        />;
      case 2:
        return <SchedulePayStep 
          wizard={selectedWizard} 
          onBookingConfirm={handleBookingConfirm} 
          onBack={prevStep} 
        />;
      case 3:
        return <TransformGrowStep 
          wizard={selectedWizard} 
          bookingData={bookingData} 
          onClose={onClose} 
        />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header with Progress Bar */}
        <div className="bg-kadam-deep-green p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white kadam-heading">
              Your Transformation Journey
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-kadam-gold transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar - 3 Steps */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <div key={step.id} className="flex flex-col items-center relative">
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-6 left-12 w-full h-0.5 bg-white/30">
                        <div 
                          className="h-full bg-kadam-gold transition-all duration-500"
                          style={{ width: isCompleted ? '100%' : '0%' }}
                        />
                      </div>
                    )}

                    {/* Step Circle */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isCompleted ? '#fab100' : isCurrent ? '#fab100' : 'rgba(255,255,255,0.2)'
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                    >
                      {isCompleted ? (
                        <FaCheckCircle className="text-kadam-deep-green text-xl" />
                      ) : (
                        <StepIcon className={`text-lg ${isCurrent ? 'text-kadam-deep-green' : 'text-white'}`} />
                      )}
                    </motion.div>

                    {/* Step Label */}
                    <div className="mt-3 text-center">
                      <div className={`font-semibold ${isCurrent || isCompleted ? 'text-kadam-gold' : 'text-white/70'}`}>
                        {step.name}
                      </div>
                      <div className="text-xs text-white/60">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="h-[calc(90vh-200px)] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// Step 1: Discover & Select
function DiscoverSelectStep({ recommendation, userInput, onWizardSelect }) {
  // Use actual matched wizards from the recommendation
  const wizards = recommendation.matched_wizards || [];

  const getAvailabilityIcon = (method) => {
    switch (method) {
      case 'Video Call': return <FaVideo className="text-green-600" />;
      case 'Phone': return <FaPhone className="text-blue-600" />;
      case 'Chat': return <FaComments className="text-purple-600" />;
      default: return null;
    }
  };

  return (
    <div className="p-8">
      {/* AI Recommendation Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-kadam-deep-green mb-4 kadam-heading">
          Perfect Match Found! 🎯
        </h3>
        <p className="text-gray-600 text-lg kadam-body mb-6">
          Based on your input: "<em>{userInput}</em>"
        </p>

        {/* Match Method Indicator */}
        <div className="mb-6">
          {recommendation.match_method === 'keyword_wizard_lookup' && (
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <FaCheckCircle className="mr-2" />
              Matched with real vetted wizards
            </div>
          )}
          {recommendation.fallback && (
            <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
              <FaWandMagicSparkles className="mr-2" />
              AI-powered recommendation
            </div>
          )}
        </div>

        {/* Quick AI Summary */}
        <div className="max-w-3xl mx-auto bg-kadam-light-green rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-4">{recommendation.wizard?.icon || '🧙‍♂️'}</div>
            <div>
              <h4 className="text-xl font-bold text-kadam-deep-green kadam-heading">
                {recommendation.wizard_type.charAt(0).toUpperCase() + recommendation.wizard_type.slice(1)} Recommended
              </h4>
              <p className="text-gray-700 kadam-body">
                {recommendation.short_reason}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <span className="text-kadam-deep-green font-semibold">Specialization:</span>
              <span className="ml-2 bg-kadam-gold text-kadam-deep-green px-3 py-1 rounded-full font-semibold">
                {recommendation.goal_area}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-kadam-deep-green font-semibold">Match:</span>
              <span className="ml-2 text-xl font-bold text-kadam-deep-green">
                {recommendation.confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wizard Selection */}
      <div className="mb-8">
        <h4 className="text-2xl font-bold text-kadam-deep-green mb-6 text-center kadam-heading">
          Choose Your Wizard
        </h4>
        <p className="text-gray-600 text-center mb-8 kadam-body">
          {wizards.length > 0 
            ? `Here are your top ${wizards.length} matched ${recommendation.wizard_type}s based on your specific needs`
            : `Here are recommended ${recommendation.wizard_type}s for your needs`
          }
        </p>

        {wizards.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {wizards.slice(0, 3).map((wizard, index) => (
              <motion.div
                key={wizard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden hover:border-kadam-gold hover:shadow-xl transition-all duration-300"
              >
                {index === 0 && wizard.matchScore > 15 && (
                  <div className="bg-kadam-gold text-kadam-deep-green px-4 py-2 text-center font-semibold text-sm">
                    ⭐ BEST MATCH {wizard.matchScore ? `(Score: ${wizard.matchScore})` : ''}
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={wizard.image}
                      alt={wizard.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-kadam-gold shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">{wizard.name}</h4>
                      <p className="text-gray-600 text-sm">{wizard.title}</p>
                      <div className="flex items-center mt-1">
                        <FaStar className="text-yellow-400 text-sm mr-1" />
                        <span className="text-sm font-semibold text-gray-700">{wizard.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({wizard.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{wizard.bio}</p>

                  {/* Show matched keywords if available */}
                  {wizard.matchedKeywords && wizard.matchedKeywords.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-green-600 font-semibold mb-2">Matched your keywords:</p>
                      <div className="flex flex-wrap gap-1">
                        {wizard.matchedKeywords.slice(0, 4).map((keyword, idx) => (
                          <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-gray-400" />
                      <span>{wizard.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaDollarSign className="mr-2 text-gray-400" />
                      <span className="font-semibold text-gray-800">{wizard.price}</span>
                      <span className="ml-2">• {wizard.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-sm text-gray-500">Available via:</span>
                    {wizard.availability.map((method, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        {getAvailabilityIcon(method)}
                        <span className="text-xs text-gray-600">{method}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onWizardSelect(wizard)}
                    className="w-full bg-gradient-to-r from-kadam-deep-green to-kadam-medium-green hover:from-kadam-medium-green hover:to-kadam-deep-green text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Select {wizard.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No specific wizard matches found, but we can still help you!</p>
            <button
              onClick={() => window.location.href = `/wizards?type=${recommendation.wizard_type}`}
              className="kadam-button"
            >
              Browse All {recommendation.wizard_type}s
            </button>
          </div>
        )}
      </div>

      {/* AI Explanation */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-soft border border-kadam-gold/20">
        <h5 className="font-semibold text-kadam-deep-green mb-3 flex items-center">
          <FaWandMagicSparkles className="mr-2" />
          Why This Match?
        </h5>
        <p className="text-gray-700 kadam-body leading-relaxed">
          {recommendation.personalized_explanation}
        </p>
        {recommendation.match_method === 'keyword_wizard_lookup' && (
          <p className="text-green-600 text-sm mt-3 font-medium">
            ✅ These wizards were selected based on direct keyword matching with your specific needs.
          </p>
        )}
      </div>
    </div>
  );
}

// Step 2: Schedule & Pay - Updated with Auto-filled Lapsula Integration
function SchedulePayStep({ wizard, onBookingConfirm, onBack }) {
  const [isEmbedLoading, setIsEmbedLoading] = useState(true);

  const handleBookingComplete = () => {
    // Simulate successful booking
    onBookingConfirm({
      wizard: wizard,
      date: new Date().toLocaleDateString(),
      time: "Scheduled via Lapsula",
      sessionType: "As selected in booking",
      lapsulaBookingId: `lapsula_${wizard.id}_${Date.now()}`,
      paymentConfirmed: true
    });
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-kadam-deep-green mb-4 kadam-heading">
          Schedule & Pay for Your Session
        </h3>
        <p className="text-gray-600 text-lg kadam-body">
          Book a session with {wizard.name}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Wizard Info */}
          <div className="bg-kadam-light-green rounded-2xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={wizard.image}
                alt={wizard.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-kadam-gold"
              />
              <div>
                <h4 className="font-bold text-lg text-kadam-deep-green">{wizard.name}</h4>
                <p className="text-gray-600">{wizard.title}</p>
                <p className="text-kadam-deep-green font-semibold">{wizard.price}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-6">
              <h5 className="font-semibold text-kadam-deep-green mb-3">About This Session</h5>
              <p className="text-gray-600 text-sm mb-3">{wizard.bio}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Session Duration:</span>
                  <span className="font-semibold">60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Available via:</span>
                  <span className="font-semibold">{wizard.availability.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={onBack}
                className="kadam-button-outline inline-flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Selection
              </button>
            </div>
          </div>

          {/* Right: Auto-filled Lapsula Booking */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden h-[600px]">
              {/* Loading State */}
              {isEmbedLoading && (
                <div className="h-full flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kadam-deep-green mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading booking calendar...</p>
                  </div>
                </div>
              )}

              {/* Auto-filled Lapsula Booking Embed */}
              <iframe
                src={wizard.lapsulaBookingUrl}
                width="100%"
                height="600"
                frameBorder="0"
                onLoad={() => setIsEmbedLoading(false)}
                className={isEmbedLoading ? 'hidden' : 'block'}
                title={`Book session with ${wizard.name}`}
                style={{ border: 'none' }}
              />
            </div>

            {/* Continue Button - Simulated for demo */}
            <div className="text-center mt-6">
              <button
                onClick={handleBookingComplete}
                className="kadam-button text-lg px-8 py-4 inline-flex items-center"
              >
                <FaCheckCircle className="mr-3" />
                I've Completed My Booking
              </button>
              <p className="text-gray-500 text-sm mt-2">
                Click this after you've successfully booked your session
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 3: Transform & Grow
function TransformGrowStep({ wizard, bookingData, onClose }) {
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-kadam-gold rounded-full mb-8"
          >
            <FaGem className="text-4xl text-kadam-deep-green" />
          </motion.div>

          <h3 className="text-4xl font-bold text-kadam-deep-green mb-6 kadam-heading">
            🎉 Congratulations, Action Taker! 🎉
          </h3>

          <div className="bg-gradient-to-br from-kadam-light-green to-white rounded-2xl p-8 mb-8">
            <p className="text-xl text-gray-700 mb-6 kadam-body leading-relaxed">
              You've taken the most important step in your transformation journey - <strong className="text-kadam-deep-green">you chose to act!</strong>
            </p>

            <div className="bg-white rounded-xl p-6 mb-6 border-2 border-kadam-gold">
              <h4 className="font-semibold text-kadam-deep-green mb-3">Your Session Details</h4>
              <div className="space-y-2 text-left">
                <p><strong>Wizard:</strong> {wizard.name}</p>
                <p><strong>Status:</strong> {bookingData.date} at {bookingData.time}</p>
                <p><strong>Booking Platform:</strong> Lapsula (Secure)</p>
                <p><strong>Confirmation:</strong> Check your email for details</p>
              </div>
            </div>

            <div className="text-lg text-gray-700 kadam-body space-y-4">
              <p>
                🌟 You've joined thousands of seekers who chose growth over comfort, action over hesitation, and transformation over status quo.
              </p>
              <p>
                🚀 Your wizard {wizard.name} will guide you with wisdom, expertise, and personalized strategies designed specifically for your journey.
              </p>
              <p className="bg-kadam-gold/20 p-4 rounded-xl">
                <strong>Remember:</strong> Every master was once a seeker. Every expert was once a beginner. Your journey to unlocking your full human potential starts now!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 kadam-body">
              Check your email for session details and preparation materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="kadam-button inline-flex items-center"
              >
                <FaWandMagicSparkles className="mr-2" />
                Go to Dashboard
              </button>
              <button
                onClick={onClose}
                className="kadam-button-outline"
              >
                Continue Exploring
              </button>
            </div>
          </div>

          <div className="mt-8 text-kadam-deep-green font-semibold kadam-body">
            ✨ May wisdom guide your path and growth illuminate your journey! ✨
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TransformationJourney;