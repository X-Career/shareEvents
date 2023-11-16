import React, { useState } from 'react';
import { Typography, Button, Row, Col, Form, Upload, Select, Input, message, DatePicker, Modal } from 'antd';
import {
  LoadingOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { MdOutlinePlace } from "react-icons/md"
import "./EditUserPage.css";

const { Option } = Select;
const roles = ["member", "creator", "admin"];
const genders = ["male", "female", "other"];
const statuses = ["active", "block"];
const adminRole = "admin";



const EditUserPage = () => {
  

  // Form
  const onFinish = async (values) => {
  }
  return (
    <div>
      <Typography.Title level={3}>Profile 's Name</Typography.Title>


      <Form className="edit-form" layout="vertical" onFinish={onFinish}>
        <Row className="profile">
          <Col span={12}>
            <Form.Item className='form-item1'
              name="fullName"
              label="Full Name"
              rules={[{ required: true, message: "Please input your full name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>

            <Form.Item className='form-item1'
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^\d{10,}$/g,
                  message: "Phone number must have at least 10 digits!",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>

            <Form.Item className='form-item1'
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item className='form-item1'
              name="address"
              label="Address"
            >
              <Input prefix={<MdOutlinePlace />} placeholder="Address" />
            </Form.Item>

            <Form.Item className='form-item1'
              name="userName"
              label="User Name"
              rules={[{ required: true, message: "Please input your user name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="User name" />
            </Form.Item>

            <Form.Item className='form-item1'
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className='form-item1'
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords do not match!");
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item className="btn-update">
              <Button type="primary" htmlType="submit" block>
                Update
              </Button>
            </Form.Item>

          </Col>
          <Col span={4}>
            <Form.Item name="gender" label="Gender" className='form-item2'>
              <Select placeholder="Select a gender" defaultValue={genders[0]}>
                {genders.map((gender) => (
                  <Option key={gender} value={gender}>
                    {gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Birthday" className='form-item2'>
              <DatePicker className='form-date' />
            </Form.Item>

            <Form.Item name="role" label="Role" className='form-item2'>
              <Select placeholder="Select a role" defaultValue={roles[0]}>
                {roles.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="status" label="Status" className='form-item2'>
              <Select placeholder="Select a status" defaultValue={statuses[0]}>
                {statuses.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} className='upload-image'>
          <Form.Item
            label="Avartar"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
          >
            <Upload
              // action="http://localhost:3001/event/createEvent"
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={(fileList) => {
                console.log(fileList);
                return false;
              }}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          </Col>
        </Row>
      </Form>

    </div>
  )
}

export default EditUserPage