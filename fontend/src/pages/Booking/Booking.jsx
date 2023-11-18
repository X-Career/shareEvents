import React from 'react'
import "./Booking.css"
import BookingState from './BookingState/BookingState'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from 'react';


const Booking = () => {
  const [eventById, setEventById] = useState({});

  const { _id } = useParams();
  useEffect(() => {
    const getEventById = async () => {
      try {
        const response = await axios.get(`https://beshareevents.onrender.com/event/${_id}`);
        console.log("res:", response.data);
        setEventById(response.data)
        console.log("setEvent", product);
      } catch (error) {
        console.log("Lỗi:", error.response);
      }
    };
    getEventById();
  }, [`http://beshareevents.onrender.com/event/${_id}`]);
  console.log(eventById)
  const product = eventById.event
  console.log(product)

  return (
    <div className='booking-page'>
       {product && (
        <div className="title-box">
            <div className="event-name"><h1>{product.nameE}</h1></div>
            <div className="event-location"><span>{product.location}</span></div>
            <div className="event-timing">{product.time}</div>
        </div>
           )}
        <BookingState/>
    </div>
  )
}

export default Booking
