import {Link} from 'react-router-dom';
import {motion,AnimatePresence} from 'framer-motion';
import {useState} from 'react';
import {FaSearch,FaArrowRight,FaUserTie,FaBrain,FaHeart,FaLightbulb,FaSpinner,FaMicrophone,FaCamera} from 'react-icons/fa';
import {getWizardRecommendation,getWizardDetailsByType} from '../api/gptMatch';
import WizardRecommendation from '../components/WizardRecommendation';

const wizardTypes=[
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

function Home() {
  const [searchInput,setSearchInput]=useState('');
  const [gptRecommendation,setGptRecommendation]=useState(null);
  const [showGptResult,setShowGptResult]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);

  const handleSearch=async (e)=> {
    e.preventDefault();
    if (!searchInput.trim()) return;

    console.log("🔍 Starting search for:",searchInput);
    setIsLoading(true);
    setError(null);

    try {
      console.log("📞 Calling getWizardRecommendation...");
      const result=await getWizardRecommendation(searchInput);
      console.log("📋 Got result:",result);

      if (result && result.wizard_type) {
        console.log("✅ Valid result,getting wizard details...");
        const wizardDetails=getWizardDetailsByType(result.wizard_type);
        console.log("🧙 Wizard details:",wizardDetails);

        const recommendation={
          ...result,
          wizard: wizardDetails,
          userInput: searchInput // Pass original input for personalization
        };

        console.log("🎯 Final recommendation:",recommendation);
        setGptRecommendation(recommendation);
        setShowGptResult(true);

        // Scroll to results
        setTimeout(()=> {
          const element=document.getElementById('gpt-results');
          if (element) {
            element.scrollIntoView({behavior: 'smooth',block: 'center'});
          }
        },300);
      } else {
        console.error("❌ Invalid result from getWizardRecommendation:",result);
        setError("We couldn't process your request. Please try a different goal or browse our wizard types below.");
      }
    } catch (err) {
      console.error('❌ Search error:',err);
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeGptResult=()=> {
    console.log("🚫 Closing GPT result");
    setShowGptResult(false);
    setGptRecommendation(null);
    setError(null);
  };

  const scrollToSearch=()=> {
    document.getElementById('search-section')?.scrollIntoView({behavior: 'smooth',block: 'center'});
  };

  // Quick test examples
  const quickTests=[
    "I keep procrastinating and feel burned out at work",
    "I want to lose weight and get fit",
    "I'm stressed and anxious about my relationship",
    "I need help growing my startup business"
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section with Title and Search */}
      <div id="search-section" className="min-h-[80vh] flex flex-col justify-center items-center px-6">
        <div className="max-w-4xl w-full text-center">
          
          {/* Main Heading */}
          <motion.div 
            initial={{opacity: 0,y: 30}} 
            animate={{opacity: 1,y: 0}} 
            className="mb-8"
          >
            <h1 className="kadam-heading text-6xl md:text-7xl mb-6 text-kadam-deep-green">
              Find Your Wizard
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed kadam-body-medium">
              Unlock clarity, purpose, and momentum with the perfect coach, consultant, counselor, or mentor — matched by AI, guided by wisdom.
            </p>
          </motion.div>

          {/* Google-Style Search Bar */}
          <motion.form 
            initial={{opacity: 0,y: 30}} 
            animate={{opacity: 1,y: 0}} 
            transition={{delay: 0.2}} 
            onSubmit={handleSearch} 
            className="relative mb-8"
          >
            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 focus-within:shadow-xl">
                
                {/* Input Field */}
                <input 
                  type="text"
                  placeholder="How can we help? (e.g., 'I keep procrastinating and feel burned out at work')"
                  value={searchInput}
                  onChange={(e)=> setSearchInput(e.target.value)}
                  className="flex-1 py-4 px-6 text-lg focus:outline-none bg-transparent rounded-full"
                  disabled={isLoading}
                />

                {/* Voice Search Icon */}
                <button 
                  type="button"
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  title="Search by voice"
                >
                  <FaMicrophone className="text-gray-400 text-lg hover:text-kadam-deep-green" />
                </button>

                {/* Image Search Icon with Gold Background */}
                <button 
                  type="button"
                  className="p-3 m-1 rounded-full transition-colors"
                  style={{backgroundColor: '#fab100'}}
                  title="Search by image"
                >
                  <FaCamera className="text-white text-lg" />
                </button>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isLoading || !searchInput.trim()}
                  className="mr-2 p-3 bg-kadam-deep-green hover:bg-kadam-medium-green text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <FaSpinner className="text-lg animate-spin" />
                  ) : (
                    <FaSearch className="text-lg" />
                  )}
                </button>

              </div>
            </div>
          </motion.form>

          {/* Google-Style Buttons */}
          <motion.div 
            initial={{opacity: 0,y: 30}} 
            animate={{opacity: 1,y: 0}} 
            transition={{delay: 0.4}} 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <button 
              onClick={handleSearch}
              disabled={!searchInput.trim() || isLoading}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded border border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Find My Wizard
            </button>
            <Link 
              to="/wizards"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded border border-gray-300 transition-colors text-center"
            >
              I'm Feeling Wizardry
            </Link>
          </motion.div>

          {/* Quick Test Examples */}
          <motion.div 
            initial={{opacity: 0,y: 30}} 
            animate={{opacity: 1,y: 0}} 
            transition={{delay: 0.6}} 
            className="text-sm"
          >
            <p className="text-gray-600 mb-3">Quick examples:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickTests.map((test,index)=> (
                <button 
                  key={index}
                  onClick={()=> setSearchInput(test)}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs transition-colors border"
                >
                  {test}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{opacity: 0,y: 20}} 
                animate={{opacity: 1,y: 0}} 
                exit={{opacity: 0,y: -20}} 
                className="mt-6 bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-2xl max-w-2xl mx-auto"
              >
                <p className="kadam-body">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* GPT Recommendation Results */}
      <AnimatePresence>
        {showGptResult && gptRecommendation && (
          <div id="gpt-results" className="bg-kadam-light-green py-20">
            <div className="max-w-7xl mx-auto px-6">
              <WizardRecommendation 
                recommendation={gptRecommendation} 
                onClose={closeGptResult} 
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Wizard Types Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 bg-kadam-off-white">
        <h2 className="kadam-heading text-display-lg text-center mb-16">Choose Your Wizard Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {wizardTypes.map((wizard)=> (
            <motion.div 
              key={wizard.name}
              whileHover={{y: -8,scale: 1.02}}
              className="kadam-card overflow-hidden hover:shadow-medium transition-all duration-300 border border-gray-200"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={wizard.image} 
                  alt={wizard.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50 flex flex-col items-center justify-center text-white">
                  <wizard.icon className="text-5xl mb-4 text-white drop-shadow-lg" />
                  <h3 className="text-2xl font-bold mb-3 text-white drop-shadow-lg tracking-wide">
                    {wizard.name}
                  </h3>
                  <p className="text-center px-4 mb-4 text-white/90 drop-shadow text-sm font-medium">
                    {wizard.description}
                  </p>
                  <span className="bg-kadam-gold text-kadam-deep-green px-6 py-2 rounded-2xl font-bold shadow-lg">
                    {wizard.count} Available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <Link 
                  to={wizard.path}
                  className="text-kadam-deep-green flex items-center justify-center hover:text-kadam-medium-green font-semibold transition-colors kadam-body-medium"
                >
                  Find Your {wizard.name} 
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-kadam-deep-green py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="kadam-heading text-display-lg mb-8 text-kadam-off-white">
            Ready to Find Your Perfect Wizard?
          </h2>
          <p className="text-2xl text-kadam-off-white mb-12 font-medium kadam-body-medium">
            Join thousands who have transformed their lives with the right guidance.
          </p>
          <button 
            onClick={scrollToSearch}
            className="bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green px-12 py-6 rounded-3xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large"
          >
            Find My Wizard
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;