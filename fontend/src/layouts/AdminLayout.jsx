import { React, useState } from 'react'
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import logo from "../../src/assets/images/logo.png"
import "./AdminLayout.css";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    DashboardOutlined,
    ClusterOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Image, Row, Col, Avatar, Input } from 'antd';
// import Search from 'antd/es/input/Search';
const { Header, Sider, Content } = Layout;
const { Search } = Input;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    // const userFullName = useSelector((state) => state.fullName);
    // const userAvatar = useSelector((state) => state.image);
    const user = useSelector((state) => state.dataUser);

    // console.log(user);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">
                    <Link to="/"><Image width={40} src={logo} /></Link>
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['/admin']}
                    onClick={(item) => { navigate(item.key) }}

                    items={[
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
                    <Row>
                        <Col md={6}>
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

                        </Col>
                        <Col md={12}>
                            <Search placeholder="input search text" onSearch={onSearch} enterButton />
                        </Col>
                        <Col md={6}>
                            <div>
                                {(!user.image) ? <Avatar size="large" icon={<UserOutlined />} /> : <Avatar size="large" src={user.image} />
                                }
                                <span className='nameUser'>{user.fullName}</span>
                            </div>
                        </Col>
                    </Row>
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