function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">About Foodie's Delight</h1>
        <img
          src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          alt="Chef cooking"
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
        <p className="text-lg text-gray-600 mb-6">
          Welcome to Foodie's Delight, where passion for cooking meets the joy of sharing! Created by Sarah, 
          a passionate home cook with over 15 years of culinary experience, this platform aims to bring 
          together food lovers from all around the world.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our mission is simple: to make cooking accessible, enjoyable, and inspiring for everyone. Whether 
          you're a beginner or an experienced chef, you'll find recipes that suit your skill level and taste 
          preferences.
        </p>
        <div className="bg-orange-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="text-left list-disc list-inside space-y-2">
            <li>Quality recipes tested in real home kitchens</li>
            <li>Clear, easy-to-follow instructions</li>
            <li>Community-driven sharing and feedback</li>
            <li>Celebration of diverse culinary traditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;