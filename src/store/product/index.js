import Cookies from "js-cookie";
import React from "react";
import axios from "axios";
import { createAction } from "../../utils/reducer.utils";
import { createSelector } from "reselect";

//TYPES
const PRODUCT_ACTION_TYPES = {
  SET_FILE: "product/SET_FILE",
  GET_LIST_PRODUCT_START: "product/GET_LIST_PRODUCT_START",
  GET_LIST_PRODUCT_FAIL: "product/GET_LIST_PRODUCT_FAIL",
  GET_LIST_PRODUCT_SUCCESS: "product/GET_LIST_PRODUCT_SUCCESS",
};
//selector
export let fileSelector = (state) => {
  console.log("selector ", state.product.file);
  return state.product.file;
};

export const selectProductReducer = (state) => state.product;

export const selectProduct = createSelector([selectProductReducer], (productSlice) => productSlice.listProduct);
export const selectProductMap = createSelector([selectProduct], (listProduct) => listProduct);
//REDUCER
const INITIAL_STATE = {
  file: "",
  listProduct: [],
  error: "",
  isLoading: true,
};

export const productReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_ACTION_TYPES.SET_FILE:
      return { ...state, file: payload };
    case PRODUCT_ACTION_TYPES.GET_LIST_PRODUCT_START:
      return { ...state, isLoading: true };
    case PRODUCT_ACTION_TYPES.GET_LIST_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, listProduct: payload };
    case PRODUCT_ACTION_TYPES.GET_LIST_PRODUCT_FAIL:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

//action
export const postForm = async (file, values) => {
  try {
    let formData = new FormData();
    formData.append("itemImage", file);
    formData.append("itemName", values.itemName);
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    await axios({
      url: "https://honesty-canteen1.herokuapp.com/item/create",
      data: formData,
      method: "POST",
      headers: { Authorization: "Bearer " + Cookies.get("token") },
    });
  } catch (error) {}
};

export const uploadFile = (file) => {
  console.log(file);
  return createAction(PRODUCT_ACTION_TYPES.SET_FILE, file);
};
const getListProduct = (listProduct) => {
  return createAction(PRODUCT_ACTION_TYPES.GET_LIST_PRODUCT_SUCCESS, listProduct);
};
const getListProductStart = () => {
  return createAction(PRODUCT_ACTION_TYPES.GET_LIST_PRODUCT_START);
};
const getListProductFail = (err) => {
  return createAction(PRODUCT_ACTION_TYPES.GET_LIST_PRODUCT_FAIL, err);
};
export const getListProductAsync = () => {
  return async (dispatch) => {
    dispatch(getListProductStart());
    try {
      let res = await axios.get("https://honesty-canteen1.herokuapp.com/item");
      let data = res.data.data.item.map((i) => {
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
      dispatch(getListProduct(data));
    } catch (error) {
      dispatch(getListProductFail(error));
    }
  };
};
