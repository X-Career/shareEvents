import React from "react";
import "./SignUp.css";
import { Form, Input, Button, DatePicker, Radio } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";



const SignUp = () => {
  const navigate = useNavigate()
  const onFinish = (values) => {
    console.log("Received values:", values);
    alert("Dang Ky Thanh Cong");
    navigate ("/")

  };
 

  return (
    <div className="signUpPage">
    <Form className="register-form" layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="username"
        label="User Name"
        rules={[{ required: true, message: "Please input your user name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="User name" />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="phone"
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

      <Form.Item
      
        name="idCard"
        label="ID Card"
        rules={[
          { required: true, message: "Please input your ID card number!" },
        ]}
      >
        <Input prefix={<IdcardOutlined />} placeholder="ID Card Number" />
      </Form.Item>

      <Form.Item
        name="dob"
        label="Date of Birth"
        rules={[
          { required: true, message: "Please input your date of birth!" },
        ]}
      >
        <DatePicker style={{ width: "100%" }} placeholder="Date of Birth" />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select your gender!" }]}
      >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
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

      <Form.Item
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

      <Form.Item
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign Up 
        </Button>
      </Form.Item>

      <Form.Item>
        Already have an account? <Link to="/login">Login</Link>
      </Form.Item>
      
    </Form>
    </div> );
  
};


export default SignUp;
