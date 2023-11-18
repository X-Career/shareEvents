import React, { useEffect, useState } from "react";
import "./Contents.css";
import { Link } from "react-router-dom";
import Slide from "../Slide/Slide";
import { products } from "../Products/Products";
import pictureLeft from "..//..//Slide/heading-img-1-left.jpg";
import pictureRight from "..//..//Slide/heading-img-1-mobile.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";

const Contents = () => {
  const eventData = "https://beshareevents.onrender.com/event/getList/"
  const [responseEvent, setResponseEvent] = useState()
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get(eventData);
        const events = data.data.events.docs;
        console.log(events)
        setResponseEvent(events)
      } catch (error) {
        console.error(error.response)
      }
    }
    getData()
  }, [eventData])
  return (
    <>
      <Slide />
      <div className="list-container">
        <div className="title-featured">
          <img className="picture-left" src={pictureLeft} alt="" />
          <h1>Featured events</h1>

          <img className="picture-right" src={pictureRight} alt="" />
        </div>

        <div className="product-list" >
          {responseEvent?.map((product) => (
            <div className="product-item" key={product._id}>
              <Link to={`/event/${product._id}`} className="event-details">
                <img
                  className="product-image"
                  src={product.image[0]}
                  alt={product.name}
                />
                <div className="product-details">
                  <h3 className="product-name">{product.nameE}</h3>
                  <p className="product-date">{product.time}</p>
                  <p className="product-category">{product.categories.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contents;
