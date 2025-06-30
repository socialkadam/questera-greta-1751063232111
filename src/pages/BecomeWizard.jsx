import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUserTie, FaBrain, FaHeart, FaLightbulb, FaCheckCircle, FaDollarSign, FaCalendarAlt, FaUsers } from 'react-icons/fa'
import { FaWandMagicSparkles } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

const wizardTypes = [
  {
    icon: FaUserTie,
    name: "Coach",
    description: "Help others achieve specific goals and improve performance",
    specializations: ["Career", "Fitness", "Productivity", "Life", "Wellness"],
    earnings: "$80-200/hour",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: FaBrain,
    name: "Consultant", 
    description: "Provide strategic insights and expert problem-solving",
    specializations: ["Business", "Strategy", "Marketing", "Operations", "Finance"],
    earnings: "$150-400/hour",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: FaHeart,
    name: "Counselor",
    description: "Offer emotional support and healing-focused guidance",
    specializations: ["Stress", "Relationships", "Mental Health", "Trauma", "Anxiety"],
    earnings: "$100-250/hour",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: FaLightbulb,
    name: "Mentor",
    description: "Share wisdom and guide personal/professional development",
    specializations: ["Entrepreneurship", "Leadership", "Career", "Personal Growth"],
    earnings: "$120-350/hour",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
]

const benefits = [
  {
    icon: FaDollarSign,
    title: "Flexible Earnings",
    description: "Set your own rates and work schedule. Our wizards earn between $80-400 per hour."
  },
  {
    icon: FaCalendarAlt,
    title: "Complete Control",
    description: "Choose your availability, session types, and the clients you want to work with."
  },
  {
    icon: FaUsers,
    title: "Global Reach",
    description: "Connect with seekers worldwide and build a diverse, international client base."
  },
  {
    icon: FaWandMagicSparkles,
    title: "Platform Support",
    description: "Benefit from our marketing, client matching, and secure payment processing."
  }
]

const requirements = [
  "Minimum 2-3 years relevant professional experience",
  "Valid credentials, certifications, or proven expertise in your field",
  "Strong communication skills and empathetic approach",
  "Commitment to helping others achieve their goals",
  "Reliable internet connection for video sessions",
  "Professional demeanor and ethical standards"
]

const applicationProcess = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete our comprehensive application with your background, experience, and specializations."
  },
  {
    step: 2,
    title: "Verification Process",
    description: "Our team reviews your credentials, experience, and conducts a brief interview."
  },
  {
    step: 3,
    title: "Profile Creation",
    description: "Once approved, we help you create an optimized profile that attracts the right clients."
  },
  {
    step: 4,
    title: "Start Earning",
    description: "Begin receiving client matches and start your journey as a Wizardoo expert."
  }
]

function BecomeWizard() {
  const [selectedType, setSelectedType] = useState(null)

  return (
    <div className="min-h-screen bg-kadam-off-white">
      {/* Hero Section */}
      <div className="py-24" style={{ backgroundColor: '#013d39' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="kadam-heading text-hero text-white mb-8"
          >
            Become a Wizardoo Expert
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl max-w-4xl mx-auto kadam-body-medium text-white/90 mb-12"
          >
            Share your expertise, transform lives, and earn on your own terms. Join our global network of transformation experts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/signup-wizard"
              className="bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large inline-flex items-center"
            >
              <FaWandMagicSparkles className="mr-3" />
              Apply Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Wizard Types Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="kadam-heading text-display-md text-kadam-deep-green mb-6">
            Choose Your Wizard Type
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto kadam-body">
            Select the type of guidance that aligns with your expertise and passion for helping others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {wizardTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedType(selectedType === type.name ? null : type.name)}
              className={`${type.bgColor} p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedType === type.name 
                  ? 'border-kadam-gold shadow-large' 
                  : 'border-transparent hover:border-kadam-gold hover:shadow-medium'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <type.icon className={`text-4xl ${type.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="kadam-subheading text-xl mb-3 text-kadam-deep-green">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 mb-4 kadam-body">
                    {type.description}
                  </p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-kadam-deep-green mb-2">Specializations:</p>
                    <div className="flex flex-wrap gap-2">
                      {type.specializations.map((spec, idx) => (
                        <span key={idx} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-kadam-deep-green">
                      {type.earnings}
                    </span>
                    <FaCheckCircle className={`text-xl ${selectedType === type.name ? 'text-kadam-gold' : 'text-gray-300'}`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="kadam-card-elevated p-12 mb-16"
        >
          <h2 className="kadam-heading text-display-md text-kadam-deep-green text-center mb-12">
            Why Join Wizardoo?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kadam-gold rounded-full mb-6">
                  <benefit.icon className="text-2xl text-kadam-deep-green" />
                </div>
                <h3 className="kadam-subheading text-lg mb-3 text-kadam-deep-green">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm kadam-body">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Requirements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-kadam-light-green p-8 rounded-2xl"
          >
            <h3 className="kadam-subheading text-xl mb-6 text-kadam-deep-green">
              Wizard Requirements
            </h3>
            <ul className="space-y-4">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <FaCheckCircle className="text-kadam-gold mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 kadam-body">{req}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-soft"
          >
            <h3 className="kadam-subheading text-xl mb-6 text-kadam-deep-green">
              Application Process
            </h3>
            <div className="space-y-6">
              {applicationProcess.map((process, index) => (
                <div key={process.step} className="flex items-start">
                  <div className="w-8 h-8 bg-kadam-gold rounded-full flex items-center justify-center text-kadam-deep-green font-bold text-sm mr-4 flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h4 className="kadam-body-medium font-semibold mb-1">{process.title}</h4>
                    <p className="text-gray-600 text-sm kadam-body">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-kadam-deep-green p-12 rounded-3xl"
        >
          <h2 className="kadam-heading text-3xl mb-6 text-white">
            Ready to Share Your Expertise?
          </h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join our community of transformation experts and start making a meaningful impact while earning on your terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup-wizard"
              className="bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              <FaWandMagicSparkles className="mr-2" />
              Apply as Wizard
            </Link>
            <Link
              to="/contact"
              className="border-2 border-kadam-gold text-kadam-gold hover:bg-kadam-gold hover:text-kadam-deep-green px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
            >
              Ask Questions
            </Link>
          </div>
        </motion.div>
      </div>

      <ScrollToTop />
    </div>
  )
}

export default BecomeWizard