import { Button, Input, Form } from "antd";

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { AddBalance, WithdrawBalance, fetchBalance } from "../../store/balance";

const Balance = ({ balance }) => {
  let dispatch = useDispatch();
  let [balanceInput, setBalanceInput] = useState(0);
  let handleChange = (e) => {
    setBalanceInput(e.target.value);
  };
  let AddBalanceHandler = () => {
    dispatch(AddBalance(balance, balanceInput));
  };
  let WithdrawBalanceHandler = () => {
    dispatch(WithdrawBalance(balance, balanceInput));
  };

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "80px 0 " }}>
      <div>
        <h1>Balance : $ {balance}</h1>
      </div>
      <Form>
        <Form.Item name="balance" rules={[{ required: true, message: "Please input balance!" }]}>
          <Input placeholder="Balance" name="balance" onChange={handleChange} required />
        </Form.Item>
      </Form>
      <div>
        <Button type="primary" size="middle" style={{ width: "100px", margin: "5px" }} onClick={AddBalanceHandler}>
          add
        </Button>
        <Button type="primary" danger size="middle" style={{ width: "100px", margin: "5px" }} onClick={WithdrawBalanceHandler}>
          withdraw
        </Button>
      </div>
    </div>
  );
};

export default Balance;
