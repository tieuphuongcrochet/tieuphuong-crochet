import React, { useEffect } from 'react';
import { FloatButton, Layout } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FooterPage from '../../components/footer';
import HeaderPage from '../../components/header';
import './index.scss';
import { ROLES, ROUTE_PATH } from 'utils';
import HeaderHomePage from './components/HeaderHomePage';
import BreadCrumbs from 'components/BreadCrumb';
import { useAppSelector } from 'app/hooks';

const LayoutPage = () => {
	const { Content } = Layout;
	const location = useLocation();
	const currentUser = useAppSelector((state) => state.auth.currentUser);
	return (
		<>
			{currentUser?.role === ROLES.ADMIN ?
				<Navigate to={ROUTE_PATH.ADMIN} replace={true} />
				:
				<Layout className='layout-wrap'>
					<HeaderPage />
					{
						location?.pathname === ROUTE_PATH.HOME ?
							<HeaderHomePage /> :
							<BreadCrumbs pathname={location?.pathname} />
					}
					<Content className='content-wrap container'>
						<Outlet />
					</Content>
					<FooterPage />
					<FloatButton.BackTop visibilityHeight={0} />
				</Layout>
			}
		</>
	)
}

export default LayoutPage;
