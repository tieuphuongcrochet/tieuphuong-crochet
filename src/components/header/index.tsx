import { find } from 'lodash';
import React, { memo, useContext, useState } from 'react';
import { Button, Dropdown, Menu, MenuProps, Space, Layout, Drawer, Image } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CaretDownOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

import { Context } from 'components/LanguageProvider';
import logo from 'assets/logo.png';
import { LANGUAGES_LIST, MENU_NAV, ROUTE_PATH } from 'utils/constant';

import './index.scss';

type MenuType = 'vertical' | 'horizontal' | 'inline';

interface HeaderProps {
	currentNav: string;
	setCurrentNav: (value: string) => void;
}

const HeaderPage = ({ setCurrentNav, currentNav }: HeaderProps) => {
	const [isOpenLang, setIsOpenLang] = useState(false);
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	
	const { Header } = Layout;
	const context = useContext(Context);

	const onClickNav = (e: any) => {
		setCurrentNav(e.key);
		isOpenSidebar && setIsOpenSidebar(false);
	};
	
	const onHome = () => {
		setCurrentNav(ROUTE_PATH.HOME);
	}

	const onSelectLanguage: MenuProps['onClick'] = (e) => {
		context.setLocale(e.key);
	};

	const getLabel = (key: string) => {
		const item = find(LANGUAGES_LIST, l => key === l?.key);
		return item?.label || context.locale;
	}

	const onOpenChange = (open: boolean) => {
		setIsOpenLang(open);
	};

	const getMenu = (mode: MenuType) => (
		<div className='header-sidebar'>
			<Menu
				mode={mode}
				onClick={onClickNav}
				selectedKeys={[currentNav]}
				items={MENU_NAV.map((item) => {
					return {
						key: item.path,
						label: (
							<NavLink to={item.path} rel="noreferrer">
								<FormattedMessage id={item.name} defaultMessage={item.name} />
							</NavLink>
						),
					};
				})} />
		</div>
	);

	return (
		<>
			<Header className='header-wrap'>
				<div className='header-user'>
					<div className='sidebar-menu-icon'>
						<MenuOutlined onClick={() => setIsOpenSidebar(true)} style={{ fontSize: 20 }} />
					</div>
					<div className='header-logo'>
						<Link to={ROUTE_PATH.HOME} onClick={onHome}>
							<img src={logo} alt='Tiệm len Tiểu Phương' />
						</Link>
					</div>
					<div className='header-right'>
						{/* <Tooltip title="search">
        <Button className='btn-search'
            onClick={onClickSearch}
            icon={<SearchOutlined />} />
    </Tooltip> */}
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
				{getMenu('horizontal')}

			</Header>
			<Drawer
				width={340}
				className='drawer-menu'
				placement='left'
				open={isOpenSidebar}
				onClose={() => setIsOpenSidebar(false)}
				extra={
					<Link
						onClick={() => { isOpenSidebar && setIsOpenSidebar(false) }}
						to={`${ROUTE_PATH.HOME}`} className='drawer-menu-header__logo'
					>
						<Image preview={false} width={50} src={logo} alt='Tiểu Phương crochet' />
						<span className='logo-text'>Tiểu Phương crochet</span>
					</Link>
				}
			>
				{getMenu('inline')}
			</Drawer>
		</>
	)
}

export default memo(HeaderPage);
