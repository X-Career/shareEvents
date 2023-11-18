import React, { useState, useEffect } from "react";
// import axios from "axios";
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Upload,
  Select,
  Input,
  message,
  DatePicker,
  Modal,
  Avatar,
  Result,
} from "antd";
import {
  LoadingOutlined,
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
// import useForm from "antd/es/form/Form";
import { MdOutlinePlace } from "react-icons/md";
import "./EditUserPage.css";
import { useParams } from "react-router-dom";
import { editUser, getUserById } from "../../services/index";
import picture from "..//..//Slide/495D0A.jpg";

const { Option } = Select;
const roles = ["member", "creator", "admin"];
const genders = ["male", "female", "other"];
const statuses = ["active", "block"];
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const EditUserPage = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  // getdata
  const getUser = async () => {
    try {
      const result = await getUserById(id);
      console.log(result);

      setImage(result.data.user?.image);
      form.setFieldValue("fullName", result.data.user?.fullName);
      form.setFieldValue("phoneNumber", result.data.user?.phoneNumber);
      form.setFieldValue("email", result.data.user?.email);
      form.setFieldValue("address", result.data.user?.address);
      form.setFieldValue("userName", result.data.user?.userName);
      form.setFieldValue("password", result.data.user?.password);
      form.setFieldValue("gender", result.data.user?.gender);
      form.setFieldValue("dateOfBirth", result.data.user?.dateOfBirth);
      form.setFieldValue("status", result.data.user?.status);
      form.setFieldValue("role", result.data.user?.role);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadUser = async () => {
    try {
      const fullName = form.getFieldValue("fullName");
      const phoneNumber = form.getFieldValue("phoneNumber");
      const email = form.getFieldValue("email");
      const address = form.getFieldValue("address");
      const userName = form.getFieldValue("userName");
      const gender = form.getFieldValue("gender");
      const dateOfBirth = form.getFieldValue("dateOfBirth");
      const status = form.getFieldValue("status");
      const role = form.getFieldValue("role");

      const data = new FormData();

      data.append("fullName", fullName);
      data.append("phoneNumber", phoneNumber);
      data.append("email", email);
      data.append("address", address);
      data.append("userName", userName);
      data.append("gender", gender);
      data.append("dateOfBirth", dateOfBirth);
      data.append("status", status);
      data.role("role", role);

      if (image) {
        data.append("image", image.originFileObj);
      }
      const result = await editUser(id, data);
      message.success("Cập nhật User thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, []);

  const [fileList, setFileList] = useState();
  const uploadPromises = fileList?.map(async (file) => {
    console.log(file.originFileObj);
    const formData = new FormData();
    formData.append("file", file.originFileObj);
    formData.append("upload_preset", "events");

    // try {
    //   const response = await axios.post(
    //     "https://api.cloudinary.com/v1_1/dpmudujak/image/upload",
    //     formData
    //   );
    //   console.log(response.data.secure_url);
    //   const imageURL = response.data.secure_url;
    //   console.log(imageURL);
    //   console.log("Đường dẫn ảnh trên Cloudinary:", imageURL);
    //   return imageURL;
    // } catch (error) {
    //   console.error("Lỗi khi upload ảnh:", error);
    // }
  });
  return (
    <div>
      <Typography.Title level={3}>Profile 's </Typography.Title>
      <Form
        form={form}
        className="edit-form"
        layout="vertical"
        onFinish={uploadUser()}
      >
        <Row className="profile">
          <Col span={12}>
            <Form.Item
              className="form-item1"
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>

            <Form.Item
              className="form-item1"
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

            <Form.Item
              className="form-item1"
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
              <Input
                prefix={<MailOutlined />}
                type="email"
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item className="form-item1" name="address" label="Address">
              <Input prefix={<MdOutlinePlace />} placeholder="Address" />
            </Form.Item>

            <Form.Item
              className="form-item1"
              name="userName"
              label="User Name"
              rules={[
                { required: true, message: "Please input your user name!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="User name" />
            </Form.Item>

            <Form.Item className="btn-update">
              <Button type="primary" htmlType="submit" block>
                Update
              </Button>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="gender" label="Gender" className="form-item2">
              <Select placeholder="Select a gender" defaultValue={genders[0]}>
                {genders.map((gender) => (
                  <Option key={gender} value={gender}>
                    {gender}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label="Birthday"
              className="form-item2"
            >
              <DatePicker className="form-date" />
            </Form.Item>

            <Form.Item name="role" label="Role" className="form-item2">
              <Select placeholder="Select a role" defaultValue={roles[0]}>
                {roles.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="status" label="Status" className="form-item2">
              <Select placeholder="Select a status" defaultValue={statuses[0]}>
                {statuses.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} className="upload-image">
            <Form.Item
              className="edit-avatar"
              label="Avatar"
              name="image"
              // valuePropName="fileList"
              // getValueFromUser={normFile}
            >
              {image ? (
                <img src={image} alt="avatar" style={{ width: "25%" }} />
              ) : (
                <img icon={<UserOutlined />} size={128} />
              )}
              <Upload
                listType="picture-card"
                fileList={fileList}
                // showUploadList = {false}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={(fileList) => {
                  console.log(fileList);
                  return false;
                }}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Change Avatar</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditUserPage;
