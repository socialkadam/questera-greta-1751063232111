import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useAuth} from '../context/AuthContext';
import {FaUser,FaLock,FaGoogle,FaApple} from 'react-icons/fa';

function Login() {
  const navigate=useNavigate();
  const {login}=useAuth();
  const [formData,setFormData]=useState({
    email: '',
    password: ''
  });

  const handleSubmit=(e)=> {
    e.preventDefault();
    login(formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-kadam-off-white flex items-center justify-center py-16 px-6">
      <motion.div 
        initial={{opacity: 0,y: 30}} 
        animate={{opacity: 1,y: 0}} 
        className="max-w-lg w-full space-y-8"
      >
        
        <div className="kadam-card-elevated p-12">
          <div className="text-center mb-12">
            <h2 className="kadam-heading text-display-md mb-4">Welcome Back</h2>
            <p className="kadam-body text-gray-600 text-lg">
              Sign in to continue your transformation journey
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 kadam-body-medium">
              <FaGoogle className="mr-3 text-red-500 text-xl" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all duration-300 kadam-body-medium">
              <FaApple className="mr-3 text-black text-xl" />
              Continue with Apple
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-kadam-off-white text-gray-500 kadam-body">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-gray-700 kadam-body-medium text-lg mb-3">Email Address</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input 
                  type="email"
                  required
                  className="kadam-input pl-14 text-lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e)=> setFormData({...formData,email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 kadam-body-medium text-lg mb-3">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input 
                  type="password"
                  required
                  className="kadam-input pl-14 text-lg"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e)=> setFormData({...formData,password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input 
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-kadam-gold focus:ring-kadam-gold border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block kadam-body text-gray-700">
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="w-full kadam-button text-lg">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 kadam-body">
              Don't have an account?{' '}
              <Link to="/signup" className="kadam-body-medium text-kadam-deep-green hover:text-kadam-medium-green">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default Login;