import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to='/admin/login' />;
  }

  return children;
}

export default ProtectedRoute;