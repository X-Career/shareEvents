import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Price from './Price'
import "./Create.css";
import { Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const createAnEvent = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
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
          rules={[{ required: true, message: 'Vui lòng chọn thời gian mở và ngừng bán vé!' }]}
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

        <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Thông tin"
          name="imformation"
          rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
        >
          <TextArea rows={4} />
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
