import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import "./DropDownMenu.css"
import { products } from '../Products/Products';
function DropDownMenu() {
    const [data, setData] = useState(products)
    console.log(data)
    const FilterResult = (catItem) => {
        const result = products.filter((curData) => {
            return curData.category === catItem
        })
        setData(result)
        console.log('res', result)
    }
    return (
        <div className='Drop-down'>
            <div class="dropdown">
                <div class="dropdown-options">
                    <button className='button-13'>Profile</button>
                    <button className='button-13' onClick={() => FilterResult('Live music')}>Live music</button>
                    <button className='button-13' onClick={() => FilterResult('Art & Culture')}>Art & Culture</button>
                    <button className='button-13' onClick={() => FilterResult('Nightlife')}>Nightlife</button>
                    <button className='button-13' onClick={() => FilterResult('Community')}>Community</button>
                    <button className='button-13' onClick={() => FilterResult('Course')}>Course</button>
                    <button className='button-13' onClick={() => FilterResult('Attraction')}>Attraction</button>
                    <button className='button-13' onClick={() => FilterResult('Sport')}>Sport</button>
                </div>
            </div>
            <div className='list'>
                {data.map((item) => {
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
            </div>
        </div>
    )
}

export default DropDownMenu
