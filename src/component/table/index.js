import { Table, Tooltip } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

const FoodTable = () => {
  let [listFood, setListFood] = useState([]);
  let getItem = () => {
    axios.get("https://honesty-canteen1.herokuapp.com/item").then(function (response) {
      let data = response.data.data.item.map((i) => {
        let indexOfT = i.createdAt.indexOf("T");
        let date = i.createdAt.slice(0, indexOfT);
        let imageURL = "https://honesty-canteen1.herokuapp.com/uploads/";
        return {
          ...i,
          key: i._id,
          createdAt: date,
          itemImage: React.createElement("img", { src: imageURL + i.itemImage, style: { height: "60px", width: "60px" }, alt: "image already deleted at heroku" }, null),
        };
      });
      setListFood(data);
    });
  };
  let actionBuy = async (e) => {
    let id = e.target.id;

    await axios.delete(`https://honesty-canteen1.herokuapp.com/item/delete/${id}`, { headers: { Authorization: "Bearer " + Cookies.get("token") } });
    getItem();
  };
  useEffect(() => {
    getItem();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "itemName",
      // defaultSortOrder: "descend",
      sorter: (a, b) => (a.name === b.name ? 1 : a.name.localeCompare(b.name)),

      // sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      // ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "itemImage",
      defaultSortOrder: "descend",
      align: "center",
      responsive: ["lg"],
    },
    {
      title: "Description",
      dataIndex: "desc",
      defaultSortOrder: "descend",
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
      defaultSortOrder: "descend",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      defaultSortOrder: "descend",
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
  return <Table columns={columns} dataSource={listFood} />;
};

export default FoodTable;
