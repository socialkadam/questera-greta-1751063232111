import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaSearch, FaArrowRight, FaUserTie, FaBrain, FaHeart, FaLightbulb } from 'react-icons/fa';

const wizardTypes = [
  {
    name: 'Coach',
    icon: FaUserTie,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/wizards/coach',
    count: 45,
    description: 'Performance and goal achievement'
  },
  {
    name: 'Consultant',
    icon: FaBrain,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/wizards/consultant',
    count: 58,
    description: 'Strategic problem solving'
  },
  {
    name: 'Counselor',
    icon: FaHeart,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/wizards/counselor',
    count: 72,
    description: 'Emotional support and healing'
  },
  {
    name: 'Mentor',
    icon: FaLightbulb,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/wizards/mentor',
    count: 36,
    description: 'Wisdom and guidance'
  }
];

const wizardMatching = {
  coach: ['goal', 'performance', 'achievement', 'fitness', 'career', 'productivity', 'habit', 'motivation'],
  consultant: ['business', 'strategy', 'problem', 'solution', 'analysis', 'planning', 'growth', 'optimization'],
  counselor: ['stress', 'anxiety', 'depression', 'relationship', 'trauma', 'grief', 'emotional', 'mental health'],
  mentor: ['guidance', 'wisdom', 'experience', 'advice', 'direction', 'learning', 'development', 'growth']
};

function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [matchedWizards, setMatchedWizards] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const input = searchInput.toLowerCase();
    const matches = [];

    // Score each wizard type based on keyword matching
    Object.entries(wizardMatching).forEach(([type, keywords]) => {
      const score = keywords.reduce((acc, keyword) => {
        return acc + (input.includes(keyword) ? 1 : 0);
      }, 0);

      if (score > 0) {
        const wizardData = wizardTypes.find(w => w.name.toLowerCase() === type);
        matches.push({ ...wizardData, score });
      }
    });

    // Sort by score and take top 3
    const topMatches = matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setMatchedWizards(topMatches);
    setShowResults(true);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('wizard-results')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const scrollToHero = () => {
    document.getElementById('hero-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        id="hero-section" 
        className="min-h-[700px] bg-cover bg-center relative"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(1, 61, 57, 0.85) 0%, rgba(13, 85, 80, 0.7) 100%), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"
        }}
      >
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-hero font-bold text-kadam-off-white mb-8"
            >
              Find Your Wizard
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-kadam-off-white mb-12 max-w-4xl font-medium leading-relaxed"
            >
              Unlock clarity, purpose, and momentum with the perfect coach, consultant, counselor, or mentor — matched by AI, guided by wisdom.
            </motion.p>

            {/* Search Bar */}
            <motion.form 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch}
              className="w-full max-w-3xl relative"
            >
              <input
                type="text"
                placeholder="Type your goal or challenge…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-8 py-6 rounded-3xl text-kadam-dark-text text-xl focus:outline-none focus:ring-4 focus:ring-kadam-gold border-2 border-transparent kadam-input"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green p-4 rounded-2xl transition-all duration-300 hover:scale-110 shadow-soft"
              >
                <FaSearch className="text-xl" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {showResults && matchedWizards.length > 0 && (
        <div id="wizard-results" className="max-w-7xl mx-auto px-6 py-20 bg-kadam-light-green">
          <h2 className="kadam-heading text-display-lg text-center mb-12">Perfect Matches for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {matchedWizards.map((wizard, index) => (
              <motion.div
                key={wizard.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="kadam-card-elevated overflow-hidden border-2 border-kadam-gold hover:shadow-glow transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={wizard.image} 
                    alt={wizard.name} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-kadam-gold text-kadam-deep-green px-4 py-2 rounded-2xl font-bold">
                    #{index + 1} Match
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <wizard.icon className="text-kadam-deep-green text-3xl mr-4" />
                    <h3 className="kadam-heading text-2xl">{wizard.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 kadam-body">{wizard.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-kadam-light-green text-kadam-deep-green px-4 py-2 rounded-2xl font-semibold">
                      {wizard.count} Available
                    </span>
                    <Link 
                      to={wizard.path} 
                      className="kadam-button-gold text-sm py-3 px-6"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Wizard Types Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 bg-kadam-off-white">
        <h2 className="kadam-heading text-display-lg text-center mb-16">Choose Your Wizard Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wizardTypes.map((wizard) => (
            <motion.div
              key={wizard.name}
              whileHover={{ y: -8, scale: 1.02 }}
              className="kadam-card overflow-hidden hover:shadow-medium transition-all duration-300 border border-gray-200"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={wizard.image} 
                  alt={wizard.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 kadam-gradient opacity-85 flex flex-col items-center justify-center text-kadam-off-white">
                  <wizard.icon className="text-5xl mb-4 text-kadam-gold" />
                  <h3 className="kadam-heading text-2xl mb-3">{wizard.name}</h3>
                  <p className="text-center px-4 mb-4 kadam-body text-kadam-off-white opacity-90">
                    {wizard.description}
                  </p>
                  <span className="bg-kadam-gold text-kadam-deep-green px-6 py-2 rounded-2xl font-bold">
                    {wizard.count} Available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <Link 
                  to={wizard.path} 
                  className="text-kadam-deep-green flex items-center justify-center hover:text-kadam-medium-green font-semibold transition-colors kadam-body-medium"
                >
                  Find Your {wizard.name} <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="kadam-gold-gradient py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="kadam-heading text-display-lg mb-8 text-kadam-deep-green">
            Ready to Find Your Perfect Wizard?
          </h2>
          <p className="text-2xl text-kadam-deep-green mb-12 font-medium kadam-body-medium">
            Join thousands who have transformed their lives with the right guidance.
          </p>
          <button 
            onClick={scrollToHero}
            className="bg-kadam-deep-green hover:bg-kadam-medium-green text-kadam-off-white px-12 py-6 rounded-3xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large"
          >
            Find My Wizard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;