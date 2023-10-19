import React from 'react'
import './RightPage.css'
import {
    ClockCircleOutlined,
    CaretDownOutlined,
    CopyrightOutlined,
    FacebookOutlined,
    HeartOutlined
} from '@ant-design/icons';
import { Divider } from 'antd';
function RightPage() {
    return (
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
    )
}

export default RightPage
