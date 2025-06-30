import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaCertificate, FaClock } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import AcademyEnrollment from '../components/AcademyEnrollment';
import TAPSQuadrant from '../components/TAPSQuadrant';
import ScrollToTop from '../components/ScrollToTop';

function Academy() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedArchetype, setSelectedArchetype] = useState(
    searchParams.get('archetype') || 'coach'
  );
  const [enrollmentStatus, setEnrollmentStatus] = useState({});

  const archetypes = [
    {
      type: 'coach',
      name: 'Coach',
      icon: '🎯',
      price: 297,
      duration: '6-8 weeks',
      modules: 12,
      description: 'Master performance coaching and goal achievement methodologies'
    },
    {
      type: 'mentor',
      name: 'Mentor',
      icon: '💡',
      price: 297,
      duration: '6-8 weeks',
      modules: 12,
      description: 'Learn wisdom-sharing and long-term development techniques'
    },
    {
      type: 'counselor',
      name: 'Counselor',
      icon: '❤️',
      price: 397,
      duration: '8-10 weeks',
      modules: 16,
      description: 'Develop emotional support and healing-focused approaches'
    },
    {
      type: 'consultant',
      name: 'Consultant',
      icon: '🧠',
      price: 497,
      duration: '8-12 weeks',
      modules: 20,
      description: 'Master strategic problem-solving and analytical methods'
    }
  ];

  const currentArchetype = archetypes.find(a => a.type === selectedArchetype);

  const handleEnrollmentChange = (archetype, isEnrolled) => {
    setEnrollmentStatus(prev => ({
      ...prev,
      [archetype]: isEnrolled
    }));
  };

  return (
    <div className="min-h-screen bg-kadam-off-white">
      {/* Header */}
      <div className="py-16" style={{ backgroundColor: '#013d39' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-kadam-gold rounded-full mb-6">
              <FaGraduationCap className="text-4xl text-kadam-deep-green" />
            </div>
            <h1 className="kadam-heading text-hero text-white mb-6">
              Wizardoo Academy
            </h1>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto kadam-body-medium">
              Transform your expertise into certified wizardry. Master your archetype and join our elite network.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Academy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="kadam-heading text-display-md text-kadam-deep-green mb-8">
            Professional Certification Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto kadam-body mb-12">
            Our comprehensive certification programs are designed to elevate your expertise and prepare you for success as a Wizardoo professional.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-kadam-gold rounded-full mb-4">
                <FaUsers className="text-xl text-kadam-deep-green" />
              </div>
              <div className="text-3xl font-bold text-kadam-deep-green mb-2">500+</div>
              <div className="text-gray-600">Certified Wizards</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-kadam-gold rounded-full mb-4">
                <FaCertificate className="text-xl text-kadam-deep-green" />
              </div>
              <div className="text-3xl font-bold text-kadam-deep-green mb-2">95%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-kadam-gold rounded-full mb-4">
                <FaClock className="text-xl text-kadam-deep-green" />
              </div>
              <div className="text-3xl font-bold text-kadam-deep-green mb-2">6-12</div>
              <div className="text-gray-600">Weeks</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-kadam-gold rounded-full mb-4">
                <FaWandMagicSparkles className="text-xl text-kadam-deep-green" />
              </div>
              <div className="text-3xl font-bold text-kadam-deep-green mb-2">100%</div>
              <div className="text-gray-600">Online</div>
            </div>
          </div>
        </motion.div>

        {/* Archetype Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="kadam-heading text-2xl text-center mb-8 text-kadam-deep-green">
            Choose Your Certification Path
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {archetypes.map((archetype) => (
              <motion.button
                key={archetype.type}
                onClick={() => setSelectedArchetype(archetype.type)}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center ${
                  selectedArchetype === archetype.type
                    ? 'border-kadam-gold bg-kadam-light-green shadow-medium'
                    : 'border-gray-200 bg-white hover:border-kadam-gold hover:shadow-soft'
                }`}
              >
                <div className="text-4xl mb-4">{archetype.icon}</div>
                <h4 className="kadam-subheading text-lg mb-3 text-kadam-deep-green">
                  {archetype.name}
                </h4>
                <div className="text-2xl font-bold text-kadam-deep-green mb-2">
                  ${archetype.price}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {archetype.duration} • {archetype.modules} modules
                </div>
                <p className="text-sm text-gray-600">
                  {archetype.description}
                </p>
                {enrollmentStatus[archetype.type] && (
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      Enrolled
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* TAPS Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <TAPSQuadrant 
            selectedArchetype={selectedArchetype}
            onArchetypeSelect={setSelectedArchetype}
          />
        </motion.div>

        {/* Enrollment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="kadam-heading text-3xl text-center mb-8 text-kadam-deep-green">
            {currentArchetype?.name} Certification Program
          </h3>
          
          <div className="max-w-4xl mx-auto">
            {user ? (
              <AcademyEnrollment 
                archetype={selectedArchetype}
                onEnrollmentChange={(isEnrolled) => 
                  handleEnrollmentChange(selectedArchetype, isEnrolled)
                }
              />
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-soft text-center">
                <h4 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">
                  Sign In Required
                </h4>
                <p className="text-gray-600 kadam-body mb-6">
                  Please sign in to access academy enrollment and track your progress.
                </p>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="kadam-button"
                >
                  Sign In to Continue
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Course Curriculum Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-8 shadow-soft"
        >
          <h3 className="kadam-heading text-2xl mb-6 text-center text-kadam-deep-green">
            {currentArchetype?.name} Curriculum Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { module: 1, title: "Foundations & Ethics", duration: "2 weeks" },
              { module: 2, title: "Core Methodologies", duration: "2 weeks" },
              { module: 3, title: "Client Relations", duration: "1 week" },
              { module: 4, title: "Platform Mastery", duration: "1 week" },
              { module: 5, title: "Practical Application", duration: "1 week" },
              { module: 6, title: "Certification Project", duration: "1 week" }
            ].map((item) => (
              <div key={item.module} className="bg-kadam-light-green p-4 rounded-xl">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-kadam-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-kadam-deep-green font-bold text-sm">
                      {item.module}
                    </span>
                  </div>
                  <h4 className="kadam-subheading text-lg text-kadam-deep-green">
                    {item.title}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Duration: {item.duration}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 kadam-body mb-4">
              All courses include live sessions, practical exercises, and ongoing support from certified instructors.
            </p>
            <button className="kadam-button-outline">
              View Full Curriculum
            </button>
          </div>
        </motion.div>
      </div>

      <ScrollToTop />
    </div>
  );
}

export default Academy;