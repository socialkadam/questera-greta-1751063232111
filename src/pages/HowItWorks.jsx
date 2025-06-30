import { motion } from 'framer-motion'
import { FaSearch, FaUserCheck, FaCalendarAlt, FaRocket, FaChartLine, FaStar } from 'react-icons/fa'
import { FaWandMagicSparkles, FaBrain, FaHeart, FaLightbulb } from 'react-icons/fa6'
import ScrollToTop from '../components/ScrollToTop'

const steps = [
  {
    id: 1,
    icon: FaSearch,
    title: "Discover Your Match",
    description: "Tell us your goals, challenges, or what you're looking to achieve. Our AI analyzes your needs and recommends the perfect wizard type and specialization.",
    details: [
      "AI-powered matching system",
      "Personalized recommendations", 
      "Browse by specialization",
      "Read detailed profiles"
    ]
  },
  {
    id: 2,
    icon: FaUserCheck,
    title: "Connect with Your Wizard",
    description: "Review wizard profiles, read testimonials, and choose the expert who resonates with you. All our wizards are verified professionals.",
    details: [
      "Verified expert credentials",
      "Real client testimonials",
      "Transparent pricing",
      "Multiple session formats"
    ]
  },
  {
    id: 3,
    icon: FaCalendarAlt,
    title: "Schedule & Start",
    description: "Book your session at a time that works for you. Choose from video calls, phone sessions, or chat-based guidance.",
    details: [
      "Flexible scheduling",
      "Video, phone, or chat options",
      "Secure payment processing",
      "Session reminders"
    ]
  },
  {
    id: 4,
    icon: FaRocket,
    title: "Transform & Grow",
    description: "Work with your wizard to achieve your goals. Track progress, complete assignments, and celebrate breakthroughs.",
    details: [
      "Personalized action plans",
      "Progress tracking tools",
      "Homework and exercises",
      "Ongoing support"
    ]
  }
]

const wizardTypes = [
  {
    icon: FaUserCheck,
    name: "Coaches",
    description: "Performance optimization, goal achievement, habit formation",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: FaBrain,
    name: "Consultants", 
    description: "Strategic problem-solving, business insights, expert analysis",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: FaHeart,
    name: "Counselors",
    description: "Emotional support, mental health, healing and recovery",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: FaLightbulb,
    name: "Mentors",
    description: "Wisdom sharing, career guidance, long-term development",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  }
]

const benefits = [
  {
    icon: FaStar,
    title: "Quality Assurance",
    description: "All wizards undergo rigorous verification of credentials and experience"
  },
  {
    icon: FaChartLine,
    title: "Measurable Results",
    description: "Track your progress with built-in tools and milestone celebrations"
  },
  {
    icon: FaWandMagicSparkles,
    title: "Personalized Experience",
    description: "AI-powered matching ensures you connect with the right expert for your needs"
  }
]

function HowItWorks() {
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
            How Wizardoo Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl max-w-4xl mx-auto kadam-body-medium text-white/90"
          >
            Your journey to transformation starts here. Discover how our platform connects you with the perfect expert to guide your growth.
          </motion.p>
        </div>
      </div>

      {/* Main Process Steps */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="kadam-heading text-display-md text-kadam-deep-green mb-6">
            Your Transformation Journey in 4 Steps
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto kadam-body">
            From discovery to transformation, we've designed a seamless experience to connect you with the right expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-kadam-gold rounded-full mb-4 shadow-glow">
                  <step.icon className="text-3xl text-kadam-deep-green" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-kadam-deep-green text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>
              </div>
              
              <h3 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">
                {step.title}
              </h3>
              
              <p className="text-gray-600 mb-6 kadam-body">
                {step.description}
              </p>
              
              <ul className="text-sm text-gray-500 space-y-2">
                {step.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-kadam-gold rounded-full mr-2"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Wizard Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="kadam-card-elevated p-12 mb-20"
        >
          <h2 className="kadam-heading text-display-md text-kadam-deep-green text-center mb-12">
            Choose Your Type of Wizard
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wizardTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`${type.bgColor} p-8 rounded-2xl text-center border-2 border-transparent hover:border-kadam-gold transition-all duration-300`}
              >
                <type.icon className={`text-4xl ${type.color} mx-auto mb-4`} />
                <h3 className="kadam-subheading text-lg mb-3 text-kadam-deep-green">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 kadam-body">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-kadam-light-green p-12 rounded-3xl"
        >
          <h2 className="kadam-heading text-display-md text-kadam-deep-green text-center mb-12">
            Why Choose Wizardoo?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kadam-gold rounded-full mb-6">
                  <benefit.icon className="text-2xl text-kadam-deep-green" />
                </div>
                <h3 className="kadam-subheading text-xl mb-4 text-kadam-deep-green">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 kadam-body">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-kadam-deep-green py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="kadam-heading text-display-md mb-8 text-white">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-xl text-white mb-12 font-medium kadam-body-medium max-w-3xl mx-auto">
            Join thousands who have already transformed their lives with expert guidance. Your perfect wizard is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-kadam-gold hover:bg-kadam-soft-gold text-kadam-deep-green px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-large">
              Find My Wizard
            </button>
            <button className="border-2 border-kadam-gold text-kadam-gold hover:bg-kadam-gold hover:text-kadam-deep-green px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300">
              Become a Wizard
            </button>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  )
}

export default HowItWorks