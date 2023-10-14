import React from "react";
import "./Contents.css";
import { Link } from "react-router-dom";
import Slide from "../Slide/Slide";
import { products } from "../Products/Products";
import pictureLeft from "..//..//Slide/heading-img-1-left.jpg";
import pictureRight from "..//..//Slide/heading-img-1-mobile.jpg";

const Contents = () => {
  return (
    <>
      <Slide />
      <div className="list-container">
        <div className="title-featured">
          <img className="picture-left" src={pictureLeft} alt="" />
          <h1>Featured events</h1>

          <img className="picture-right" src={pictureRight} alt="" />
        </div>

        <div className="product-list">
          {products.map((product) => (
            <div className="product-item" key={product.id}>
              <Link to={`/event/${product.id}`} className="event-details">
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-date">{product.date}</p>
                  <p className="product-category">{product.category}</p>
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
