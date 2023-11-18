import React, { useEffect, useState } from 'react';
import { ContainerOutlined } from '@ant-design/icons';
import './Watchmore.css';
import axios from 'axios';
function Watchmore() {
    const [data, setData] = useState([])
    const [visibleItems, setVisibleItems] = useState(3);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get('http://localhost:3001/event/getList/');
                console.log('dd:', res);
                const catchData = res.data.events.docs;
                setData(catchData);
            } catch (error) {
                console.log("Lỗi:", error.response);
            }
        }
        fetchdata();
    }, [])
    const handleSeeMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
    };
    return (
        <div className='container-list'>
            <span style={{ color: '#2A2D34', fontWeight: 'bold' }}>
                <ContainerOutlined style={{ color: 'green' }} />
                Recommended for you
            </span>
            <div className='list'>
                {data.slice(0, visibleItems).map((item) => {
                    return (
                        <div className='col-lg-4 control-list ' key={item.id}>
                            <img
                                className="product-image "
                                src={item.image[0]}
                                alt={item.name}
                            />
                            <div className="product-details list-container ">
                                <h3 className="product-name">{item.nameE}</h3>
                                <p className="product-date">{item.time}</p>
                                <p className="product-category">{item.categories.name}</p>
                            </div>
                        </div>
                    )
                })}
                {visibleItems < data.length && (
                    <button className='btnn' onClick={handleSeeMore}>
                        See more
                    </button>
                )}
            </div>
        </div>
    )
}

export default Watchmore;