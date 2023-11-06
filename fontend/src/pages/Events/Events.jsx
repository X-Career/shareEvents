import React, { useState, useEffect } from 'react'
import "./Events.css"
import { KeyOutlined } from '@ant-design/icons'
import { products } from '../../components/Products/Products'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import axios from "axios";
const Events = () => {
  
  return (
    <div className='categories-container'>
      <div className='background-imge'>
        <h1 className='dis'>Discover upcoming events</h1>
        <div className='div-input'>
          <input className='input' type='text' placeholder='Search for events, shows, courses...'></input>
          <KeyOutlined style={{ color: "#ccc", border: 0, borderRadius: "0 2px 2px 0!important", fontSize: "20px", paddingTop: "15px", position: 'relative', right: '40px' }} />
        </div>
      </div>

      <DropDownMenu/>
    </div>
  )
}

export default Events