import { Navigate, Outlet, RouteProps, useLocation } from 'react-router-dom';
import { ROUTE_PATH } from '../../utils/constant';
import Admin from '../../pages/Admin';
import { useAppSelector } from 'app/hooks';

export const PrivateRoute = () => {
	//Check if user is logged in
	//If yes, show route
	//Otherwise, redirect to login page
	const location = useLocation();
  const isLoggedIn = useAppSelector((state) => state.auth.isLogggedIn);

  if (isLoggedIn === undefined) {
    return null; // or a loading indicator, etc.
  }

  return isLoggedIn
    ? <Outlet />
    : <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location }} replace />;	
}
