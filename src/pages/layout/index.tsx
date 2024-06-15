import React, { useEffect, useState } from 'react';
import { FloatButton, Layout } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import FooterPage from 'components/footer';
import HeaderPage from 'components/header';
import { ROLES, ROUTE_PATH, animationHeader, onScrollBody } from 'utils';
import Banner from './components/Banner';
import BreadCrumbs from 'components/BreadCrumb';
import { useAppSelector } from 'app/hooks';
import './index.scss';

const LayoutPage = () => {
	const { Content } = Layout;
	const location = useLocation();
	const [currentNav, setCurrentNav] = useState(ROUTE_PATH.HOME);

	useEffect(() => {
		const navs = location.pathname.split('/');
		setCurrentNav(`/${navs[1]}`);
		if(location.pathname !== ROUTE_PATH.HOME) {
			animationHeader();
		}

		if(navs.length <= 2) {
			window.scrollTo(0, 0);
		}
		else {
			onScrollBody('.content-wrap');
		}
	}, [location.pathname]);

	const currentUser = useAppSelector((state) => state.auth.currentUser);

	return (
		<>
			{currentUser?.role === ROLES.ADMIN ?
				<Navigate to={ROUTE_PATH.ADMIN} replace={true} />
				:
				<Layout className='layout-wrap'>
					<HeaderPage currentNav={currentNav} setCurrentNav={setCurrentNav} />
					{
						location?.pathname === ROUTE_PATH.HOME ?
							<Banner /> :
							<BreadCrumbs pathname={location?.pathname} />
					}
					<Content className='content-wrap container'>
						<Outlet />
					</Content>
					<FooterPage currentNav={currentNav} />
					<FloatButton.BackTop visibilityHeight={0} />
				</Layout>
			}
		</>
	)
}

export default LayoutPage;
