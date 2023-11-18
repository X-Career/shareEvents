import React from "react";
import axios from "axios";
import "./SignUp.css";
import { Form, Input, Button, Select, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;
const roles = ["member", "creator", "admin"];
const adminRole = "admin";

const SignUp = () => {
  const navigate = useNavigate();
  const API_Register = "https://beshareevents.onrender.com/user/register"
  const onFinish = async (values) => {
    const data = {
      ...values,
      role: values.role || "member",
    };

    try {
      const response = await axios.post(API_Register, data);
      console.log(response.data);
      message.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="signUpPage">
      <Form className="register-form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="userName"
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
        <Form.Item name="role" label="Role">
          <Select placeholder="Select a role" defaultValue={roles[0]}>
            {roles.map((role) => (
              <Option key={role} value={role} disabled={role === adminRole}>
                {role}
              </Option>
            ))}
          </Select>
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
    </div>
  );
};

export default SignUp;
