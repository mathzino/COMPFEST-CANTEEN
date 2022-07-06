import { Button, Form, Input } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";

const FoodForm = () => {
  let [file, setFile] = useState("");
  let handleFile = (e) => {
    let file = e.target.files[0];
    setFile(file);
  };
  const onFinish = (values) => {
    let formData = new FormData();
    formData.append("itemImage", file);
    formData.append("itemName", values.itemName);
    formData.append("desc", values.desc);
    formData.append("price", values.price);

    axios({
      url: "https://honesty-canteen1.herokuapp.com/item/create",
      data: formData,
      method: "POST",
      headers: { Authorization: "Bearer " + Cookies.get("token") },
    }).then((res) => {});
  };

  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "30px" }}>Add Item</h1>
      <Form
        name="basic"
        labelCol={{
          span: 2,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="itemName"
          rules={[
            {
              required: true,
              message: "Please input name item name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          rules={[
            {
              required: true,
              message: "Please input name item name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your item price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Upload name="itemImage" listType="picture" getValueFromEvent={normFile}>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload> */}
        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <label>select image</label>
          <input style={{ marginTop: "5px" }} type="file" name="file" onChange={handleFile} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FoodForm;
