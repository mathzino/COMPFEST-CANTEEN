import { Button, Form, Input } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";

import { fileSelector, postForm } from "../../store/product";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../store/product";
import { useSelector } from "react-redux/es/exports";
const FoodForm = () => {
  let file = useSelector(fileSelector);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let handleFile = (e) => {
    dispatch(uploadFile(e.target.files[0]));
  };
  const onFinish = async (values) => {
    await postForm(file, values);
    navigate("/");
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
