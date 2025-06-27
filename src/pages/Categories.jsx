import { motion } from 'framer-motion';
import { FaUserTie, FaBrain, FaHeart, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Coach",
    icon: FaUserTie,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 45,
    path: "/categories/coach",
    description: "Performance and goal achievement specialists"
  },
  {
    id: 2,
    name: "Consultant",
    icon: FaBrain,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 58,
    path: "/categories/consultant",
    description: "Strategic problem solving experts"
  },
  {
    id: 3,
    name: "Counselor",
    icon: FaHeart,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 72,
    path: "/categories/counselor",
    description: "Emotional support and healing professionals"
  },
  {
    id: 4,
    name: "Mentor",
    icon: FaLightbulb,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 36,
    path: "/categories/mentor",
    description: "Wisdom and guidance from experience"
  }
];

function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Wizard Categories</h1>
        <p className="text-gray-600 text-lg">Choose the type of guidance that resonates with your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link to={category.path} key={category.id}>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer bg-white"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                  <category.icon className="text-5xl mb-4 text-wizardoo-gold-300" />
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm text-center px-4 mb-4 text-gray-200">
                    {category.description}
                  </p>
                  <div className="bg-wizardoo-green-700 px-4 py-2 rounded-full">
                    <span className="font-semibold">{category.count} Available</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 text-center">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h4>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="text-wizardoo-green-700 font-semibold">
                  View {category.count} {category.name}s →
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      
      {/* Additional Info Section */}
      <div className="mt-16 bg-wizardoo-gold-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Not Sure Which Type You Need?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <FaUserTie className="text-3xl text-wizardoo-green-700 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Coach</h4>
            <p className="text-sm text-gray-600">For achieving specific goals and improving performance</p>
          </div>
          <div className="text-center">
            <FaBrain className="text-3xl text-wizardoo-green-700 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Consultant</h4>
            <p className="text-sm text-gray-600">For strategic business problems and expert advice</p>
          </div>
          <div className="text-center">
            <FaHeart className="text-3xl text-wizardoo-green-700 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Counselor</h4>
            <p className="text-sm text-gray-600">For emotional support and mental health guidance</p>
          </div>
          <div className="text-center">
            <FaLightbulb className="text-3xl text-wizardoo-green-700 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Mentor</h4>
            <p className="text-sm text-gray-600">For long-term guidance and wisdom sharing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;