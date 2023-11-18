import React, { useEffect, useState } from "react";
import "./Event.css";
import { useParams, Link } from "react-router-dom";
import Watchmore from "../../components/Watchmore/Watchmore";
import axios from "axios";
import Comments from "../../components/Comments/Comments";
import {
  FacebookOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  CaretDownOutlined,
  CopyrightOutlined,
} from "@ant-design/icons";
const Event = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  // const [image, setImage] = useState([]);
  // const [time, setTime] = useState([]);
  // const [location, setLocation] = useState([]);
  // const [price, setPrice] = useState([]);
  // const [info, setInfo] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`https://beshareevents.onrender.com/event/${_id}`);
        console.log("res:", response.data);
        const eventDetail = response.data.event;
        console.log("event", eventDetail);
        setProduct(eventDetail);
        console.log("setProduct", product);
      } catch (error) {
        console.log("Lỗi:", error.response);
      }
    };
    getProduct();
  }, [`http://beshareevents.onrender.com/event/${_id}`]);
  console.log("product:", product);
  console.log("price", product.price);
  const dateDetail = product.time
  const splitTime = dateDetail?.split(",")[0].trim();
  console.log("time", splitTime)
  const calendars = dateDetail?.split(",")[1].trim().split(" ")
  console.log(calendars)
  const calendarEvents = calendars?.slice(0,1)
  const month = calendars?.slice(1,2)
  console.log(month)
  console.log(calendarEvents)


  

  return (
    <div className="event-detail-container">
      {product && product.image && product.image[0] && (
        <div
          className="nav-pic"
          style={{ backgroundImage: `url(${product.image[0]})` }}
        ></div>
      )}

      <div className="ticket">
        {calendarEvents?.map((calendar,index)=>(
        <div className="calendar" key={index}>
          <div className="month">{month}</div>
          <div className="date">{calendarEvents}</div>
          <div className="day">{splitTime}</div>
        </div>
        ))}
        <div className="info-ticket">
          <div className="title-ticket">
            <h1>{product.nameE}</h1>
          </div>
          <div className="tiket-address">
            <p>{product.location}</p>
          </div>
          <div className="ticket-day">
            <p className="tk1">
              <ClockCircleOutlined />
              {product.time}
            </p>
          </div>
        </div>
        <div className="book-now">
          <a
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link className="label-book" to={`/event/${product._id}/booking`}>
              <span>Book now</span>
            </Link>
            <div className="text">
              <span className="label-1">
                <FacebookOutlined />
                Share to facebook
              </span>
              <span className="label-2">
                <HeartOutlined /> Follow
              </span>
            </div>
            <span className="label-3">-- followers</span>
          </a>
        </div>
      </div>
      <div className="select">
        <div className="about-all">
          <div className="about">ABOUT</div>
          <div className="infomation">
            <p className="p-word">{product.information}</p>
          </div>
        </div>
        <div className="contain-all">
          <div className="mini-word">
            <h2 className="word">{product.nameE}</h2>
          </div>
          <div className="info-t">
            <div className="time">
              <ClockCircleOutlined />
              <span className="time-line">{product.time}</span>
            </div>
            <div className="address">
              <CaretDownOutlined />
              <p className="street">{product.location}</p>
            </div>
          </div>

          {product.price?.find(
            (priceEvent) => priceEvent.option === "standard"
          ) && (
            <div className="price">
              <CopyrightOutlined />
              <span className="price-s">
                From{" "}
                <strong>
                  {
                    product.price.find(
                      (priceEvent) => priceEvent.option === "standard"
                    ).price
                  }{" "}
                  VND
                </strong>
              </span>
            </div>
          )}
          <div className="book-nows">
            <a
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link className="label-book" to={`/event/${product._id}/booking`}>
                <span className="label-book">Book now</span>
              </Link>
              <div className="text">
                <span className="label-1">
                  <FacebookOutlined />
                  Share to facebook
                </span>
                <span className="label-2">
                  <HeartOutlined /> Follow
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="select">
        <div className="list-info-ticket">
          <h3 className="title2">TICKET INFORMATION</h3>
          {product.price?.map((item) => {
            return (
              <div className="info" key={item.key}>
                <p className="word-p">{item.name}</p>
                <strong className="price">{item.price}</strong>
              </div>
            );
          })}
        </div>
      </div>
      <Comments />
      <Watchmore />
    </div>
  );
};

export default Event;