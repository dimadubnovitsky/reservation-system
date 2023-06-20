import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = ({ isAuth }) => {
  if (isAuth) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default PublicRoute;
