import React from 'react';
import "./NavBar.css"
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

// const { Sider } = Layout;

const items = [
  
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'First Item',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'Second Item',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'Third Item',
  },
  {
    key: '4',
    icon: <BarChartOutlined />,
    label: 'Fourth Item',
  },
  {
    key: '5',
    icon: <CloudOutlined />,
    label: 'Fifth Item',
  },
  {
    key: '6',
    icon: <AppstoreOutlined />,
    label: 'Sixth Item',
  },
  {
    key: '7',
    icon: <TeamOutlined />,
    label: 'Seventh Item',
  },
  {
    key: '8',
    icon: <ShopOutlined />,
    label: 'Eighth Item',
  },
  {
    key: "divider1",
    divider: true,
  },
  {
    key: '9',
    label: 'About Us',
  },
  {
    key: 'divider2',
    divider: true,
  },
  {
    key: '10',
    label: 'For Organizer',
  },
  {
    key: 'divider3',
    divider: true,
  },
  {
    key: '11',
    icon: <ShopOutlined />,
    label: 'FAQ',
  },
  {
    key: 'divider4',
    divider: true,
  },
  {
    key: '12',
    icon: <ShopOutlined />,
    label: 'Operational regulations',
  },
  {
    key: 'divider5',
    divider: true,
  },
  {
    key: '13',
    icon: <ShopOutlined />,
    label: 'Information privacy policy',
  },
  {
    key: 'divider6',
    divider: true,
  },
  {
    key: '14',
    icon: <ShopOutlined />,
    label: 'Payment privacy policy',
  },
  {
    key: 'divider7',
    divider: true,
  },
  {
    key: '15',
    icon: <ShopOutlined />,
    label: 'Shipping and Delivery conditions',
  },
];

const NavBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <div className="navBar">
        <Menu className='Menu' mode="inline" defaultSelectedKeys={['4']}>
          {items.map(item =>
            item.divider ? (
              <Menu.Divider key={item.key} />
            ) : (
              <Menu.Item key={item.key}>
                {item.icon && item.icon}
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
        </div>
        </>
  );
};

export default NavBar;




