import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUserTie, FaBrain, FaHeart, FaLightbulb, FaStar, FaArrowRight, FaClock, FaMapMarkerAlt, FaDollarSign, FaVideo, FaPhone, FaComments } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';

const iconMap = {
  FaUserTie,
  FaBrain,
  FaHeart,
  FaLightbulb
};

// Mock wizard data for top 3 recommendations
const mockTopWizards = {
  coach: [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Career Performance Coach",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 127,
      experience: "8 years",
      location: "San Francisco, CA",
      price: "$150/session",
      specialization: "career",
      bio: "Specialized in helping professionals overcome procrastination and workplace burnout.",
      availability: ["Video Call", "Phone", "Chat"]
    },
    {
      id: 2,
      name: "Marcus Chen",
      title: "Certified Fitness & Wellness Coach",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 203,
      experience: "6 years",
      location: "Los Angeles, CA",
      price: "$120/session",
      specialization: "fitness",
      bio: "Expert in sustainable fitness transformations and healthy lifestyle design.",
      availability: ["Video Call", "Phone"]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      title: "Productivity & Time Management Coach",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 89,
      experience: "5 years",
      location: "New York, NY",
      price: "$130/session",
      specialization: "productivity",
      bio: "Helps busy professionals create efficient systems and overcome procrastination.",
      availability: ["Video Call", "Chat"]
    }
  ],
  consultant: [
    {
      id: 4,
      name: "David Kim",
      title: "Senior Business Strategy Consultant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 156,
      experience: "12 years",
      location: "Boston, MA",
      price: "$300/session",
      specialization: "business",
      bio: "Former McKinsey consultant specializing in startup growth and business optimization.",
      availability: ["Video Call", "Phone"]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Startup & Entrepreneurship Consultant",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 92,
      experience: "10 years",
      location: "Austin, TX",
      price: "$250/session",
      specialization: "startup",
      bio: "Serial entrepreneur who has successfully launched and scaled 3 startups.",
      availability: ["Video Call", "Phone", "Chat"]
    },
    {
      id: 6,
      name: "Robert Davis",
      title: "Digital Marketing Strategy Consultant",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 134,
      experience: "9 years",
      location: "Seattle, WA",
      price: "$200/session",
      specialization: "marketing",
      bio: "Growth marketing expert who has scaled companies from startup to IPO.",
      availability: ["Video Call", "Chat"]
    }
  ],
  counselor: [
    {
      id: 7,
      name: "Dr. Maria Gonzalez",
      title: "Licensed Marriage & Relationship Counselor",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 267,
      experience: "15 years",
      location: "Miami, FL",
      price: "$180/session",
      specialization: "relationships",
      bio: "Specialized in helping couples build stronger, more connected relationships.",
      availability: ["Video Call", "Phone"]
    },
    {
      id: 8,
      name: "Dr. James Wilson",
      title: "Licensed Clinical Psychologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 198,
      experience: "12 years",
      location: "Chicago, IL",
      price: "$200/session",
      specialization: "stress",
      bio: "Expert in helping professionals manage stress and prevent burnout.",
      availability: ["Video Call", "Phone", "Chat"]
    },
    {
      id: 9,
      name: "Dr. Amanda Foster",
      title: "Anxiety & Trauma Specialist",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 145,
      experience: "10 years",
      location: "Portland, OR",
      price: "$175/session",
      specialization: "anxiety",
      bio: "Specialized in evidence-based treatments for anxiety and trauma recovery.",
      availability: ["Video Call", "Phone"]
    }
  ],
  mentor: [
    {
      id: 10,
      name: "Michael Chang",
      title: "Serial Entrepreneur & Business Mentor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      reviews: 89,
      experience: "20 years",
      location: "Silicon Valley, CA",
      price: "$400/session",
      specialization: "entrepreneurship",
      bio: "Founded and sold 2 companies, now mentoring the next generation of entrepreneurs.",
      availability: ["Video Call", "Phone"]
    },
    {
      id: 11,
      name: "Jennifer Park",
      title: "Executive Leadership Mentor",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      reviews: 156,
      experience: "18 years",
      location: "New York, NY",
      price: "$350/session",
      specialization: "career",
      bio: "Former Fortune 500 CEO mentoring high-potential leaders.",
      availability: ["Video Call", "Phone"]
    },
    {
      id: 12,
      name: "Thomas Anderson",
      title: "Life Purpose & Personal Growth Mentor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.7,
      reviews: 112,
      experience: "14 years",
      location: "Denver, CO",
      price: "$220/session",
      specialization: "personal_growth",
      bio: "Helps individuals discover their purpose and create meaningful life transformations.",
      availability: ["Video Call", "Phone", "Chat"]
    }
  ]
};

