import 'antd/dist/antd.css';
import {
    UserOutlined,
    TeamOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import './styles.css';

const { Header, Sider, Content } = Layout;

export function loader() {

}

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            key: '1',
            href: '/user',
            icon: <UserOutlined />,
            label: 'User',
        },
        {
            key: '2',
            href: '/team',
            icon: <TeamOutlined />,
            label: 'Team',
        },
    ];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    {menuItems.map((menu, index) => (
                        <Menu.Item key={menu.key} icon={menu.icon}>
                            <Link to={menu.href}>{menu.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 500,
                    }}
                >
                    <br></br>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
