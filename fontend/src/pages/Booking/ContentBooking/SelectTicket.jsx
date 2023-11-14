import React, { useState } from 'react'
import "./SelectTicket.css"

const SelectTicket = () => {
    const [isCheck, setIsCheck] = useState(false)
    const [circleInfo, setCircleInfo] = useState(null);

    const handleMouseEnter = (stage) => {
      setCircleInfo(stage);
    };
  
    const handleMouseLeave = () => {
      setCircleInfo(null);
    };

    const handleCheck = () => {
      setIsCheck(!isCheck)
        console.log(isCheck)
    }
    const fakeSeat = [
      {
        type: "Standart",
        price: 200
      },
      {
        type: "Vip",
        price: 350
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      {
        type: "V.Vip",
        price: 500
      },
      
      
    ]
  return (
    <div className='bookingPage'>
      <div className="bookingComponent">
      <div className="seatState">
        <span className='info-seatState'>Vui lòng chọn ghế bên dưới</span>
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
      <div className="seatMap">
        <span>Stage/Sân khấu</span>
        {/* <div className="seatMapComponent">
          
          {fakeSeat?.map((stage)=>(
            <div className="model" key={stage.type}>
              <div className='numberSeat'>{stage.index}</div>
            </div>
          ))}

        </div> */}
         <div className="seatMapComponent">
      {fakeSeat?.map((stage) => (
        <div
          className="model"
          key={stage.type}
          onMouseEnter={() => handleMouseEnter(stage)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="numberSeat">{stage.index}</div>
        </div>
      ))}

      {circleInfo && (
        <div className="circle-info">
          <span>100.000 VND</span>
          <span>VIP</span>
        </div>
      )}
    </div>
      </div>
      </div>
      <div className="info-payment">
        <span className='infoTicket'>Thông tin đặt vé</span>
        <hr />
        <span className='picketTicket'>Vui lòng chọn vé</span>
        <div className="total-price">
          <span>Tổng cộng</span>
          <span>0 VND</span>
          </div>
          <div className="nextBtn">
            <button>Tiếp tục</button>
          </div>
      </div>

      
    </div>
  )
}

export default SelectTicket