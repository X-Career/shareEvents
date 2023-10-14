import React from 'react'
import './Infoticket.css'

import {
    ClockCircleOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
function Infoticket() {
    return (
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
    )
}

export default Infoticket
