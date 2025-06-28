import {motion} from 'framer-motion';
import {FaClock, FaEnvelope, FaEdit} from 'react-icons/fa';
import {FaWandMagicSparkles} from 'react-icons/fa6';
import {Link} from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function WizardPendingApproval() {
  return (
    <div className="min-h-screen bg-kadam-off-white flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        className="max-w-2xl w-full text-center"
      >
        <div className="kadam-card-elevated p-12">
          {/* Success Icon */}
          <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{delay: 0.2, type: "spring", stiffness: 200}}
            className="inline-flex items-center justify-center w-24 h-24 bg-kadam-gold rounded-full mb-8"
          >
            <FaWandMagicSparkles className="text-4xl text-kadam-deep-green" />
          </motion.div>

          {/* Main Message */}
          <h1 className="kadam-heading text-3xl mb-6 text-kadam-deep-green">
            Welcome to Wizardoo!
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 kadam-body-medium">
            Your wizard application has been submitted successfully and is now under review.
          </p>

          {/* Status Card */}
          <div className="bg-kadam-light-green border-2 border-kadam-gold rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaClock className="text-2xl text-kadam-deep-green mr-3" />
              <span className="kadam-subheading text-lg text-kadam-deep-green">
                Application Status: Pending Review
              </span>
            </div>
            <p className="text-gray-600 kadam-body">
              Our team typically reviews applications within 2-3 business days. 
              We'll notify you via email once your profile has been approved.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="text-left mb-8">
            <h2 className="kadam-subheading text-xl mb-6 text-kadam-deep-green text-center">
              What Happens Next?
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-kadam-gold rounded-full p-2 mr-4 mt-1">
                  <span className="text-kadam-deep-green font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="kadam-body-medium font-semibold mb-1">Application Review</h3>
                  <p className="text-gray-600 kadam-body">
                    Our team will review your credentials, experience, and application details.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-kadam-gold rounded-full p-2 mr-4 mt-1">
                  <span className="text-kadam-deep-green font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="kadam-body-medium font-semibold mb-1">Email Notification</h3>
                  <p className="text-gray-600 kadam-body">
                    You'll receive an email with your approval status and next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-kadam-gold rounded-full p-2 mr-4 mt-1">
                  <span className="text-kadam-deep-green font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="kadam-body-medium font-semibold mb-1">Profile Goes Live</h3>
                  <p className="text-gray-600 kadam-body">
                    Once approved, your wizard profile will be visible to seekers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <FaEnvelope className="text-kadam-deep-green mr-2" />
              <span className="kadam-body-medium text-kadam-deep-green">
                Questions about your application?
              </span>
            </div>
            <p className="text-gray-600 kadam-body">
              Contact our support team at{' '}
              <a 
                href="mailto:wizards@wizardoo.com" 
                className="text-kadam-deep-green hover:text-kadam-medium-green font-medium"
              >
                wizards@wizardoo.com
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="kadam-button-outline text-center"
            >
              Return to Homepage
            </Link>
            
            <Link
              to="/profile"
              className="kadam-button text-center flex items-center justify-center"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </Link>
          </div>
        </div>
      </motion.div>

      <ScrollToTop />
    </div>
  );
}

export default WizardPendingApproval;