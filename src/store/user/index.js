import { createAction } from "../../utils/reducer.utils";

//TYPES
const USER_ACTION_TYPES = {
  SIGN_IN: "balance/SIGN_IN",
  LOG_OUT: "user/LOG_OUT",
};

//REDUCER
const INITIAL_STATE = {
  loginStatus: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN:
      return { loginStatus: true };
    case USER_ACTION_TYPES.LOG_OUT:
      return { loginStatus: false };
    default:
      return state;
  }
};
//SELECTOR
export const userSelector = (state) => {
  return state.user;
};

//ACTION
export let signin = () => {
  return createAction(USER_ACTION_TYPES.SIGN_IN);
};
export let logout = () => {
  return createAction(USER_ACTION_TYPES.LOG_OUT);
};
