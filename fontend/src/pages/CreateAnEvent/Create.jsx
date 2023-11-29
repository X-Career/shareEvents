import moment from "moment";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Create.css";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Space,
  Typography,
  Card,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/Navbar/Navbar";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const createAnEvent = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const API_RegisterEvent = "https://beshareevents.onrender.com/event/createEvent";
  const API_CategoriesEvent = "https://beshareevents.onrender.com/category";
  const API_SeatEvent = "https://beshareevents.onrender.com/seat/getAllidSeats";
  const [form] = Form.useForm();
  const [errorVisible, setErrorVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [seats, setSeats] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [paymentOfMethod, setPaymentOfMethod] = useState("Offline");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API_CategoriesEvent);
        setCategories(response.data.datas);
      } catch (error) {
        console.log(error);
      }
    };
    const getSeat = async () => {
      try {
        const seatsEvent = await axios.get(API_SeatEvent);
        console.log(seatsEvent)
        const seatValue = seatsEvent.data.result.dataSeats;
        setSeats(seatValue);
        console.log(seatValue)
        // form.setFieldsValue({ seats: seatValue });
        form.setFieldsValue({
          seats: paymentOfMethod === "Online" ? [] : seats,
        });
        console.log(seats)
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    getSeat();
  }, [API_CategoriesEvent, API_SeatEvent]);

  const onFinish = async (values) => {
    setPaymentOfMethod(values.paymentOfMethod);
    try {
      const { saleTime } = values;
      const [startingTime, endingTime] = saleTime;

      values.startingTime = moment(startingTime).format("YYYY-MM-DD HH:mm:ss");
      values.endingTime = moment(endingTime).format("YYYY-MM-DD HH:mm:ss");
      values.time = moment(values.time).format('dddd, D MMMM YYYY (hh:mm A)');

      delete values.saleTime;

      console.log(values);
      console.log(fileList);
      // values.image=["https://res.cloudinary.com/dia2vxa6d/image/upload/v1693644478/web69/rjhketnrpstxtzkddrs8.jpg"]

      const uploadPromises = fileList.map(async (file) => {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file.originFileObj);
        formData.append("upload_preset", "events");

        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dpmudujak/image/upload",
            formData
          );

          console.log(response.data.secure_url);
          const imageURL = response.data.secure_url;
          console.log(imageURL);
          console.log("Đường dẫn ảnh trên Cloudinary:", imageURL);
          return imageURL;
        } catch (error) {
          console.error("Lỗi khi upload ảnh:", error);
        }
      });

      const response = await Promise.all(uploadPromises);
      console.log(response);

      const imageUrls = response;
      setUploadedImageUrls(imageUrls);
      console.log(uploadedImageUrls);
      console.log(imageUrls);

      values.image = imageUrls;
      console.log(values.image);

      await axios.post(API_RegisterEvent, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Form sent successfully!", values);
      message.success("Tạo sự kiện thành công")
    } catch (error) {
      if (error) {
        console.error("Error sending form:", error.response.data.message);
      } else {
        console.error("Unexpected error:", error.message);
      }
    }
  };

  const checkEventTime = (_, value) => {
    const [startingTime, endingTime] = value;
    const eventTime = form.getFieldValue("time");

    if (
      startingTime &&
      endingTime &&
      (startingTime > eventTime || endingTime > eventTime)
    ) {
      setErrorVisible(true);
      return Promise.reject(
        new Error(
          "Thời gian mở/ngừng bán vé không được sau thời gian tổ chức sự kiện!"
        )
      );
    }

    setErrorVisible(false);
    return Promise.resolve();
  };
  return (
    <>
      <div className="layout-createEvent">
        <NavBar className="navBar" />
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
            name="time"
            rules={[
              { required: true, message: "Vui lòng chọn thời gian tổ chức!" },
            ]}
          >
            <DatePicker showTime showSecond={false} />
          </Form.Item>

          <Form.Item
            label="Thời Gian mở/ngừng bán vé"
            name="saleTime"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thời gian mở và ngừng bán vé!",
              },
              { validator: checkEventTime },
            ]}
            validateStatus={errorVisible ? "error" : ""}
            help={errorVisible ? "Thời gian mở/ngừng bán vé không hợp lệ." : ""}
          >
            <RangePicker showTime />
          </Form.Item>

          <Form.Item
            label="Tên chương trình"
            name="nameE"
            rules={[
              { required: true, message: "Vui lòng nhập tên chương trình!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa điểm"
            name="location"
            rules={[{ required: true, message: "Vui lòng nhập địa điểm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
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

          <Form.Item
            label="Thông tin"
            name="information"
            rules={[{ required: true, message: "Vui lòng nhập thông tin!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Cách thức tổ chức"
            name="paymentOfMethod"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập phương thức thanh toán!",
              },
            ]}
          >
            <TreeSelect
              defaultValue={["Offline"]}
              treeData={[
                { title: "Offline", value: "Offline" },
                { title: "Online", value: "Online" },
              ]}
              treeDefaultExpandAll
              onChange={(value) => setPaymentOfMethod(value)}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categories"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <TreeSelect
              // defaultValue={["uncategorized"]}
              // treeData={[{ title: "Uncategorized", value: "uncategorized" }]}
              treeData={categories.map((category) => ({
                title: category.name,
                value: category._id,
              }))}
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            label="Trạng Thái"
            name="status"
            rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
          >
            <TreeSelect
              defaultValue={["Draft"]}
              treeData={[
                { title: "Draft", value: "Draft" },
                { title: "Public", value: "public" },
              ]}
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            label="Số lượng chỗ ngồi"
            name="seats"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng chọn danh mục!",
            //   },
            // ]}
          >
            <div>
              <Input
                value={paymentOfMethod === "Online" ? 0 : seats.length}
                disabled
              />
            </div>
            {/* <div><Input value={seats.length} disabled></Input></div>  */}
          </Form.Item>
          <Form.Item label="Giá vé">
            <Form.List name="price">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item
                        name={[field.name, "option"]}
                        // rules={[
                        //   { required: true, message: "Vui lòng chọn Option" },
                        // ]}
                      >
                        <Select placeholder="Chọn Option">
                          <Select.Option value="standard">
                            Standard
                          </Select.Option>
                          <Select.Option value="vip">VIP</Select.Option>
                          <Select.Option value="vvip">V.VIP</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        name={[field.name, "price"]}
                        rules={[
                          { required: true, message: "Vui lòng nhập giá tiền" },
                        ]}
                      >
                        <Input placeholder="Nhập giá tiền" />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button danger onClick={() => remove(field.name)}>
                          Xóa
                        </Button>
                      )}
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm Option
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default createAnEvent;
