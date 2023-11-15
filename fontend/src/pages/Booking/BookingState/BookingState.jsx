import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import "./BookingState.css"
import SelectTicket from '../ContentBooking/SelectTicket';
const steps = [
  {
    title: 'Chọn vé',
    content: <SelectTicket />,
  },
  {
    title: 'Thanh toán',
    content: 'Second-content',
  },
  {
    title: 'Hoàn tất',
    content: 'Last-content',
  },
];
const App = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    // lineHeight: '260px',
    // textAlign: 'center',
    // color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    // marginLeft: 50,
    // maxWidth: 1000,
    paddingLeft:5,
    paddingRight:50,
    height: 600
    // display: 'flex',
  };
  return (
    <>
    <div className="booking-state">
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
      </div>
    </>
  );
};
export default App;