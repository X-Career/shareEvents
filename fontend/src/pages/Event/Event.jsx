import React, { useEffect, useState } from 'react'
import "./Event.css"
import { useParams } from 'react-router-dom';
import Calender from '../../components/Calender/Calender';
import Infoticket from '../../components/Infoticket/Infoticket';
import { products } from '../../components/Products/Products';
import Watchmore from '../../components/Watchmore/watchmore';
import RightPage from '../../components/Rightpage/RightPage';
import { FacebookOutlined, HeartOutlined } from '@ant-design/icons'
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
  const findProduct = (id) => {
    const res = products.filter(i => i.id == id)
    console.log('res', res);
    if (res.length > 0) {
      setProduct(res[[0]])
    }
  }
  useEffect(() => {
    console.log('id', id);
    findProduct(id)
  }, [id]);
  console.log('product', product)
  return (
    <div className='event-detail-container'>
      <div className='nav-pic'>
        {!product ?
          <h2>Not found product!</h2>
          :
          <h2>Name Product: <span>{product?.image}</span></h2>
        }
      </div>
      <div className='ticket'>
        <Calender />
        <Infoticket />
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
        <RightPage />
      </div>

      <Watchmore />
    </div>
  )
}

export default Event