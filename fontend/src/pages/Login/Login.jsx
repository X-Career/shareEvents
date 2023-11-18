import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from "../../redux/users/loginAction";
import axios from "axios";

const Login = () => {
  const API_Login = "https://beshareevents.onrender.com/user/login";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const { userName, password } = values;
      const response = await axios.post(API_Login, { userName, password });

      if (response.status === 200) {
        console.log("Đăng nhập thành công!");
        message.success(response.data.message);
        

        // const { image } = response.data.user.image;
        // console.log (response.data)
        dispatch(loginAction(response.data.user.userName, response.data.user.image, response.data.accessToken, response.data.user.role, response.data.user.fullName, response.data.user));
        // console.log(response.data.user);
        if(response.data.user.role === 'admin') {
          return navigate("/admin");
        }
        navigate("/");
      } else {
        message.error("Đăng nhập thất bại.");
      }
    } catch (error) {
      console.log("Lỗi:", error.response.data.message);
      message.error(error.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        marginTop: "20px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f5f5",
      }}
    >
      <div
        style={{
          border: "1px solid rgb(51, 51, 51)",
          padding: "16px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="remember">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              block
              style={{
                background:
                  "linear-gradient(to right, #a29bfe, #6c5ce7, #eb4d4b, #fd9644)",
                borderRadius: "30px",
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link to="/" style={{ color: "#000" }}>
                Forgot password?
              </Link>
              <Link to="/register" style={{ color: "#000" }}>
                Sign Up
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
