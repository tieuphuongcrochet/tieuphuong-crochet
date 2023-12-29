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
	const { pathname } = useLocation();

	return (
		<Layout className='layout-wrap'>
			<HeaderPage />
			{
				pathname === ROUTE_PATH.HOME ?
					<HeaderHomePage /> :
					<BreadCrumbs pathname={pathname} />
			}
			<Content className='content-wrap container'>
				<Outlet />
			</Content>
			<FooterPage />
		</Layout>
	)
}

export default LayoutPage;
