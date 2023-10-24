import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import axios from 'axios';
import Price from './Price';
import "./Create.css";
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from 'antd';
import { useSelector, useDispatch } from "react-redux";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

const createAnEvent = () => {
const accessToken = useSelector((state)=> state.accessToken)
const API_RegisterEvent = "http://localhost:3001/event/createEvent"
  const [form] = Form.useForm();
  const [errorVisible, setErrorVisible] = useState(false);

  const onFinish = async (values) => {
    try {
        await axios.post(API_RegisterEvent, values,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log('Form sent successfully!');
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Error sending form:', error.response.data.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
      
    
  };

  const checkEventTime = (_, value) => {
    const [startTime, endTime] = value;
    const eventTime = form.getFieldValue('eventTime');

    if (startTime && endTime && (startTime > eventTime || endTime > eventTime)) {
      setErrorVisible(true);
      return Promise.reject(new Error('Thời gian mở/ngừng bán vé không được sau thời gian tổ chức sự kiện!'));
    }

    setErrorVisible(false);
    return Promise.resolve();
  };

  return (
    <>
      <Form
        form={form}
        className="registration-form"
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Thời Gian"
          name="eventTime"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian tổ chức!' }]}
        >
          <DatePicker showTime showSecond={false} />
        </Form.Item>

        <Form.Item
          label="Thời Gian mở/ngừng bán vé"
          name="saleTime"
          rules={[
            { required: true, message: 'Vui lòng chọn thời gian mở và ngừng bán vé!' },
            { validator: checkEventTime }
          ]}
          validateStatus={errorVisible ? 'error' : ''}
          help={errorVisible ? 'Thời gian mở/ngừng bán vé không hợp lệ.' : ''}
          >
            <RangePicker showTime />
          </Form.Item>
  
          <Form.Item
            label="Tên chương trình"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên chương trình!' }]}
          >
            <Input />
          </Form.Item>
  
          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
          >
            <Input />
          </Form.Item>
  
          {/* <Form.Item
            label="Hình ảnh"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
          >
            <Upload action="http://localhost:3001/event/createEvent" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item> */}
          <Form.Item
          label="Thông tin"
          name="imformation"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Giá vé"
          name="price"
          rules={[{ required: true, message: 'Vui lòng nhập giá vé!' }]}
        >
          <InputNumber />
        </Form.Item>
   
        <Form.Item
          label="Phương thức thanh toán"
          name="paymentOfMethod"
          rules={[{ required: true, message: 'Vui lòng nhập phương thức thanh toán!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categories"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
        >
          <TreeSelect
            defaultValue={['uncategorized']}
            treeData={[{ title: 'Uncategorized', value: 'uncategorized' }]}
            treeDefaultExpandAll
          />
        </Form.Item>

        <Form.Item
          label="Số lượng chỗ ngồi"
          name="seatQuantity"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng chỗ ngồi!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default createAnEvent;
