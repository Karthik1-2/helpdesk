import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  role: 'student' | 'admin';
  children: ReactNode;
}

export const ProtectedRoute = ({ role, children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={role === 'admin' ? '/admin/login' : '/student/login'} replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
