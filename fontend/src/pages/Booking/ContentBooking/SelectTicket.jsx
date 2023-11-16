import React, { useEffect, useState } from "react";
import "./SelectTicket.css";

const SelectTicket = () => {
  const [isCheck, setIsCheck] = useState(false);
  const [circleInfo, setCircleInfo] = useState(null);
  const [ticketClick, setTicketClick] = useState([])
  const handleMouseEnter = (stage) => {
    setCircleInfo(stage);
  };


  const handleMouseLeave = () => {
    setCircleInfo(null);
  };
  const handleClick = () => {
    setTicketClick([...ticketClick,circleInfo]);
  }
  useEffect(() => {
    console.log(ticketClick);
  }, [ticketClick]);
  


  const handleCheck = () => {
    setIsCheck(!isCheck);
    console.log(isCheck);
  };
  const fakeSeat = [
    {
      type: "Standard",
      price: 205,
    },
    {
      type: "Standard",
      price: 206,
    },
    {
      type: "Vip",
      price: 350,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "VVip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
    {
      type: "V-Vip",
      price: 500,
    },
  ];
  return (
    <div className="bookingPage">
      <div className="bookingComponent">
        <div className="seatState">
          <span className="info-seatState">Vui lòng chọn ghế bên dưới</span>
          <div className="circle">
            <div className="availabel">
              <div className="circle-available"></div>
              <span>Ghế trống</span>
            </div>
            <div className="choosing">
              <div className="circle-choosing"></div>
              <span>Ghế đang chọn</span>
            </div>
            <div className="unavailabel">
              <div className="circle-unavailable"></div>
              <span>Ghế đã có người chọn chọn</span>
            </div>
          </div>
        </div>
        <div className="seatArea">
          <div className="standart-area">
            <span>Standart</span>
            <div className="color-standart-area"></div>
          </div>
          <div className="vip-area">
            <span>Vip</span>
            <div className="color-standart-vip"></div>
          </div>
          <div className="vvip-area">
            <span>V.Vip</span>
            <div className="color-standart-vvip"></div>
          </div>
        </div>
        <div className="seatMap">
          <span className="title-seatMap">Stage/Sân khấu</span>
          {/* <div className="seatMapComponent"> */}
            <div className="seatMapComponent-VVip">
              {fakeSeat
                .filter((stage) => stage.type === "V-Vip")
                .map((stage,index) => (
                  <div
                    className={`model-${stage.type}`}
                    // key= {`${stage.type}-${stage.price}-${index}`}
                    key = {index}
                    onMouseEnter={() => handleMouseEnter(stage)}
                    onMouseLeave={handleMouseLeave}
                    onClick = {handleClick}
                  >
                    <div className="numberSeat">
                      {stage.index}
                      {circleInfo && (
                        <div className="circle-info">
                          <span>{stage.price} VND</span>
                          <span>{stage.type}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="seatMapComponent-Vip">
              {fakeSeat
                .filter((stage) => stage.type === "Vip")
                .map((stage,index) => (
                  <div
                    className={`model-${stage.type}`}
                    // key={`${stage.type}-${stage.price}-${index}`}
                    key= {index}
                    onMouseEnter={() => handleMouseEnter(stage)}
                    onMouseLeave={handleMouseLeave}
                    onClick = {handleClick}

                  >
                    <div className="numberSeat">
                      {stage.index}
                      {circleInfo && (
                        <div className="circle-info">
                          <span>{stage.price}</span>
                          <span>{stage.type}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="seatMapComponent-Standard">
              {fakeSeat
                .filter((stage) => stage.type === "Standard")
                .map((stage,index) => (
                  <div
                    className={`model-${stage.type}`}
                    // key={`${stage.type}-${stage.price}-${index}`}
                    key= {index}
                    onMouseEnter={() => handleMouseEnter(stage)}
                    onMouseLeave={handleMouseLeave}
                    onClick = {handleClick}

                  >
                    <div className="numberSeat">
                      {stage.index}
                      {circleInfo && (
                        <div className="circle-info">
                          <span>{stage.price}</span>
                          <span>{stage.type}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          {/* </div> */}
        </div>
      </div>
      <div className="info-payment">
        <span className="infoTicket">Thông tin đặt vé</span>
        <hr />
        {ticketClick && (
          ticketClick.map((ticket,index) =>(
          <div className="ticketInfo" key={index}>
            <span>{ticket.type}</span>
            <span>{ticket.price}</span>
          </div>
        ))
        )}
        <span className="picketTicket">Vui lòng chọn vé</span>
        <div className="total-price">
          <span>Tổng cộng</span>
          <span>0 VND</span>
        </div>
        <div className="nextBtn">
          <button>Tiếp tục</button>
        </div>
      </div>
    </div>
  );
};

export default SelectTicket;
