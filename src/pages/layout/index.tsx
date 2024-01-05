import React from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import FooterPage from '../../components/footer';
import HeaderPage from '../../components/header';
import './index.scss';
import { ROUTE_PATH } from 'utils';
import HeaderHomePage from './components/HeaderHomePage';
import BreadCrumbs from 'components/BreadCrumb';

const LayoutPage = () => {
	const { Content } = Layout;
	const location = useLocation();
	console.log('location', location);

	return (
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
		</Layout>
	)
}

export default LayoutPage;
