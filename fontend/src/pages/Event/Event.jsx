import React, { useEffect, useState } from 'react'
import "./Event.css"
import { useParams,Link } from 'react-router-dom';
import Watchmore from '../../components/Watchmore/Watchmore';
import axios from "axios";
import Comments from '../../components/Comments/Comments';
import {
  FacebookOutlined, HeartOutlined, ClockCircleOutlined,
  CaretDownOutlined, CopyrightOutlined
} from '@ant-design/icons'
const Event = () => {
  const{_id} = useParams();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState([]);
  const [time, setTime] = useState([]);
  const [location, setLocation] = useState([]);
  const [price, setPrice] = useState([]);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/event/${_id}`);
        console.log('res:', response)
        setProduct(response.data.event);
        console.log('setProduct',response.data.event.docs)
        // setImage(response.data.events.docs[0].image);
        // setTime(response.data.events.docs[0].time)
        // setLocation(response.data.events.docs[0].location)
        // setPrice(response.data.events.docs[0].price)
        // setInfo(response.data.events.docs[0].information)
        return response;
      } catch (error) {
        console.log("Lỗi:", error.response);
      }

    }
    getProduct();
  }, [])
  return (
    <div className='event-detail-container'>
      <div className='nav-pic' style={{ backgroundImage: `url(${product.image})` }} >
      </div>
      <div className='ticket'>
        <div className='calendar'>
          <div className='month'>Octorber</div>
          <div className='date'>21</div>
          <div className='day'>Saturday</div>
        </div>
        <div className='info-ticket'>
          <div className='title-ticket'>
            <h1>{product.nameE}</h1>
          </div>
          <div className='tiket-day'>
            <p>{product.time}</p>
          </div>
          <div className='ticket-address'>
            <p className='tk1'><ClockCircleOutlined />{product.location}</p>
          </div>
        </div>
        <div className='book-now'>
          <a style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link className='label-book' to={("/event/:id/booking")}><span>Book now</span></Link>
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
        <div className='about-all'>
          <div className='about'>ABOUT</div>
          <div className='infomation'><p className='p-word'>{product.information}</p></div>
        </div>
        <div className='contain-all'>
          <div className='mini-word'>
            <h2 className='word'>{product.nameE}</h2>
          </div>
          <div className='info-t'>
            <div className='time'>
              <ClockCircleOutlined />
              <span className='time-line'>
                {product.time}
              </span>
            </div>
            <div className='address'>
              <CaretDownOutlined />
              <p className='street'>
                {product.location}
              </p>
            </div>
          </div>
          <div className='price'>
            <CopyrightOutlined />
            <span className='price-s'>From <strong>1,400,000 VND</strong></span>
          </div>
          <div className='book-nows'>
            <a style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link className='label-book' to={("/event/:id/booking")}><span className='label-book'>Book now</span></Link>
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
      <div className='select'>
        <div className='list-info-ticket'>
          <h3 className='title2'>TICKET INFORMATION</h3>
          {
            product.price.map((item) => {
              return (
                <div className='info' key={item.key}>
                  <p className='word-p'>{item.name}</p>
                  <strong className='price'>{item.price}</strong>
                </div>
              )
            })
          }
        </div>
      </div>
      <Comments/>
      <Watchmore />
    </div>
  )
}

export default Event