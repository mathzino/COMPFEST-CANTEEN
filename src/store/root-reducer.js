import { combineReducers } from "redux";
import { balanceReducer } from "./balance";
import { productReducer } from "./product";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  balance: balanceReducer,
  product: productReducer,
  user: userReducer,
});
