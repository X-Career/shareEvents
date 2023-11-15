import React from 'react'
import "./Booking.css"
import BookingState from './BookingState/BookingState'

const Booking = () => {
  return (
    <div className='booking-page'>
        <div className="title-box">
            <div className="event-name"><h1>Event Name</h1></div>
            <div className="event-location"><span>address</span></div>
            <div className="event-timing">Saturday 22-11-2022</div>
        </div>
        <BookingState/>
    </div>
  )
}

export default Booking
