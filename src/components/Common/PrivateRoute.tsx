import { Navigate, RouteProps } from 'react-router-dom';
import { ROUTE_PATH } from '../../utils/constant';
import Admin from '../../pages/Admin';

export const PrivateRoute = (props: RouteProps) => {
	//Check if user is logged in
	//If yes, show route
	//Otherwise, redirect to login page
	console.log('private route');
	const isLoggedIn = Boolean(localStorage.getItem('access_token'));
	if (!isLoggedIn) return <Navigate to={ROUTE_PATH.LOGIN} replace={true} />;

	return <Admin {...props} />
}
