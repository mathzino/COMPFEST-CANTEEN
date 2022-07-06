import { Button, Input, Form } from "antd";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from "axios";
const Balance = () => {
  let [balance, setBalance] = useState(0);
  let [balanceInput, setBalanceInput] = useState(0);
  let handleChange = (e) => {
    setBalanceInput(e.target.value);
  };
  let AddBalance = async () => {
    getBalance();
    if (balance === null || balance === undefined) {
      balance = 0;
    }
    if (balanceInput === "") {
      balanceInput = 0;
    }
    // console.log("add balance");
    console.log("balance state after get balance: ", balance);
    let newBalance = parseInt(balance) + parseInt(balanceInput);
    let data = await axios.put("https://honesty-canteen1.herokuapp.com/balance/edit", { balance: newBalance }, { headers: { Authorization: "Bearer " + Cookies.get("token") } }).then((res) => {
      let resdata = res.data.balance.balance;
      return resdata;
    });
    setBalance(data);
  };
  let WithdrawBalance = () => {
    if (balance === null || balance === undefined) {
      balance = 0;
    }
    if (balanceInput === "") {
      balanceInput = 0;
    }
    let newBalance = parseInt(balance) - parseInt(balanceInput);
    axios.put("https://honesty-canteen1.herokuapp.com/balance/edit", { balance: newBalance }, { headers: { Authorization: "Bearer " + Cookies.get("token") } }).then((res) => {
      setBalance(res.data.balance.balance);
    });
  };
  let getBalance = async () => {
    let data = await axios.get("https://honesty-canteen1.herokuapp.com/balance", { headers: { Authorization: "Bearer " + Cookies.get("token") } }).then((res) => {
      let data = res.data.balance.balance;
      return data;
    });
    setBalance(data);
    console.log("getbalance : ", balance);
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "80px 0 " }}>
      <div>
        <h1>Balance : $ {balance}</h1>
      </div>
      <form style={{ margin: "10px" }}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input placeholder="Balance" name="balance" onChange={handleChange} required />
        </Form.Item>
      </form>
      <div>
        <Button type="primary" size="middle" style={{ width: "100px", margin: "5px" }} onClick={AddBalance}>
          add
        </Button>
        <Button type="primary" danger size="middle" style={{ width: "100px", margin: "5px" }} onClick={WithdrawBalance}>
          withdraw
        </Button>
      </div>
    </div>
  );
};

export default Balance;
