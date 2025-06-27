import { motion } from 'framer-motion';
import { FaUserTie, FaBrain, FaHeart, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const wizardCategories = [
  {
    id: 1,
    name: "Coach",
    icon: FaUserTie,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 45,
    path: "/wizards/coach",
    description: "Performance and goal achievement specialists",
    longDescription: "Work with certified coaches who specialize in helping you achieve specific goals, improve performance, and build sustainable habits for success."
  },
  {
    id: 2,
    name: "Consultant",
    icon: FaBrain,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 58,
    path: "/wizards/consultant",
    description: "Strategic problem solving experts",
    longDescription: "Connect with experienced consultants who provide strategic insights, analysis, and solutions for complex business and personal challenges."
  },
  {
    id: 3,
    name: "Counselor",
    icon: FaHeart,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 72,
    path: "/wizards/counselor",
    description: "Emotional support and healing professionals",
    longDescription: "Find licensed counselors and therapists who provide emotional support, mental health guidance, and healing-focused approaches."
  },
  {
    id: 4,
    name: "Mentor",
    icon: FaLightbulb,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 36,
    path: "/wizards/mentor",
    description: "Wisdom and guidance from experience",
    longDescription: "Learn from seasoned mentors who share their experience, wisdom, and insights to guide your personal and professional development."
  }
];

function Wizards() {
  return (
    <div className="min-h-screen bg-wizardoo-neutral-50">
      {/* Header Section */}
      <div className="wizardoo-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Find Your Perfect Wizard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-wizardoo-neutral-100 max-w-3xl mx-auto"
          >
            Browse our curated selection of expert coaches, consultants, counselors, and mentors ready to guide your transformation journey.
          </motion.p>
        </div>
      </div>

      {/* Wizard Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wizardCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-wizardoo-neutral-200"
            >
              <div className="md:flex">
                <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 wizardoo-gradient opacity-20"></div>
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <category.icon className="text-3xl text-wizardoo-green-700 mr-4" />
                    <h3 className="font-display text-2xl font-bold text-wizardoo-green-800">{category.name}</h3>
                  </div>
                  <p className="text-wizardoo-neutral-600 mb-4 font-medium">{category.description}</p>
                  <p className="text-wizardoo-neutral-500 text-sm mb-6">{category.longDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-wizardoo-gold-100 text-wizardoo-gold-800 px-4 py-2 rounded-full text-sm font-semibold">
                      {category.count} Available
                    </span>
                    <Link
                      to={category.path}
                      className="wizardoo-button"
                    >
                      Explore {category.name}s
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-wizardoo-gold-50 rounded-2xl p-8 md:p-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8 text-wizardoo-green-800">
            Not Sure Which Type You Need?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <FaUserTie className="text-4xl text-wizardoo-green-700 mx-auto mb-4" />
              <h4 className="font-display font-semibold mb-3 text-wizardoo-green-800">Coach</h4>
              <p className="text-sm text-wizardoo-neutral-600">Perfect for achieving specific goals, improving performance, and building sustainable habits.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <FaBrain className="text-4xl text-wizardoo-green-700 mx-auto mb-4" />
              <h4 className="font-display font-semibold mb-3 text-wizardoo-green-800">Consultant</h4>
              <p className="text-sm text-wizardoo-neutral-600">Ideal for strategic business problems, analysis, and expert professional advice.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <FaHeart className="text-4xl text-wizardoo-green-700 mx-auto mb-4" />
              <h4 className="font-display font-semibold mb-3 text-wizardoo-green-800">Counselor</h4>
              <p className="text-sm text-wizardoo-neutral-600">Best for emotional support, mental health guidance, and healing-focused approaches.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <FaLightbulb className="text-4xl text-wizardoo-green-700 mx-auto mb-4" />
              <h4 className="font-display font-semibold mb-3 text-wizardoo-green-800">Mentor</h4>
              <p className="text-sm text-wizardoo-neutral-600">Great for long-term guidance, wisdom sharing, and personal development.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wizards;