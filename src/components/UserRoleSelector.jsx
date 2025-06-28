import {useState} from 'react';
import {useAuth} from '../context/AuthContext';
import {FaUser, FaWandMagicSparkles, FaUsers, FaCrown, FaChevronDown} from 'react-icons/fa6';
import {motion, AnimatePresence} from 'framer-motion';

const ROLE_ICONS = {
  seeker: FaUser,
  wizard: FaWandMagicSparkles,
  admin: FaCrown
};

const ROLE_COLORS = {
  seeker: 'text-blue-600 bg-blue-50',
  wizard: 'text-purple-600 bg-purple-50',
  admin: 'text-red-600 bg-red-50'
};

function UserRoleSelector({showLabel = true}) {
  const {user, switchRole, getRoleDisplayName, USER_ROLES} = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const availableRoles = [
    USER_ROLES.SEEKER,
    USER_ROLES.WIZARD,
    USER_ROLES.ADMIN
  ];

  const handleRoleChange = (newRole) => {
    switchRole(newRole);
    setIsOpen(false);
  };

  const currentRoleIcon = ROLE_ICONS[user.role];
  const CurrentIcon = currentRoleIcon || FaUser;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
          ROLE_COLORS[user.role] || 'text-gray-600 bg-gray-50'
        } hover:shadow-md`}
      >
        <CurrentIcon className="text-lg" />
        {showLabel && (
          <>
            <span className="font-medium">{getRoleDisplayName(user.role)}</span>
            <FaChevronDown className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: -10, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -10, scale: 0.95}}
            transition={{duration: 0.2}}
            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-gray-200 z-50"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Switch Role
              </div>
              {availableRoles.map((role) => {
                const RoleIcon = ROLE_ICONS[role] || FaUser;
                const isActive = user.role === role;
                
                return (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? ROLE_COLORS[role] + ' font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <RoleIcon className="text-lg" />
                    <span>{getRoleDisplayName(role)}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-current rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default UserRoleSelector;