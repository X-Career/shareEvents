import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom"
const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div
        className=""
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
            border: "1px solid rgb(230, 235, 245)",
            padding: "16px",
            borderRadius: "17px",
            backgroundColor: "white",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Đăng nhập
          </h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <div
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="/signup"><a>Sign Up</a></Link>
                <a>Forgot password ?</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
