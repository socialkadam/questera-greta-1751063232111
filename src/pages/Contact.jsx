import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
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
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-3xl mx-auto"
            style={{ color: '#023d39' }}
          >
            Have questions about finding your perfect wizard? We're here to help guide your transformation journey.
          </motion.p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
            >
              <h2 className="font-display text-2xl font-semibold mb-8 text-kadam-deep-green">Let's Connect</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-kadam-gold p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-kadam-deep-green text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kadam-deep-green mb-1">Email</h3>
                    <p className="text-gray-600">support@wizardoo.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-kadam-gold p-3 rounded-lg mr-4">
                    <FaPhone className="text-kadam-deep-green text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kadam-deep-green mb-1">Phone</h3>
                    <p className="text-gray-600">+61-404873902</p>
                    <p className="text-gray-600 text-sm">Mon-Fri 9AM-6PM AEST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-kadam-gold p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-kadam-deep-green text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-kadam-deep-green mb-1">Office</h3>
                    <p className="text-gray-600">Brisbane, QLD, Australia</p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-10 p-6 bg-kadam-light-green rounded-xl">
                <h3 className="font-display font-semibold text-kadam-deep-green mb-3">Need Help Finding a Wizard?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our team can help match you with the perfect coach, consultant, counselor, or mentor for your specific needs.
                </p>
                <button className="bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                  Schedule a Call
                </button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
            >
              <h2 className="font-display text-2xl font-semibold mb-8 text-kadam-deep-green">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kadam-gold focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kadam-gold focus:border-transparent transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kadam-gold focus:border-transparent transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-kadam-gold focus:border-transparent transition-all"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-kadam-deep-green hover:bg-kadam-medium-green text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;