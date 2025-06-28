import {useAuth} from '../context/AuthContext';
import {Navigate} from 'react-router-dom';

function RoleGuard({children, requiredRole, requiredPermission, fallback = null}) {
  const {user, isRole, hasPermission, loading} = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kadam-deep-green"></div>
      </div>
    );
  }

  // Check role requirement
  if (requiredRole && !isRole(requiredRole)) {
    return fallback || <Navigate to="/login" replace />;
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-kadam-deep-green mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
}

export default RoleGuard;