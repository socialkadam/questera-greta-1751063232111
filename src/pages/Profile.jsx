import {useState} from 'react';
import {FaUser,FaEdit,FaHeart} from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';

function Profile() {
  const [user]=useState({
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    savedRecipes: [
      {
        id: 1,
        title: 'Classic Spaghetti Carbonara',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 2,
        title: 'Healthy Buddha Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
      }
    ]
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 rounded-full object-cover" 
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <button className="mt-2 flex items-center text-orange-500 hover:text-orange-600">
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Saved Recipes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FaHeart className="text-red-500 mr-2" />
            Saved Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.savedRecipes.map((recipe)=> (
              <div key={recipe.id} className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-4">
                  <h3 className="font-semibold">{recipe.title}</h3>
                  <button className="mt-2 text-orange-500 hover:text-orange-600">
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll to Top Component */}
      <ScrollToTop />
    </div>
  );
}

export default Profile;