import React, { useEffect, useState } from 'react';
import { Button, Menu, Tooltip } from 'antd';
import { Layout } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { MENU_NAV, ROUTE_PATH } from '../../utils/constant';
import './index.scss';

const HeaderPage = (props) => {
	const [currentNav, setCurrentNav] = useState(ROUTE_PATH.HOME);

	const { Header } = Layout;
	const location = useLocation();
	const { pathname } = location;
	useEffect(() => {
		setCurrentNav(pathname);

	}, [pathname]);

	const onClickNav = (e) => {
		console.log('click ', e);
		setCurrentNav(e.key);
	};

	const onClickSearch = (e) => {
		console.log('onClickSearch ', e);
	}

	const onHome = () => {
		setCurrentNav(ROUTE_PATH.APP);
	}

	return (
		<Header className='header-wrap'>
			<div className='header-user'>
				<div className='header-social'></div>
				<div className='header-logo'>
					<Link to={ROUTE_PATH.HOME} onClick={onHome}>
						<img src={logo} alt='Tiệm len Tiểu Phương' />
					</Link>
				</div>
				<div className='header-right'>
					<Tooltip title="search">
						<Button className='btn-search'
							onClick={onClickSearch}
							icon={<SearchOutlined />} />
					</Tooltip>
					<span className='bulkhead'>&nbsp;</span>
					<Button shape='circle' icon={<UserOutlined />} />
				</div>
			</div>

			{/* sidebar */}
			<div className='header-sidebar'>
				<Menu
					mode="horizontal"
					onClick={onClickNav}
					selectedKeys={[currentNav]}
					items={MENU_NAV.map((item) => {
						return {
							key: item.path,
							label: (
								<NavLink to={item.path} rel="noreferrer" >
									{item.name}
								</NavLink>
							),
						};
					})}
				/>
			</div>
		</Header>
	)
}

export default HeaderPage;
