import React, { useEffect, useState } from 'react'
import "./Event.css"
import { useParams } from 'react-router-dom';
import Watchmore from '../../components/Watchmore/watchmore';
import axios from "axios";
import {
  FacebookOutlined, HeartOutlined, ClockCircleOutlined,
  CaretDownOutlined, CopyrightOutlined
} from '@ant-design/icons'
const data = [
  {
    key: '1',
    name: 'VIP PLATINUM STANDING',
    price: "4,200,000 VND",
  },
  {
    key: '2',
    name: 'VIP GOLD STANDING',
    price: '3,700,000 VND',
    label: "ONLINE BOOKING CLOSED",
  },
  {
    key: '3',
    name: 'CAT 1',
    price: '2,800,000 VND',
  },
  {
    key: '4',
    name: 'CAT 2',
    price: '2,400,000 VND',
  },
  {
    key: '5',
    name: 'CAT 3',
    price: '1,800,000 VND',
  },
  {
    key: '6',
    name: 'CAT 4',
    price: '1,400,000 VND',
  },
];

const Event = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3001/event');
        console.log('res:', response)
        // setProduct(response.data);
        return response;
      } catch (error) {
        console.log("Lỗi:", error.response.data.message);
      }
    }
    getProduct();
  }, [id])
  return (
    <div className='event-detail-container'>
      <div className='nav-pic'>
        {product.image}
      </div>
      <div className='ticket'>
        <div className='calendar'>
          <div className='month'>Octorber</div>
          <div className='date'>21</div>
          <div className='day'>Saturday</div>
        </div>
        <div className='info-ticket'>
          <div className='title-ticket'>
            <h1>2023-2024 BamBam THE 1ST WORLD TOUR
              [AREA 52] in HO CHI MINH</h1>
          </div>
          <div className='tiket-day'>
            <p>Saturday, 21 October 2023
              (07:00 PM - Until late)</p>
          </div>
          <div className='ticket-address'>
            <p className='tk1'><ClockCircleOutlined />Nguyen Du Gymnasium</p>
            <p className='tk2'>
              <CaretDownOutlined />
              116 Nguyen Du, Ben Thanh Ward, District 1, HCMC
            </p>
          </div>
        </div>
        <div className='book-now'>
          <a style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className='label-book'>Book now</span>
            <div className='text'>
              <span className='label-1'><FacebookOutlined />Share to facebook</span>
              <span className='label-2'>
                <HeartOutlined /> Follow
              </span>
            </div>
            <span className='label-3'>-- followers</span>
          </a>
        </div>
      </div>
      <div className='select'>
        <div className='list-info-ticket'>
          <h3 className='title'>TICKET INFORMATION</h3>
          {
            data.map((item) => {
              return (
                <div className='info' key={item.key}>
                  <p className='word-p'>{item.name}</p>
                  <strong className='price'>{item.price}</strong>
                </div>
              )
            })
          }
        </div>
        <div className='contain-all'>
          <div className='mini-word'>
            <h2 className='word'>2023-2024 BamBam THE 1ST WORLD TOUR [AREA 52] In HO CHI MINH</h2>
          </div>
          <div className='info-t'>
            <div className='time'>
              <ClockCircleOutlined />
              <span className='time-line'>
                07:00 PM - Until late
              </span>
            </div>
            <div className='address'>
              <CaretDownOutlined />
              <p className='street'>
                Nguyen Du Gymnasium<br />
                116 Nguyen Du, Ben Thanh Ward, District 1, HCMC
              </p>
            </div>
          </div>
          <div className='price'>
            <CopyrightOutlined />
            <span className='price-s'>From <strong>1,400,000 VND</strong></span>
          </div>
          <div className='book-nows'>
            <a style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className='label-book'>Book now</span>
              <div className='text'>
                <span className='label-1'><FacebookOutlined />Share to facebook</span>
                <span className='label-2'>
                  <HeartOutlined /> Follow
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <Watchmore />
    </div>
  )
}

export default Event