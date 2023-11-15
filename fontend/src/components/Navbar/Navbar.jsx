import React from "react";
import "./Navbar.css";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";

// const { Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Live music",
    to: "/events/_id",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Theater-Art Culture",
    to: "/events/_id",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Nightlife",
    to: "/events/_id",
  },
  {
    key: "4",
    icon: <BarChartOutlined />,
    label: "Community",
    to: "/events/_id",
  },
  {
    key: "5",
    icon: <CloudOutlined />,
    label: "Course",
    to: "/events/_id",
  },
  {
    key: "6",
    icon: <AppstoreOutlined />,
    label: "Attractions",
    to: "/events/_id",
  },
  {
    key: "7",
    icon: <TeamOutlined />,
    label: "Sport",
    to: "/events/_id",
  },
  {
    key: "divider1",
    divider: true,
  },
  {
    key: "9",
    label: "About Us",
  },
  {
    key: "divider2",
    divider: true,
  },
  {
    key: "10",
    label: "For Organizer",
  },
  {
    key: "divider3",
    divider: true,
  },
  {
    key: "11",
    icon: <ShopOutlined />,
    label: "FAQ",
  },
  {
    key: "divider4",
    divider: true,
  },
  {
    key: "12",
    icon: <ShopOutlined />,
    label: "Operational regulations",
  },
  {
    key: "divider5",
    divider: true,
  },
  {
    key: "13",
    icon: <ShopOutlined />,
    label: "Information privacy policy",
  },
  {
    key: "divider6",
    divider: true,
  },
  {
    key: "14",
    icon: <ShopOutlined />,
    label: "Payment privacy policy",
  },
  {
    key: "divider7",
    divider: true,
  },
  {
    key: "15",
    icon: <ShopOutlined />,
    label: "Shipping and Delivery conditions",
  },
];

const NavBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div className="navBar">
        <Menu className="Menu" mode="inline">
          {items.map((item) =>
            item.divider ? (
              <Menu.Divider key={item.key} />
            ) : (
              <Menu.Item key={item.key}>
                {item.icon && item.icon}
                {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </div>
    </>
  );
};

export default NavBar;
