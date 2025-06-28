import {motion} from 'framer-motion';
import {FaHeart,FaUsers,FaStar,FaGlobe} from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop';

function About() {
  return (
    <div className="min-h-screen bg-kadam-off-white">
      
      {/* Hero Section - Dark Background */}
      <div className="py-24" style={{backgroundColor: '#013d39'}}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{opacity: 0,y: 30}} 
            animate={{opacity: 1,y: 0}} 
            className="kadam-heading text-hero text-white mb-8"
          >
            About Wizardoo
          </motion.h1>
          <motion.p 
            initial={{opacity: 0,y: 30}} 
            animate={{opacity: 1,y: 0}} 
            transition={{delay: 0.2}} 
            className="text-2xl max-w-3xl mx-auto kadam-body-medium text-white/90"
          >
            Your Personal Transformation Engine
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          
          <div className="kadam-card-elevated p-12 md:p-16 mb-16">
            <motion.div 
              initial={{opacity: 0,y: 40}} 
              animate={{opacity: 1,y: 0}} 
              className="text-center mb-16"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Team collaboration" 
                className="w-full h-96 object-cover rounded-3xl mb-12 shadow-medium" 
              />
              <h2 className="kadam-heading text-display-md text-kadam-deep-green mb-8">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed kadam-body">
                At Wizardoo, we believe that everyone deserves access to transformational guidance. Our platform connects you with expert coaches, consultants, counselors, and mentors who are passionate about helping you unlock your full potential.
              </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed kadam-body">
                Through the power of AI-driven matching and human wisdom, we create meaningful connections that lead to lasting personal and professional transformation.
              </p>
            </motion.div>

            {/* Values Section */}
            <motion.div 
              initial={{opacity: 0,y: 40}} 
              animate={{opacity: 1,y: 0}} 
              transition={{delay: 0.3}} 
              className="bg-kadam-light-green p-12 rounded-3xl"
            >
              <h2 className="kadam-heading text-display-md text-kadam-deep-green text-center mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="text-center">
                  <div className="bg-kadam-gold p-6 rounded-3xl inline-block mb-6">
                    <FaHeart className="text-4xl text-kadam-deep-green" />
                  </div>
                  <h4 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">Authentic Connection</h4>
                  <p className="kadam-body text-gray-600">We facilitate genuine relationships between seekers and guides</p>
                </div>
                <div className="text-center">
                  <div className="bg-kadam-gold p-6 rounded-3xl inline-block mb-6">
                    <FaUsers className="text-4xl text-kadam-deep-green" />
                  </div>
                  <h4 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">Community Focus</h4>
                  <p className="kadam-body text-gray-600">Building a supportive ecosystem of growth and transformation</p>
                </div>
                <div className="text-center">
                  <div className="bg-kadam-gold p-6 rounded-3xl inline-block mb-6">
                    <FaStar className="text-4xl text-kadam-deep-green" />
                  </div>
                  <h4 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">Excellence</h4>
                  <p className="kadam-body text-gray-600">Curated network of top-tier professionals and experts</p>
                </div>
                <div className="text-center">
                  <div className="bg-kadam-gold p-6 rounded-3xl inline-block mb-6">
                    <FaGlobe className="text-4xl text-kadam-deep-green" />
                  </div>
                  <h4 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">Global Accessibility</h4>
                  <p className="kadam-body text-gray-600">Making transformation guidance available worldwide</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{opacity: 0,y: 40}} 
            animate={{opacity: 1,y: 0}} 
            transition={{delay: 0.4}} 
            className="kadam-card-elevated p-12 md:p-16"
          >
            <h2 className="kadam-heading text-display-md text-kadam-deep-green text-center mb-12">
              Transforming Lives Worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-6xl font-bold text-kadam-gold mb-4 kadam-heading">5,000+</div>
                <p className="text-gray-600 text-xl kadam-body-medium">Active Users</p>
              </div>
              <div>
                <div className="text-6xl font-bold text-kadam-gold mb-4 kadam-heading">211</div>
                <p className="text-gray-600 text-xl kadam-body-medium">Expert Wizards</p>
              </div>
              <div>
                <div className="text-6xl font-bold text-kadam-gold mb-4 kadam-heading">98%</div>
                <p className="text-gray-600 text-xl kadam-body-medium">Satisfaction Rate</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll to Top Component */}
      <ScrollToTop />
    </div>
  );
}

export default About;