import { useParams } from 'react-router-dom';
import { FaClock, FaUsers, FaHeart, FaPrint, FaShare } from 'react-icons/fa';

function RecipeDetail() {
  const { id } = useParams();
  
  // Mock recipe data (in a real app, this would come from an API)
  const recipe = {
    id,
    title: "Classic Spaghetti Carbonara",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    prepTime: "15 mins",
    cookTime: "15 mins",
    servings: 4,
    description: "A traditional Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino Romano cheese",
      "100g Parmigiano-Reggiano",
      "Black pepper",
      "Salt"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
      "While the pasta cooks, cut the pancetta into small cubes and fry until crispy.",
      "In a bowl, whisk together eggs, grated cheeses, and black pepper.",
      "Drain pasta, reserving some pasta water.",
      "Combine hot pasta with pancetta, then quickly stir in the egg mixture.",
      "Add pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra cheese and black pepper."
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
        </div>

        {/* Recipe Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            <FaHeart className="mr-2" /> Save Recipe
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            <FaPrint className="mr-2" /> Print
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            <FaShare className="mr-2" /> Share
          </button>
        </div>

        {/* Recipe Description */}
        <p className="text-gray-600 mb-8">{recipe.description}</p>

        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="bg-orange-50 rounded-lg p-6 space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="font-bold mr-4">{index + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;