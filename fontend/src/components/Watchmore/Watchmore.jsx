import React, { useState } from 'react';
import { products } from '../Products/Products';
import { ContainerOutlined } from '@ant-design/icons';
import './Watchmore.css';
function Watchmore() {
    const [noElement, setnoElement] = useState(3);
    const slice = products.slice(0, noElement);
    const loadMore = () => {
        setnoElement(noElement + noElement);
    }
    return (
        <div className='container-list'>
            <span style={{ color: '#2A2D34', fontWeight: 'bold' }}>
                <ContainerOutlined style={{ color: 'green' }} />
                Recommended for you
            </span>
            <div className='list'>
                {slice.map((item) => {
                    return (
                        <div className='col-lg-4 control-list ' key={item.id}>
                            <img
                                className="product-image "
                                src={item.image}
                                alt={item.name}
                            />
                            <div className="product-details list-container ">
                                <h3 className="product-name">{item.name}</h3>
                                <p className="product-date">{item.date}</p>
                                <p className="product-category">{item.category}</p>
                            </div>
                        </div>
                    )
                })}
                <button className='btnn'
                    onClick={() => loadMore()}>
                    See more
                </button>
            </div>
        </div>
    )
}

export default Watchmore;
