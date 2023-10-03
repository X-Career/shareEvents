import React from 'react';
import logo from "./download.png";
import "./Header.css";
import { Layout, Menu, Input, Button, Dropdown } from 'antd';
import { UserOutlined, SearchOutlined, GlobalOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"

const { Header: AntdHeader } = Layout;

const UserMenu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const LanguageMenu = (
  <Menu>
    <Menu.Item key="en" itemID='Eng'>English</Menu.Item>
    <Menu.Item key="vn" itemID='VN'>VietNam</Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <AntdHeader className="header">
      <div className="left-section">
        <div className="logo">
          <Link to="/"><img src={logo} alt="Logo" /></Link>
        </div>
        <div className="search">
          <Input.Search placeholder="Search" enterButton={<SearchOutlined />} />
        </div>
      </div>
      <div className="center-section">
        <div className="title">
          <Link to="/"><span>X-Carrer-Events</span></Link>
        </div>
      </div>
      <div className="right-section">
        <div className="createEvent">
          <Button>Create Event</Button>
        </div>
        <div className="menu">
          <Link to="/login"><Button type="text">Log In</Button></Link>
          <Link to="/register"><Button type="text">Sign Up</Button></Link>
        </div>
        <div className="user">
          <Dropdown overlay={UserMenu} trigger={['click']}>
            <Button shape="circle" icon={<UserOutlined />} />
          </Dropdown>
        </div>
        <div className="language">
          <Dropdown
            overlay={LanguageMenu}
            trigger={['click']}
            overlayClassName="language-dropdown"
          >
            <Button shape="circle" icon={<GlobalOutlined />} />
          </Dropdown>
        </div>
      </div>
    </AntdHeader>
  );
};

export default Header;