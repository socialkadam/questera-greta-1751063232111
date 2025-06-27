import { motion } from 'framer-motion';
import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const recipes = [
  {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    time: "30 mins",
    difficulty: "Medium",
    likes: 245
  },
  {
    id: 2,
    title: "Healthy Buddha Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    time: "20 mins",
    difficulty: "Easy",
    likes: 189
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    time: "45 mins",
    difficulty: "Easy",
    likes: 567
  }
];

function Recipes() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Latest Recipes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <div className="flex items-center justify-between text-gray-500 mb-4">
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center">
                  <FaUtensils className="mr-2" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center">
                  <FaHeart className="mr-2 text-red-500" />
                  <span>{recipe.likes}</span>
                </div>
              </div>
              <Link
                to={`/recipes/${recipe.id}`}
                className="block w-full text-center bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                View Recipe
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;