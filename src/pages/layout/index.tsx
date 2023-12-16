import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import FooterPage from '../../components/footer';
import HeaderPage from '../../components/header';
import './index.scss';

const LayoutPage = () => {
	const { Content } = Layout;
	return (
		<Layout className='layout-wrap'>
			<HeaderPage />
			<Content className='content-wrap'>
				<Outlet />
			</Content>
			<FooterPage/>
		</Layout>
	)
}

export default LayoutPage;
