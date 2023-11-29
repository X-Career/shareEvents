import React from "react";
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";
import "./Header.css";
import { Layout, Menu, Input, Button, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/users/logoutAction";

const { Header: AntdHeader } = Layout;

const Header = () => {
  const dataUser = useSelector((state) => state.dataUser);
  const loggedIn = useSelector((state) => state.loggedIn);
  const userName = useSelector((state) => state.userName);
  const userAvatar = useSelector((state) => state.image);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    console.log(handleLogout);
  };

  // console.log(dataUser._id)


  const UserMenu = (
    <Menu>
      {/* <Menu.Item>{userName}</Menu.Item>  */}
      <Menu.Item key="profile">
      <Link to="/admin/manage-events">Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const LanguageMenu = (
    <Menu>
      <Menu.Item key="en" itemID="Eng">
        English
      </Menu.Item>
      <Menu.Item key="vn" itemID="VN">
        VietNam
      </Menu.Item>
    </Menu>
  );
  const userImg = loggedIn ? <Avatar src= { userAvatar } />  : <UserOutlined/>


  return (
    <AntdHeader className="header">
      <div className="left-section">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="search">
          <Input.Search placeholder="Search" enterButton={<SearchOutlined />} />
        </div>
      </div>
      <div className="center-section">
        <div className="title">
          <Link to="/">
            <span>X-Carrer-Events</span>
          </Link>
        </div>
      </div>
      <div className="right-section">
        <div className="createEvent">
          <Link to="/createAnEvent"><Button>Create Event</Button></Link>
          
        </div>
        {loggedIn ? (
          <div className="menu">
            <span>{userName}</span>
          </div>
        ) : (
          <div className="menu">
            <Link to="/login">
              <Button type="text">Log In</Button>
            </Link>
            <Link to="/register">
              <Button type="text">Sign Up</Button>
            </Link>
          </div>
        )}
        <div className="user">
        
          <Dropdown overlay={UserMenu} trigger={["click"]}>
            <Button shape="circle" icon={userImg} /> 
          </Dropdown>
        </div>
        <div className="language">
          <Dropdown
            overlay={LanguageMenu}
            trigger={["click"]}
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

