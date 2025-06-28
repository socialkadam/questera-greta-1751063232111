import {useState,useEffect} from 'react';
import {useSearchParams,useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {FaUserTie,FaBrain,FaHeart,FaLightbulb,FaStar,FaMapMarkerAlt,FaDollarSign,FaVideo,FaPhone,FaComments} from 'react-icons/fa';

// Mock wizard data with specializations
const allWizards=[
  // COACHES
  {
    id: 1,
    name: "Sarah Johnson",
    type: "coach",
    specialization: "career",
    title: "Senior Career Performance Coach",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 127,
    experience: "8 years",
    location: "San Francisco, CA",
    price: "$150/session",
    tags: ["Career Growth","Leadership","Productivity","Goal Setting"],
    bio: "Specialized in helping professionals overcome procrastination and workplace burnout.",
    availability: ["Video Call","Phone","Chat"]
  },
  {
    id: 2,
    name: "Marcus Chen",
    type: "coach",
    specialization: "fitness",
    title: "Certified Fitness & Wellness Coach",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 203,
    experience: "6 years",
    location: "Los Angeles, CA",
    price: "$120/session",
    tags: ["Weight Loss","Nutrition","Habit Formation","Motivation"],
    bio: "Expert in sustainable fitness transformations and healthy lifestyle design.",
    availability: ["Video Call","Phone"]
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    type: "coach",
    specialization: "productivity",
    title: "Productivity & Time Management Coach",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    experience: "5 years",
    location: "New York, NY",
    price: "$130/session",
    tags: ["Time Management","Focus","Systems","Accountability"],
    bio: "Helps busy professionals create efficient systems and overcome procrastination.",
    availability: ["Video Call","Chat"]
  },

  // CONSULTANTS
  {
    id: 4,
    name: "David Kim",
    type: "consultant",
    specialization: "business",
    title: "Senior Business Strategy Consultant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 156,
    experience: "12 years",
    location: "Boston, MA",
    price: "$300/session",
    tags: ["Business Strategy","Growth Planning","Market Analysis","Operations"],
    bio: "Former McKinsey consultant specializing in startup growth and business optimization.",
    availability: ["Video Call","Phone"]
  },
  {
    id: 5,
    name: "Lisa Thompson",
    type: "consultant",
    specialization: "startup",
    title: "Startup & Entrepreneurship Consultant",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 92,
    experience: "10 years",
    location: "Austin, TX",
    price: "$250/session",
    tags: ["Startup Strategy","Fundraising","Product Development","Scaling"],
    bio: "Serial entrepreneur who has successfully launched and scaled 3 startups.",
    availability: ["Video Call","Phone","Chat"]
  },
  {
    id: 6,
    name: "Robert Davis",
    type: "consultant",
    specialization: "marketing",
    title: "Digital Marketing Strategy Consultant",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 134,
    experience: "9 years",
    location: "Seattle, WA",
    price: "$200/session",
    tags: ["Digital Marketing","Growth Hacking","Content Strategy","Analytics"],
    bio: "Growth marketing expert who has scaled companies from startup to IPO.",
    availability: ["Video Call","Chat"]
  },

  // COUNSELORS
  {
    id: 7,
    name: "Dr. Maria Gonzalez",
    type: "counselor",
    specialization: "relationships",
    title: "Licensed Marriage & Relationship Counselor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 267,
    experience: "15 years",
    location: "Miami, FL",
    price: "$180/session",
    tags: ["Relationship Therapy","Communication","Conflict Resolution","Intimacy"],
    bio: "Specialized in helping couples build stronger, more connected relationships.",
    availability: ["Video Call","Phone"]
  },
  {
    id: 8,
    name: "Dr. James Wilson",
    type: "counselor",
    specialization: "stress",
    title: "Licensed Clinical Psychologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 198,
    experience: "12 years",
    location: "Chicago, IL",
    price: "$200/session",
    tags: ["Stress Management","Anxiety","Burnout","Mindfulness"],
    bio: "Expert in helping professionals manage stress and prevent burnout.",
    availability: ["Video Call","Phone","Chat"]
  },
  {
    id: 9,
    name: "Dr. Amanda Foster",
    type: "counselor",
    specialization: "anxiety",
    title: "Anxiety & Trauma Specialist",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 145,
    experience: "10 years",
    location: "Portland, OR",
    price: "$175/session",
    tags: ["Anxiety Disorders","Trauma Therapy","PTSD","Cognitive Behavioral Therapy"],
    bio: "Specialized in evidence-based treatments for anxiety and trauma recovery.",
    availability: ["Video Call","Phone"]
  },

  // MENTORS
  {
    id: 10,
    name: "Michael Chang",
    type: "mentor",
    specialization: "entrepreneurship",
    title: "Serial Entrepreneur & Business Mentor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    experience: "20 years",
    location: "Silicon Valley, CA",
    price: "$400/session",
    tags: ["Entrepreneurship","Venture Capital","Scaling","Exit Strategy"],
    bio: "Founded and sold 2 companies, now mentoring the next generation of entrepreneurs.",
    availability: ["Video Call","Phone"]
  },
  {
    id: 11,
    name: "Jennifer Park",
    type: "mentor",
    specialization: "career",
    title: "Executive Leadership Mentor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 156,
    experience: "18 years",
    location: "New York, NY",
    price: "$350/session",
    tags: ["Leadership Development","Executive Coaching","Career Transition","C-Suite"],
    bio: "Former Fortune 500 CEO mentoring high-potential leaders.",
    availability: ["Video Call","Phone"]
  },
  {
    id: 12,
    name: "Thomas Anderson",
    type: "mentor",
    specialization: "personal growth",
    title: "Life Purpose & Personal Growth Mentor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 112,
    experience: "14 years",
    location: "Denver, CO",
    price: "$220/session",
    tags: ["Life Purpose","Personal Development","Spiritual Growth","Life Transitions"],
    bio: "Helps individuals discover their purpose and create meaningful life transformations.",
    availability: ["Video Call","Phone","Chat"]
  }
];

const categoryData={
  coach: {
    name: 'Coach',
    icon: FaUserTie,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  consultant: {
    name: 'Consultant',
    icon: FaBrain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  counselor: {
    name: 'Counselor',
    icon: FaHeart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  mentor: {
    name: 'Mentor',
    icon: FaLightbulb,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  }
};

function WizardCard({wizard}) {
  const categoryInfo=categoryData[wizard.type];
  const IconComponent=categoryInfo.icon;

  const getAvailabilityIcon=(method)=> {
    switch (method) {
      case 'Video Call': return <FaVideo className="text-green-600" />;
      case 'Phone': return <FaPhone className="text-blue-600" />;
      case 'Chat': return <FaComments className="text-purple-600" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{opacity: 0,y: 20}} 
      animate={{opacity: 1,y: 0}} 
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className={`${categoryInfo.bgColor} p-6 ${categoryInfo.borderColor} border-b`}>
        <div className="flex items-center space-x-3 mb-4">
          <IconComponent className={`text-2xl ${categoryInfo.color}`} />
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryInfo.color} ${categoryInfo.bgColor}`}>
            {categoryInfo.name}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <img 
            src={wizard.image} 
            alt={wizard.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" 
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
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{wizard.bio}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {wizard.tags.slice(0,3).map((tag,index)=> (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Details */}
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

        {/* Availability */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-sm text-gray-500">Available via:</span>
          {wizard.availability.map((method,index)=> (
            <div key={index} className="flex items-center space-x-1">
              {getAvailabilityIcon(method)}
              <span className="text-xs text-gray-600">{method}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-kadam-deep-green to-kadam-medium-green hover:from-kadam-medium-green hover:to-kadam-deep-green text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
          Book Session
        </button>
      </div>
    </motion.div>
  );
}

function WizardListing() {
  const [searchParams]=useSearchParams();
  const navigate=useNavigate();

  // Get URL parameters
  const selectedType=searchParams.get('type') || 'all';
  const selectedSpecialization=searchParams.get('specialization');
  const isRecommended=searchParams.get('recommended')==='true';

  const [activeCategory,setActiveCategory]=useState(selectedType);
  const [filteredWizards,setFilteredWizards]=useState([]);

  // Filter wizards based on URL parameters
  useEffect(()=> {
    let filtered=allWizards;

    // Filter by type
    if (selectedType !=='all') {
      filtered=filtered.filter(wizard=> wizard.type===selectedType);
    }

    // Filter by specialization (for AI recommendations)
    if (selectedSpecialization) {
      filtered=filtered.filter(wizard=> 
        wizard.specialization===selectedSpecialization
      );
    }

    // If it's a recommendation, show only top 3
    if (isRecommended && selectedSpecialization) {
      filtered=filtered
        .sort((a,b)=> b.rating - a.rating) // Sort by rating
        .slice(0,3); // Take top 3
    }

    setFilteredWizards(filtered);
    setActiveCategory(selectedType);
  },[selectedType,selectedSpecialization,isRecommended]);

  const handleCategoryChange=(category)=> {
    setActiveCategory(category);
    // Update URL without specialization when manually switching categories
    navigate(`/wizards?type=${category}`);
  };

  const categories=[
    {key: 'all',name: 'All Wizards',count: allWizards.length},
    {key: 'coach',name: 'Coaches',count: allWizards.filter(w=> w.type==='coach').length},
    {key: 'consultant',name: 'Consultants',count: allWizards.filter(w=> w.type==='consultant').length},
    {key: 'counselor',name: 'Counselors',count: allWizards.filter(w=> w.type==='counselor').length},
    {key: 'mentor',name: 'Mentors',count: allWizards.filter(w=> w.type==='mentor').length},
  ];

  // Dynamic page title based on filters
  const getPageTitle=()=> {
    if (isRecommended && selectedSpecialization) {
      const typeName=categoryData[selectedType]?.name || 'Wizard';
      const specializationName=selectedSpecialization.charAt(0).toUpperCase() + selectedSpecialization.slice(1);
      return `Top ${specializationName} ${typeName}s - AI Recommended`;
    }
    if (selectedType==='all') return 'All Wizards';
    return `${categoryData[selectedType]?.name}s`;
  };

  const getPageDescription=()=> {
    if (isRecommended && selectedSpecialization) {
      return `Based on your input, here are the top 3 ${selectedSpecialization} ${categoryData[selectedType]?.name.toLowerCase()}s that match your needs.`;
    }
    return 'Browse our curated selection of expert wizards ready to guide your transformation.';
  };

  return (
    <div className="min-h-screen bg-kadam-off-white">
      
      {/* Header - Dark Background */}
      <div className="py-12" style={{backgroundColor: '#013d39'}}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{opacity: 0,y: 20}} 
            animate={{opacity: 1,y: 0}} 
            className="text-center"
          >
            <h1 className="font-display text-4xl font-bold text-white mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {getPageDescription()}
            </p>
            {isRecommended && (
              <div className="mt-4 inline-flex items-center bg-kadam-gold text-kadam-deep-green px-6 py-2 rounded-full font-semibold">
                <FaStar className="mr-2" />
                AI-Powered Recommendation
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category)=> (
            <button 
              key={category.key}
              onClick={()=> handleCategoryChange(category.key)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory===category.key 
                  ? 'bg-kadam-deep-green text-white shadow-medium' 
                  : 'bg-white text-kadam-deep-green border-2 border-kadam-deep-green hover:bg-kadam-deep-green hover:text-white'
              }`}
            >
              {category.name}
              <span className="ml-2 bg-kadam-gold text-kadam-deep-green px-2 py-1 rounded-full text-sm">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600 kadam-body">
            Showing {filteredWizards.length} wizard{filteredWizards.length !==1 ? 's' : ''}
            {selectedSpecialization && (
              <span className="font-semibold text-kadam-deep-green">
                {' '}specializing in {selectedSpecialization}
              </span>
            )}
          </p>
        </div>

        {/* Wizard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWizards.map((wizard)=> (
            <WizardCard key={wizard.id} wizard={wizard} />
          ))}
        </div>

        {/* Empty State */}
        {filteredWizards.length===0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 shadow-soft max-w-md mx-auto">
              <h3 className="kadam-heading text-xl mb-4 text-kadam-deep-green">No wizards found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or browse all categories.
              </p>
              <button 
                onClick={()=> handleCategoryChange('all')}
                className="bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                View All Wizards
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default WizardListing;