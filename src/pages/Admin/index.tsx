import { Link, useNavigate, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
import { Button, Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { find, map } from 'lodash';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ReadOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    AppstoreOutlined,
    FileOutlined,
    UnorderedListOutlined,
    SettingOutlined
} from '@ant-design/icons';

import { ROUTE_PATH } from 'utils';
import logo from 'assets/logo.png';
import './style.scss';

const items = [
    {
        key: ROUTE_PATH.ADMIN,
        icon: <AppstoreOutlined />,
        label: 'Dashboard'
    },
    {
        key: ROUTE_PATH.ADMIN_CATEGORY,
        icon: <UnorderedListOutlined />,
        label: 'Categories',
    }, {
        key: 'patterns',
        icon: <ReadOutlined />,
        label: 'Patterns',

        children: [
            {
                key: `${ROUTE_PATH.ADMIN_PATTERNS}/${ROUTE_PATH.CREATE}`,
                label: 'Add pattern'
            },
            {
                key: ROUTE_PATH.ADMIN_PATTERNS,
                label: 'Patterns list'
            }
        ]
    },

    {
        key: 'products',
        icon: <ShoppingCartOutlined />,
        label: 'Products',
        children: [
            {
                key: `${ROUTE_PATH.AMIN_PRODUCTS}/${ROUTE_PATH.CREATE}`,
                label: 'Add product'
            },
            {
                key: ROUTE_PATH.AMIN_PRODUCTS,
                label: 'Products list'
            }
        ]
    },
    {
        key: 'posts',
        icon: <FileOutlined />,
        label: 'Posts',
        children: [
            {
                key: `${ROUTE_PATH.ADMIN_POSTS}/${ROUTE_PATH.CREATE}`,
                label: 'Add post'
            },
            {
                key: ROUTE_PATH.ADMIN_POSTS,
                label: 'Posts list'
            }
        ]
    },
    {
        key: ROUTE_PATH.ADMIN_USERS,
        icon: <TeamOutlined />,
        label: 'Users',
    },
    {
        key: ROUTE_PATH.ADMIN_SETTING,
        icon: <SettingOutlined />,
        label: 'Setting',
    },
]

const LayoutAdmin = () => {
    const { Header, Sider, Content, Footer } = Layout;
    const [key, setKey] = useState(ROUTE_PATH.ADMIN);

    const [collapsed, setCollapsed] = useState(true);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const onSelectItem = ({ key }: any) => {
        setKey(key);
        navigate(key);
    };
    const getTitle = () => {
        let title;
        items.find(f => title = f.key === key ? f.label : find(f.children, c => c.key === key)?.label);
        return title;
    }

    return (
        <Layout className='admin-page'>
            <Header style={{ display: 'flex', alignItems: 'center', padding: 0, background: colorBgContainer, height: 76 }}>
                <div className="logo-sidebar" >
                    <Link to={ROUTE_PATH.HOME}>
                        <img src={logo} alt='Tiệm len Tiểu Phương' />
                    </Link>
                </div>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 40
                    }}
                />
                <span className='table-title'>{getTitle()}</span>
            </Header>

            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme='light'
                    className='siderbar-large-screen'
                    >

                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[ROUTE_PATH.ADMIN]}
                        onSelect={onSelectItem}
                        items={items}
                    />
                </Sider>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>

            </Layout>
            {/* <Footer className='siderbar-small-screen'>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[ROUTE_PATH.ADMIN]}
                    onSelect={onSelectItem}
                    items={items}
                />
            </Footer> */}
        </Layout>
    )
}

const Admin = () => {
    //Check if user is logged in
    //If yes, show route
    //Otherwise, redirect to login page
    const location = useLocation();
    const isLoggedIn = useAppSelector((state) => state.auth.isLogggedIn);

    if (isLoggedIn === undefined) {
        return null; // or a loading indicator, etc.
    }

    return isLoggedIn
        ? <LayoutAdmin />
        : <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location }} replace />;
}

export default Admin;