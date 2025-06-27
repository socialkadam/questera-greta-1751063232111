import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

const categories = [
  {
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/categories/breakfast'
  },
  {
    name: 'Lunch',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/categories/lunch'
  },
  {
    name: 'Dinner',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/categories/dinner'
  },
  {
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    path: '/categories/desserts'
  }
];

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-white mb-6"
            >
              Discover Delicious Recipes
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 mb-8"
            >
              Find and share the best recipes from around the world
            </motion.p>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl relative">
              <input
                type="text"
                placeholder="Search recipes..."
                className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-500 text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <Link
                  to={category.path}
                  className="text-orange-500 flex items-center hover:text-orange-600"
                >
                  View Recipes <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Cooking?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community and share your favorite recipes with food lovers around the world.
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;