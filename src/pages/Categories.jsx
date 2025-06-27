import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Breakfast",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 45,
    path: "/categories/breakfast"
  },
  {
    id: 2,
    name: "Lunch",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 58,
    path: "/categories/lunch"
  },
  {
    id: 3,
    name: "Dinner",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 72,
    path: "/categories/dinner"
  },
  {
    id: 4,
    name: "Desserts",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    count: 36,
    path: "/categories/desserts"
  }
];

function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Recipe Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link to={category.path} key={category.id}>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <FaUtensils className="text-4xl mb-4" />
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-lg">
                  <span className="bg-orange-500 px-3 py-1 rounded-full">
                    {category.count} Recipes
                  </span>
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;