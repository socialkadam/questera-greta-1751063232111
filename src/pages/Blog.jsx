import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaArrowRight, FaEnvelope, FaUserAlt } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: "The Science of Personal Transformation",
    excerpt: "Discover the neurological and psychological principles behind lasting personal change and how to leverage them for your growth journey.",
    author: "Dr. Sarah Chen",
    date: "December 15, 2024",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Psychology"
  },
  {
    id: 2,
    title: "Finding the Right Mentor: A Complete Guide",
    excerpt: "Learn how to identify, approach, and build meaningful relationships with mentors who can accelerate your personal and professional development.",
    author: "Michael Rodriguez",
    date: "December 12, 2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Mentorship"
  },
  {
    id: 3,
    title: "Digital Wellness and Mental Health",
    excerpt: "Explore strategies for maintaining mental wellness in our digital age and how technology can support rather than hinder your well-being.",
    author: "Dr. Emma Thompson",
    date: "December 10, 2024",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Wellness"
  }
];

function Blog() {
  const [newsletterData, setNewsletterData] = useState({
    name: '',
    email: ''
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', newsletterData);
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterData({ name: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-kadam-off-white">
      {/* Header Section */}
      <div className="kadam-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
            style={{ color: '#023d39' }}
          >
            Wisdom & Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
            style={{ color: '#023d39' }}
          >
            Discover transformational insights, expert guidance, and practical wisdom to accelerate your personal growth journey.
          </motion.p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-kadam-gold text-kadam-deep-green px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-kadam-deep-green hover:text-kadam-medium-green cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaUser className="mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendar className="mr-2" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <button className="flex items-center text-kadam-deep-green hover:text-kadam-medium-green font-semibold transition-colors">
                  Read More
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Subscription Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-lg border border-gray-200">
            <h2 className="font-display text-2xl font-bold mb-4 text-kadam-deep-green">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest transformational content, expert interviews, and practical guides delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kadam-gold focus:border-transparent transition-all"
                    value={newsletterData.name}
                    onChange={(e) => setNewsletterData({ ...newsletterData, name: e.target.value })}
                  />
                </div>
                
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kadam-gold focus:border-transparent transition-all"
                    value={newsletterData.email}
                    onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Subscribe to Our Newsletter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;