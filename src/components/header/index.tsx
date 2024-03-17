import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Menu, MenuProps, Space, Tooltip, Layout } from 'antd';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { CaretDownOutlined } from '@ant-design/icons';

import { Context } from 'components/LanguageProvider';
import logo from 'assets/logo.png';
import { LANGUAGES_LIST, MENU_NAV, ROUTE_PATH } from 'utils/constant';

import './index.scss';
import { find } from 'lodash';

const HeaderPage = () => {
	const [currentNav, setCurrentNav] = useState(ROUTE_PATH.HOME);
	const [isOpenLang, setIsOpenLang] = useState(false);

	const { Header } = Layout;
	const location = useLocation();
	const context = useContext(Context);

	useEffect(() => {
		setCurrentNav(location?.pathname);
	}, []);

	const onClickNav = (e: any) => {
		console.log('click ', e);
		setCurrentNav(e.key);
	};

	const onClickSearch = (e: any) => {
		console.log('onClickSearch ', e);
	}

	const onHome = () => {
		setCurrentNav(ROUTE_PATH.HOME);
	}

	const onSelectLanguage: MenuProps['onClick'] = (e) => {
		console.log('click', e);
		context.setLocale(e.key);
	};

	const getLabel = (key: string) => {
		const item = find(LANGUAGES_LIST, l => key === l?.key);
		return item?.label || context.locale;
	}

	const onOpenChange = (open: boolean) => {
		console.log('open', open, 'isOpenLang', isOpenLang);
		setIsOpenLang(open);
	};

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
					<Dropdown
						trigger={['click']}
						menu={{
							items: LANGUAGES_LIST,
							onClick: onSelectLanguage
						}}
						onOpenChange={onOpenChange}
					>
						<Button type='text' className='btn-lang'>
							<Space>
								{getLabel(context.locale)}
								<CaretDownOutlined className={isOpenLang ? 'transition-transform rote-180' : 'transition-transform'} />
							</Space>
						</Button>
					</Dropdown>
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
									<FormattedMessage id={item.name} />
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
