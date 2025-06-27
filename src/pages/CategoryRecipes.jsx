import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaClock, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Mock data for category recipes
const categoryRecipes = {
  breakfast: [
    {
      id: 1,
      title: "Classic French Toast",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "20 mins",
      difficulty: "Easy",
      likes: 342
    },
    {
      id: 2,
      title: "Avocado Toast with Eggs",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "15 mins",
      difficulty: "Easy",
      likes: 256
    },
    {
      id: 3,
      title: "Blueberry Pancakes",
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "25 mins",
      difficulty: "Medium",
      likes: 423
    }
  ],
  lunch: [
    {
      id: 4,
      title: "Quinoa Buddha Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "30 mins",
      difficulty: "Medium",
      likes: 289
    },
    {
      id: 5,
      title: "Grilled Chicken Salad",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "25 mins",
      difficulty: "Easy",
      likes: 312
    }
  ],
  dinner: [
    {
      id: 6,
      title: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "30 mins",
      difficulty: "Medium",
      likes: 521
    },
    {
      id: 7,
      title: "Grilled Salmon",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "35 mins",
      difficulty: "Medium",
      likes: 434
    }
  ],
  desserts: [
    {
      id: 8,
      title: "Chocolate Lava Cake",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "40 mins",
      difficulty: "Hard",
      likes: 678
    },
    {
      id: 9,
      title: "Vanilla Bean Cheesecake",
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      time: "3 hours",
      difficulty: "Hard",
      likes: 542
    }
  ]
};

function CategoryRecipes() {
  const { category } = useParams();
  const recipes = categoryRecipes[category.toLowerCase()] || [];
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{categoryTitle} Recipes</h1>
        <p className="text-gray-600">Discover our collection of delicious {categoryTitle.toLowerCase()} recipes</p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:text-red-500 transition-colors">
                    <FaHeart />
                  </button>
                </div>
              </div>
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
                  <div className="flex items-center text-red-500">
                    <FaHeart className="mr-2" />
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
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No recipes found for this category.</p>
        </div>
      )}
    </div>
  );
}

export default CategoryRecipes;