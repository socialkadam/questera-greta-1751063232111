import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Wizards from './pages/Wizards'
import WizardListing from './pages/WizardListing'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import BecomeWizard from './pages/BecomeWizard'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SignupWizard from './pages/SignupWizard'
import WizardPendingApproval from './pages/WizardPendingApproval'
import Profile from './pages/Profile'
import SeekerOnboarding from './pages/SeekerOnboarding'
import WizardVetting from './pages/WizardVetting'
import Academy from './pages/Academy'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-kadam-off-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/wizards" element={<WizardListing />} />
              <Route path="/wizards-overview" element={<Wizards />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/become-wizard" element={<BecomeWizard />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup-wizard" element={<SignupWizard />} />
              <Route path="/wizard-pending-approval" element={<WizardPendingApproval />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/seeker-onboarding" element={<SeekerOnboarding />} />
              <Route path="/wizard-vetting" element={<WizardVetting />} />
              <Route path="/academy" element={<Academy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App