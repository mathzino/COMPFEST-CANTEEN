import { createAction } from "../../utils/reducer.utils";
import axios from "axios";
import Cookies from "js-cookie";
//TYPES
const BALANCE_ACTION_TYPES = {
  SET_BALANCE: "balance/SET_BALANCE",
};

//REDUCER
const INITIAL_STATE = {
  balance: 0,
};

export const balanceReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case BALANCE_ACTION_TYPES.SET_BALANCE:
      return { balance: payload };
    default:
      return state;
  }
};
//SELECTOR
export const selectBalance = (state) => {
  return state.balance;
};
//ACTION

export const AddBalance = (balance, balanceInput) => {
  return async (dispatch) => {
    if (balance === null || balance === undefined) {
      balance = 0;
    }
    if (balanceInput === "") {
      balanceInput = 0;
    }
    let res = await axios.get("https://honesty-canteen1.herokuapp.com/balance", { headers: { Authorization: "Bearer " + Cookies.get("token") } });
    balance = res.data.balance.balance;
    let newBalance = parseInt(balance) + parseInt(balanceInput);
    let data = await axios.put("https://honesty-canteen1.herokuapp.com/balance/edit", { balance: newBalance }, { headers: { Authorization: "Bearer " + Cookies.get("token") } }).then((res) => {
      let resdata = res.data.balance.balance;
      return resdata;
    });
    dispatch(GetBalance(data));
  };
};
export const WithdrawBalance = (balance, balanceInput) => {
  return async (dispatch) => {
    if (balance === null || balance === undefined) {
      balance = 0;
    }
    if (balanceInput === "") {
      balanceInput = 0;
    }
    let newBalance = parseInt(balance) - parseInt(balanceInput);
    let data = await axios.put("https://honesty-canteen1.herokuapp.com/balance/edit", { balance: newBalance }, { headers: { Authorization: "Bearer " + Cookies.get("token") } }).then((res) => {
      let resdata = res.data.balance.balance;
      return resdata;
    });
    dispatch(GetBalance(data));
  };
};

export const fetchBalance = () => {
  return async (dispatch) => {
    let data = await axios.get("https://honesty-canteen1.herokuapp.com/balance", { headers: { Authorization: "Bearer " + Cookies.get("token") } }).then((res) => res.data.balance.balance);
    return dispatch(GetBalance(data));
  };
};

export const GetBalance = (balance) => {
  return createAction(BALANCE_ACTION_TYPES.SET_BALANCE, balance);
};