function WizardCard({ wizard, isRecommended = false }) {
  const getAvailabilityIcon = (method) => {
    switch (method) {
      case 'Video Call': return <FaVideo className="text-green-600" />;
      case 'Phone': return <FaPhone className="text-blue-600" />;
      case 'Chat': return <FaComments className="text-purple-600" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-all duration-300 ${
        isRecommended ? 'border-kadam-gold' : 'border-gray-200'
      }`}
    >
      {isRecommended && (
        <div className="bg-kadam-gold text-kadam-deep-green px-4 py-2 text-center font-semibold text-sm">
          ⭐ AI RECOMMENDED MATCH
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
            <h3 className="font-bold text-lg text-gray-800">{wizard.name}</h3>
            <p className="text-gray-600 text-sm">{wizard.title}</p>
            <div className="flex items-center mt-1">
              <FaStar className="text-yellow-400 text-sm mr-1" />
              <span className="text-sm font-semibold text-gray-700">{wizard.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({wizard.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{wizard.bio}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaMapMarkerAlt className="mr-2 text-gray-400" />
            <span>{wizard.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaDollarSign className="mr-2 text-gray-400" />
            <span className="font-semibold text-gray-800">{wizard.price}</span>
            <span className="ml-2">• {wizard.experience} experience</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4">
          <span className="text-sm text-gray-500">Available via:</span>
          {wizard.availability.map((method, index) => (
            <div key={index} className="flex items-center space-x-1">
              {getAvailabilityIcon(method)}
              <span className="text-xs text-gray-600">{method}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-kadam-deep-green to-kadam-medium-green hover:from-kadam-medium-green hover:to-kadam-deep-green text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
          Book Session
        </button>
      </div>
    </motion.div>
  );
}

function WizardRecommendation({ recommendation, onClose }) {
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

  // Get top 3 wizards for this type
  const topWizards = mockTopWizards[recommendation.wizard_type]?.slice(0, 3) || [];

  return (
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

            {/* Right Column - 4-Step Process */}
            <div>
              <h3 className="kadam-heading text-2xl mb-6 text-kadam-deep-green">Your Transformation Journey</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Connect", description: "Choose your perfect wizard from our top recommendations", icon: FaUserTie },
                  { step: 2, title: "Schedule", description: "Book a session at your convenience", icon: FaClock },
                  { step: 3, title: "Transform", description: "Work with your wizard to achieve your goals", icon: FaWandMagicSparkles },
                  { step: 4, title: "Grow", description: "Track progress and celebrate breakthroughs", icon: FaStar }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4 bg-white p-4 rounded-xl shadow-soft">
                    <div className="bg-kadam-gold rounded-full p-2 flex-shrink-0">
                      <span className="text-kadam-deep-green font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="kadam-subheading text-lg mb-1 text-kadam-deep-green">{item.title}</h4>
                      <p className="text-gray-600 kadam-body text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Wizards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="kadam-heading text-3xl mb-4 text-kadam-deep-green">
              Top 3 {recommendation.wizard.name}s for You
            </h2>
            <p className="text-gray-600 kadam-body text-lg">
              Handpicked experts who specialize in {displayGoalArea.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topWizards.map((wizard, index) => (
              <WizardCard 
                key={wizard.id} 
                wizard={wizard} 
                isRecommended={index === 0}
              />
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Link
              to={`/wizards?type=${recommendation.wizard_type}&specialization=${recommendation.goal_area}&recommended=true`}
              className="inline-flex items-center bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large text-lg"
            >
              <span>Explore All {recommendation.wizard.name}s</span>
              <FaArrowRight className="ml-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default WizardRecommendation;