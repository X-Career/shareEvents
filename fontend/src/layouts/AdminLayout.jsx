import { React, useState } from 'react'
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom'
import logo from "../../src/assets/images/logo.png"
import "./AdminLayout.css";
// import logo from "../components/Header/download.png";
import { useSelector } from 'react-redux'
// import AppHeader from '../components/Header/Header'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DashboardOutlined,
    ClusterOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Image } from 'antd';
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <Link to="/"><Image width={40} src={logo}/></Link>
                </div>    

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/admin']}
                    onClick={(item) => {navigate(item.key)}}

                    items = {[
                        {
                            key: '/admin',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: '/admin/manage-users',
                            icon: <UserOutlined />,
                            label: 'User Management',
                        },
                        {
                            key: '/admin/manage-events',
                            icon: <VideoCameraOutlined />,
                            label: 'Event Management',
                        },
                        {
                            key: '/admin/manage-seats',
                            icon: <ClusterOutlined />,
                            label: 'Seat Management',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout