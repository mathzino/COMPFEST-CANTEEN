/* eslint-disable no-unused-vars */
import { Table, Tooltip } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect } from "react";
import { getListProductAsync, selectProductMap, selectProductReducer, selectProduct } from "../../store/product";
import { useDispatch, useSelector } from "react-redux/es/exports";
import Spinner from "../spinner";
const FoodTable = () => {
  let listProduct = useSelector(selectProductMap);
  let isLoading = useSelector(selectProduct).isLoading;
  let dispatch = useDispatch();

  let actionBuy = async (e) => {
    let id = e.target.id;
    await axios.delete(`https://honesty-canteen1.herokuapp.com/item/delete/${id}`, { headers: { Authorization: "Bearer " + Cookies.get("token") } });
    window.location.reload();
    dispatch(getListProductAsync());
  };
  useEffect(() => {
    dispatch(getListProductAsync());
  }, [dispatch]);
  const columns = [
    {
      title: "Name",
      dataIndex: "itemName",
      sorter: (a, b) => (a.name === b.name ? 1 : a.name.localeCompare(b.name)),

      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "itemImage",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Description",
      dataIndex: "desc",
      responsive: ["lg"],
      ellipsis: {
        showTitle: false,
      },
      render: (desc) => (
        <Tooltip placement="topLeft" title={desc}>
          {desc}
        </Tooltip>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      defaultSortOrder: "ascend",
      responsive: ["lg"],
      sorter: (a, b) => (a.date === b.date ? 1 : a.date.localeCompare(b.date)),
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "key",
      render: (key) => (
        <div>
          <button id={key} onClick={actionBuy} style={{ marginBottom: "10px" }}>
            buy
          </button>
        </div>
      ),
    },
  ];
  return <>{!isLoading && listProduct.length !== 0 ? <Table columns={columns} dataSource={listProduct} /> : <Spinner />}</>;
};

export default FoodTable;
