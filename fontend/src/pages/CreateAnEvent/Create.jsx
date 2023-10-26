import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";
import { useSelector, useDispatch } from "react-redux";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
console.log(normFile)

const createAnEvent = () => {
  const accessToken = useSelector((state) => state.accessToken);
  const API_RegisterEvent = "http://localhost:3001/event/createEvent";
  const API_CategoriesEvent = "http://localhost:3001/category"
  const [form] = Form.useForm();
  const [errorVisible, setErrorVisible] = useState(false);
  const [categories,setCategories] = useState([])
  const [seats,setSeats] = useState([])
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const getData = async()=>{
      try {
        const response = await axios.get(API_CategoriesEvent);
        setCategories(response.data.datas)
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  },[])



  const onFinish = async (values) => {
    try {
      const { saleTime } = values;
      const [startingTime, endingTime] = saleTime;

      values.startingTime = moment(startingTime).format("YYYY-MM-DD HH:mm:ss");
      values.endingTime = moment(endingTime).format("YYYY-MM-DD HH:mm:ss");

      delete values.saleTime;
      const formData = new FormData();
    
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }
    
    fileList.forEach((file) => {
      formData.append("image", file);
    });
  
      console.log(values);
      console.log(fileList)
      await axios.post(API_RegisterEvent,formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
        
      });
      console.log("Form sent successfully!");
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

        {/* <Form.Item
          label="Hình ảnh"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Vui lòng chọn hình ảnh!" }]}
        >
          <Upload
            action="http://localhost:3001/event/createEvent"
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item> */}
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
    beforeUpload = {(fileList)=>{
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
        {/* <Form.Item
          label="Giá vé"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá vé!" }]}
        >
          <InputNumber />
        </Form.Item> */}
        <Form.Item
          label="Phương thức thanh toán"
          name="paymentOfMethod"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập phương thức thanh toán!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="categories"
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <TreeSelect
            defaultValue={["uncategorized"]}
            // treeData={[{ title: "Uncategorized", value: "uncategorized" }]}
            treeData={categories.map((category) => ({
              title: category.name,
              value: category.name,
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
            defaultValue={["uncategorized"]}
            treeData={[{ title: "Uncategorized", value: "uncategorized" }]}
            treeDefaultExpandAll
          />
        </Form.Item>
        <Form.Item
          label="Số lượng chỗ ngồi"
          name="seats"
          rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
        >
          <TreeSelect
            defaultValue={["uncategorized"]}
            treeData={[{ title: "Uncategorized", value: "uncategorized" }]}
            treeDefaultExpandAll
          />
        </Form.Item>
        {/* 
        <Form.Item
          label="Số lượng chỗ ngồi"
          name="seats"
          rules={[
            { required: true, message: "Vui lòng nhập số lượng chỗ ngồi!" },
          ]}
        >
          <InputNumber />
        </Form.Item> */}
        <Form.List name="price" label="Giá vé">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Form.Item
                    style={{ marginRight: 8 }}
                    {...field}
                    fieldKey={[field.fieldKey, "ticketPrice"]}
                    name={[field.name, "ticketPrice"]}
                    rules={[
                      { required: true, message: "Vui lòng nhập giá vé!" },
                    ]}
                  >
                    <InputNumber placeholder="Nhập giá vé" />
                  </Form.Item>
                  {fields.length > 1 && (
                    <Button
                      type="link"
                      danger
                      onClick={() => remove(field.name)}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Thêm giá vé
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
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
